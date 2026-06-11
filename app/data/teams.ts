import type { Pot, Team } from "@/app/types";

export const POTS: Pot[] = [1, 2, 3, 4];
export const TEAMS_PER_POT = 12;
export const MAX_POT_DRAW_PLAYERS = 12;
export const POT_DRAW_SLOTS = 4;

export const TEAMS: Team[] = [
  // Pot 1 — FIFA ranks 1–12
  { name: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL", pot: 1, fifaRank: 1 },
  { name: "Spain", flag: "🇪🇸", confederation: "UEFA", pot: 1, fifaRank: 2 },
  { name: "France", flag: "🇫🇷", confederation: "UEFA", pot: 1, fifaRank: 3 },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA", pot: 1, fifaRank: 4 },
  { name: "Portugal", flag: "🇵🇹", confederation: "UEFA", pot: 1, fifaRank: 5 },
  { name: "Brazil", flag: "🇧🇷", confederation: "CONMEBOL", pot: 1, fifaRank: 6 },
  { name: "Morocco", flag: "🇲🇦", confederation: "CAF", pot: 1, fifaRank: 7 },
  { name: "Netherlands", flag: "🇳🇱", confederation: "UEFA", pot: 1, fifaRank: 8 },
  { name: "Belgium", flag: "🇧🇪", confederation: "UEFA", pot: 1, fifaRank: 9 },
  { name: "Germany", flag: "🇩🇪", confederation: "UEFA", pot: 1, fifaRank: 10 },
  { name: "Croatia", flag: "🇭🇷", confederation: "UEFA", pot: 1, fifaRank: 11 },
  { name: "Colombia", flag: "🇨🇴", confederation: "CONMEBOL", pot: 1, fifaRank: 13 },
  // Pot 2 — FIFA ranks 13–24
  { name: "Mexico", flag: "🇲🇽", confederation: "CONCACAF", pot: 2, fifaRank: 14 },
  { name: "Senegal", flag: "🇸🇳", confederation: "CAF", pot: 2, fifaRank: 15 },
  { name: "Uruguay", flag: "🇺🇾", confederation: "CONMEBOL", pot: 2, fifaRank: 16 },
  { name: "USA", flag: "🇺🇸", confederation: "CONCACAF", pot: 2, fifaRank: 17 },
  { name: "Japan", flag: "🇯🇵", confederation: "AFC", pot: 2, fifaRank: 18 },
  { name: "Switzerland", flag: "🇨🇭", confederation: "UEFA", pot: 2, fifaRank: 19 },
  { name: "IR Iran", flag: "🇮🇷", confederation: "AFC", pot: 2, fifaRank: 20 },
  { name: "Türkiye", flag: "🇹🇷", confederation: "UEFA", pot: 2, fifaRank: 22 },
  { name: "Ecuador", flag: "🇪🇨", confederation: "CONMEBOL", pot: 2, fifaRank: 23 },
  { name: "Austria", flag: "🇦🇹", confederation: "UEFA", pot: 2, fifaRank: 24 },
  { name: "Korea Republic", flag: "🇰🇷", confederation: "AFC", pot: 2, fifaRank: 25 },
  { name: "Australia", flag: "🇦🇺", confederation: "AFC", pot: 2, fifaRank: 27 },
  // Pot 3 — FIFA ranks 25–49
  { name: "Algeria", flag: "🇩🇿", confederation: "CAF", pot: 3, fifaRank: 28 },
  { name: "Egypt", flag: "🇪🇬", confederation: "CAF", pot: 3, fifaRank: 29 },
  { name: "Canada", flag: "🇨🇦", confederation: "CONCACAF", pot: 3, fifaRank: 30 },
  { name: "Norway", flag: "🇳🇴", confederation: "UEFA", pot: 3, fifaRank: 31 },
  { name: "Côte d'Ivoire", flag: "🇨🇮", confederation: "CAF", pot: 3, fifaRank: 33 },
  { name: "Panama", flag: "🇵🇦", confederation: "CONCACAF", pot: 3, fifaRank: 34 },
  { name: "Sweden", flag: "🇸🇪", confederation: "UEFA", pot: 3, fifaRank: 38 },
  { name: "Czechia", flag: "🇨🇿", confederation: "UEFA", pot: 3, fifaRank: 40 },
  { name: "Paraguay", flag: "🇵🇾", confederation: "CONMEBOL", pot: 3, fifaRank: 41 },
  { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA", pot: 3, fifaRank: 42 },
  { name: "Tunisia", flag: "🇹🇳", confederation: "CAF", pot: 3, fifaRank: 45 },
  { name: "Congo DR", flag: "🇨🇩", confederation: "CAF", pot: 3, fifaRank: 46 },
  // Pot 4 — FIFA ranks 50–85
  { name: "Uzbekistan", flag: "🇺🇿", confederation: "AFC", pot: 4, fifaRank: 50 },
  { name: "Qatar", flag: "🇶🇦", confederation: "AFC", pot: 4, fifaRank: 56 },
  { name: "Iraq", flag: "🇮🇶", confederation: "AFC", pot: 4, fifaRank: 57 },
  { name: "South Africa", flag: "🇿🇦", confederation: "CAF", pot: 4, fifaRank: 60 },
  { name: "Saudi Arabia", flag: "🇸🇦", confederation: "AFC", pot: 4, fifaRank: 61 },
  { name: "Jordan", flag: "🇯🇴", confederation: "AFC", pot: 4, fifaRank: 63 },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦", confederation: "UEFA", pot: 4, fifaRank: 64 },
  { name: "Cabo Verde", flag: "🇨🇻", confederation: "CAF", pot: 4, fifaRank: 67 },
  { name: "Ghana", flag: "🇬🇭", confederation: "CAF", pot: 4, fifaRank: 73 },
  { name: "Curaçao", flag: "🇨🇼", confederation: "CONCACAF", pot: 4, fifaRank: 82 },
  { name: "Haiti", flag: "🇭🇹", confederation: "CONCACAF", pot: 4, fifaRank: 83 },
  { name: "New Zealand", flag: "🇳🇿", confederation: "OFC", pot: 4, fifaRank: 85 },
];

export function getTeamsInPot(pot: Pot): Team[] {
  return TEAMS.filter((t) => t.pot === pot);
}

/** Background fill for each confederation's team badge */
export const CONF_BG: Record<string, string> = {
  UEFA: "rgba(30,58,138,0.45)",
  CONMEBOL: "rgba(6,95,70,0.45)",
  CONCACAF: "rgba(124,45,18,0.45)",
  CAF: "rgba(113,63,18,0.45)",
  AFC: "rgba(88,28,135,0.45)",
  OFC: "rgba(30,64,175,0.45)",
};

/** Border colour for each confederation's team badge */
export const CONF_BORDER: Record<string, string> = {
  UEFA: "rgba(59,130,246,0.5)",
  CONMEBOL: "rgba(34,197,94,0.5)",
  CONCACAF: "rgba(249,115,22,0.5)",
  CAF: "rgba(234,179,8,0.5)",
  AFC: "rgba(167,139,250,0.5)",
  OFC: "rgba(103,232,249,0.5)",
};

/** Text colour for confederation label inside the badge */
export const CONF_LABEL: Record<string, string> = {
  UEFA: "#93c5fd",
  CONMEBOL: "#86efac",
  CONCACAF: "#fdba74",
  CAF: "#fde68a",
  AFC: "#c4b5fd",
  OFC: "#67e8f9",
};
