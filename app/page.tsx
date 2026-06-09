"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
} from "react";

import { NavBar } from "@/app/components/NavBar";
import { ResumeBanner } from "@/app/components/ResumeBanner";
import { SetupScreen } from "@/app/components/SetupScreen";
import { DrawingScreen } from "@/app/components/DrawingScreen";
import { ResultsScreen } from "@/app/components/ResultsScreen";

import { TEAMS } from "@/app/data/teams";
import { runDraw } from "@/app/lib/draw";
import { loadState, saveState, clearState } from "@/app/lib/storage";
import { mkPlayer } from "@/app/lib/utils";

import type { Player, PlayerResult, Screen, Team } from "@/app/types";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [defaultSlots, setDefaultSlots] = useState<number>(1);
  const [players, setPlayers] = useState<Player[]>([
    mkPlayer(1),
    mkPlayer(1),
    mkPlayer(1),
  ]);
  const [results, setResults] = useState<PlayerResult[]>([]);
  const [unassigned, setUnassigned] = useState<Team[]>([]);
  const [cycleTeam, setCycleTeam] = useState("⚽ Argentina");
  const [copied, setCopied] = useState(false);
  const [nowTick, setNowTick] = useState(0);
  const [session, setSession] = useState<{
    savedAt: number | null;
    resume: "setup" | "results" | false;
  }>({ savedAt: null, resume: false });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const validPlayers = players.filter((p) => p.name.trim().length > 0);
  const totalSlots = validPlayers.reduce((s, p) => s + p.slots, 0);
  const overLimit = totalSlots > 48;

  useEffect(() => {
    const t = setInterval(() => setNowTick((n) => n + 1), 15_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const saved = loadState();
    if (!saved?.players?.length) return;
    startTransition(() => {
      setSession({
        savedAt: saved.savedAt,
        resume: saved.results?.length ? "results" : "setup",
      });
    });
  }, []);

  useEffect(() => {
    if (screen !== "setup") return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const ts = Date.now();
      saveState({ players, defaultSlots, savedAt: ts });
      setSession((s) => ({ ...s, savedAt: ts }));
    }, 800);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [players, defaultSlots, screen]);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    },
    [],
  );

  const handleResume = () => {
    const saved = loadState();
    if (!saved) return;
    if (saved.players) setPlayers(saved.players);
    if (saved.defaultSlots) setDefaultSlots(saved.defaultSlots);
    if (saved.results?.length) {
      setResults(saved.results);
      setUnassigned(saved.unassigned ?? []);
      setScreen("results");
    }
    setSession((s) => ({ ...s, resume: false }));
  };

  const handleDismiss = () => {
    clearState();
    setSession({ savedAt: null, resume: false });
  };

  const addPlayer = () => setPlayers((p) => [...p, mkPlayer(defaultSlots)]);
  const removePlayer = (id: string) =>
    setPlayers((p) => (p.length > 1 ? p.filter((pl) => pl.id !== id) : p));
  const updateName = (id: string, name: string) =>
    setPlayers((p) => p.map((pl) => (pl.id === id ? { ...pl, name } : pl)));
  const updateSlots = (id: string, slots: number) =>
    setPlayers((p) => p.map((pl) => (pl.id === id ? { ...pl, slots } : pl)));
  const applyToAll = () =>
    setPlayers((p) => p.map((pl) => ({ ...pl, slots: defaultSlots })));

  const startDraw = useCallback(() => {
    if (validPlayers.length === 0) return;
    const { results: r, unassigned: u } = runDraw(validPlayers);
    setResults(r);
    setUnassigned(u);
    setScreen("drawing");
    const ts = Date.now();
    saveState({
      players,
      defaultSlots,
      results: r,
      unassigned: u,
      savedAt: ts,
    });
    setSession((s) => ({ ...s, savedAt: ts }));
    const names = TEAMS.map((t) => `${t.flag} ${t.name}`);
    let ti = 0;
    setCycleTeam(names[0]);
    intervalRef.current = setInterval(() => {
      ti = (ti + 1) % names.length;
      setCycleTeam(names[ti]);
    }, 75);
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setScreen("results");
    }, 3200);
  }, [validPlayers, players, defaultSlots]);

  const reset = () => {
    clearState();
    setSession({ savedAt: null, resume: false });
    setScreen("setup");
    setResults([]);
    setUnassigned([]);
    setPlayers([mkPlayer(1), mkPlayer(1), mkPlayer(1)]);
    setDefaultSlots(1);
  };

  const copyResults = () => {
    const text = results
      .map(
        (r, i) =>
          `${i + 1}. ${r.player}: ${r.teams.map((t) => `${t.flag} ${t.name}`).join(", ")}`,
      )
      .join("\n");
    navigator.clipboard
      .writeText(`⚽ SweepCup — FIFA World Cup 2026 Draw\n\n${text}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(145deg, #050f07 0%, #091a0b 35%, #0c1e0e 65%, #060d07 100%)",
      }}
    >
      <div className="fixed inset-0 pitch-stripes pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        {(
          [
            {
              pos: "top-[7%] left-[3%]",
              delay: "0s",
              size: "text-5xl",
              op: "opacity-[0.05]",
            },
            {
              pos: "top-[38%] right-[4%]",
              delay: "2s",
              size: "text-7xl",
              op: "opacity-[0.04]",
            },
            {
              pos: "bottom-[12%] left-[6%]",
              delay: "4s",
              size: "text-6xl",
              op: "opacity-[0.04]",
            },
            {
              pos: "top-[62%] right-[14%]",
              delay: "1.5s",
              size: "text-4xl",
              op: "opacity-[0.06]",
            },
            {
              pos: "bottom-[42%] left-[28%]",
              delay: "3s",
              size: "text-8xl",
              op: "opacity-[0.025]",
            },
          ] as const
        ).map((b, i) => (
          <div
            key={i}
            className={`absolute ${b.pos} ${b.size} ${b.op} float-ball`}
            style={{ animationDelay: b.delay }}
          >
            ⚽
          </div>
        ))}
      </div>

      <NavBar
        screen={screen}
        savedAt={session.savedAt}
        nowTick={nowTick}
        copied={copied}
        onCopyResults={copyResults}
        onReset={reset}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-10 slide-down">
          <div className="text-5xl sm:text-6xl mb-3 trophy-bounce inline-block">
            🏆
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-1"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #e0e0e0 30%, #FFD700 60%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <span>Sweep</span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Cup
            </span>
          </h1>
          <p className="text-sm sm:text-base text-green-400 font-semibold mt-2 tracking-[0.2em] uppercase">
            FIFA World Cup 2026 · Sweepstake Draw
          </p>
          <div className="flex justify-center items-center gap-1.5 mt-4 flex-wrap">
            <span className="text-xl" title="USA">
              🇺🇸
            </span>
            <span className="text-gray-700 text-xs">+</span>
            <span className="text-xl" title="Mexico">
              🇲🇽
            </span>
            <span className="text-gray-700 text-xs">+</span>
            <span className="text-xl" title="Canada">
              🇨🇦
            </span>
            <span
              className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.2)",
                color: "rgba(255,215,0,0.7)",
              }}
            >
              48 teams · 3 host nations
            </span>
          </div>
        </header>

        {session.resume && (
          <ResumeBanner
            type={session.resume}
            savedAt={session.savedAt}
            onResume={handleResume}
            onDismiss={handleDismiss}
          />
        )}

        {screen === "setup" && (
          <SetupScreen
            defaultSlots={defaultSlots}
            players={players}
            validPlayerCount={validPlayers.length}
            totalSlots={totalSlots}
            overLimit={overLimit}
            onSetDefaultSlots={setDefaultSlots}
            onApplyDefaultToAll={applyToAll}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onUpdateName={updateName}
            onUpdateSlots={updateSlots}
            onStartDraw={startDraw}
          />
        )}

        {screen === "drawing" && (
          <DrawingScreen
            playerCount={validPlayers.length}
            teamCount={Math.min(totalSlots, 48)}
            cycleTeam={cycleTeam}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            results={results}
            unassigned={unassigned}
            copied={copied}
            onCopyResults={copyResults}
            onReset={reset}
          />
        )}

        <footer className="text-center mt-12 pb-4 space-y-2">
          <div
            className="inline-flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            <span>⚽</span>
            <span className="uppercase tracking-widest">
              SweepCup · FIFA World Cup 2026 · USA · Canada · Mexico
            </span>
            <span>⚽</span>
          </div>
          <div
            className="flex items-center justify-center gap-1.5 text-xs"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            <span>Made with</span>
            <span
              className="text-red-500 text-sm"
              style={{ filter: "drop-shadow(0 0 4px rgba(239,68,68,0.6))" }}
            >
              ♥
            </span>
            <span>by</span>
            <span
              className="font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rushi
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
