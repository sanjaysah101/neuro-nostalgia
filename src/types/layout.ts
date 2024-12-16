export type LayoutTheme = "default" | "cyber" | "vaporwave" | "grunge";

export interface ThemeSwitcherProps {
  currentTheme: LayoutTheme;
  onThemeChange: (theme: LayoutTheme) => void;
}
