import { LayoutTheme } from "@/types/layout";

import { WebsiteData } from "../../app/api/parse/route";

const themeStyles: { [key in LayoutTheme]: { sidebar: string; widget: string; title: string; content: string } } = {
  default: {
    sidebar: "w-64 bg-win95-gray p-4 border-2 border-win95-border-dark",
    widget: "mb-4 bg-win95-bg border border-win95-border-darker p-2",
    title: "bg-win95-navy text-win95-yellow p-1 mb-2 text-center font-bold",
    content: "text-sm",
  },
  cyber: {
    sidebar: "w-64 bg-black p-4 border border-green-500",
    widget: "mb-4 bg-black border border-green-400 p-2",
    title: "bg-green-900 text-green-400 p-1 mb-2 text-center font-mono",
    content: "text-sm text-green-400 font-mono",
  },
  vaporwave: {
    sidebar: "w-64 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 border border-white",
    widget: "mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border border-white p-2",
    title: "bg-white text-black p-1 mb-2 text-center font-mono",
    content: "text-sm text-white",
  },
  grunge: {
    sidebar: "w-64 bg-stone-800 p-4 border border-amber-100",
    widget: "mb-4 bg-stone-800 border border-amber-100 p-2",
    title: "bg-amber-100 text-stone-800 p-1 mb-2 text-center font-mono",
    content: "text-sm text-amber-100 font-mono",
  },
  // Add more themes as needed
};

export default function Sidebar90s({ navigation, categories, widgets, theme = "default" }: WebsiteData) {
  const styles = themeStyles[theme];

  return (
    <aside className={styles.sidebar}>
      {widgets.map((widget, index) => (
        <div key={index} className={styles.widget}>
          {widget.title && <div className={styles.title}>{widget.title}</div>}
          <div className={styles.content}>{widget.content}</div>
        </div>
      ))}
    </aside>
  );
}
