export type LayoutTheme =
  | "default" // Windows 95 style
  | "cyber" // Cyberpunk/Matrix style
  | "vaporwave" // Vaporwave aesthetic
  | "grunge" // 90s grunge style
  | "classic" // Classic HTML style
  | "frames" // HTML frames style
  | "tables"; // Table-based layout

export interface ThemeSwitcherProps {
  currentTheme: LayoutTheme;
  onThemeChange: (theme: LayoutTheme) => void;
}
