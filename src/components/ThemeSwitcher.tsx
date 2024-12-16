import { ThemeSwitcherProps } from "@/types/layout";

const themes = [
  { id: "default", name: "Windows 95" },
  { id: "cyber", name: "Cyberpunk" },
  { id: "vaporwave", name: "Vaporwave" },
  { id: "grunge", name: "Grunge" },
  { id: "classic", name: "Retro HTML" },
  { id: "frames", name: "Bordered" },
  { id: "tables", name: "Structured" },
] as const;

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold">Select Theme:</label>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`rounded px-4 py-2 ${
              currentTheme === theme.id ? "bg-win95-navy text-white" : "bg-win95-gray hover:bg-win95-gray-dark"
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
