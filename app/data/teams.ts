import type { Team } from "@/app/types";

export const TEAMS: Team[] = [
  // CONMEBOL
  { name: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL" },
  { name: "Brazil", flag: "🇧🇷", confederation: "CONMEBOL" },
  { name: "Colombia", flag: "🇨🇴", confederation: "CONMEBOL" },
  { name: "Uruguay", flag: "🇺🇾", confederation: "CONMEBOL" },
  { name: "Ecuador", flag: "🇪🇨", confederation: "CONMEBOL" },
  { name: "Paraguay", flag: "🇵🇾", confederation: "CONMEBOL" },
  // CONCACAF
  { name: "USA", flag: "🇺🇸", confederation: "CONCACAF" },
  { name: "Mexico", flag: "🇲🇽", confederation: "CONCACAF" },
  { name: "Canada", flag: "🇨🇦", confederation: "CONCACAF" },
  { name: "Panama", flag: "🇵🇦", confederation: "CONCACAF" },
  { name: "Curaçao", flag: "🇨🇼", confederation: "CONCACAF" },
  { name: "Haiti", flag: "🇭🇹", confederation: "CONCACAF" },
  // UEFA
  { name: "Germany", flag: "🇩🇪", confederation: "UEFA" },
  { name: "France", flag: "🇫🇷", confederation: "UEFA" },
  { name: "Spain", flag: "🇪🇸", confederation: "UEFA" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA" },
  { name: "Portugal", flag: "🇵🇹", confederation: "UEFA" },
  { name: "Netherlands", flag: "🇳🇱", confederation: "UEFA" },
  { name: "Belgium", flag: "🇧🇪", confederation: "UEFA" },
  { name: "Austria", flag: "🇦🇹", confederation: "UEFA" },
  { name: "Switzerland", flag: "🇨🇭", confederation: "UEFA" },
  { name: "Croatia", flag: "🇭🇷", confederation: "UEFA" },
  { name: "Norway", flag: "🇳🇴", confederation: "UEFA" },
  { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA" },
  { name: "Sweden", flag: "🇸🇪", confederation: "UEFA" },
  { name: "Türkiye", flag: "🇹🇷", confederation: "UEFA" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦", confederation: "UEFA" },
  { name: "Czechia", flag: "🇨🇿", confederation: "UEFA" },
  // CAF
  { name: "Morocco", flag: "🇲🇦", confederation: "CAF" },
  { name: "Senegal", flag: "🇸🇳", confederation: "CAF" },
  { name: "Egypt", flag: "🇪🇬", confederation: "CAF" },
  { name: "Algeria", flag: "🇩🇿", confederation: "CAF" },
  { name: "South Africa", flag: "🇿🇦", confederation: "CAF" },
  { name: "Congo DR", flag: "🇨🇩", confederation: "CAF" },
  { name: "Ghana", flag: "🇬🇭", confederation: "CAF" },
  { name: "Côte d'Ivoire", flag: "🇨🇮", confederation: "CAF" },
  { name: "Tunisia", flag: "🇹🇳", confederation: "CAF" },
  { name: "Cabo Verde", flag: "🇨🇻", confederation: "CAF" },
  // AFC
  { name: "Japan", flag: "🇯🇵", confederation: "AFC" },
  { name: "Korea Republic", flag: "🇰🇷", confederation: "AFC" },
  { name: "IR Iran", flag: "🇮🇷", confederation: "AFC" },
  { name: "Australia", flag: "🇦🇺", confederation: "AFC" },
  { name: "Saudi Arabia", flag: "🇸🇦", confederation: "AFC" },
  { name: "Uzbekistan", flag: "🇺🇿", confederation: "AFC" },
  { name: "Jordan", flag: "🇯🇴", confederation: "AFC" },
  { name: "Iraq", flag: "🇮🇶", confederation: "AFC" },
  { name: "Qatar", flag: "🇶🇦", confederation: "AFC" },
  // OFC
  { name: "New Zealand", flag: "🇳🇿", confederation: "OFC" },
];

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
