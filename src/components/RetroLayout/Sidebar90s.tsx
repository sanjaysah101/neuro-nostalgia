import { LayoutTheme } from "@/types/layout";

interface SidebarProps {
  navigation?: Array<{
    text: string;
    href: string;
  }>;
  categories?: string[];
  widgets?: Array<{
    title: string;
    content: string;
    hasImage: boolean;
  }>;
  theme?: LayoutTheme;
}

const themeStyles: {
  [key in LayoutTheme]: { sidebar: string; widget: string; title: string; content: string; link: string };
} = {
  default: {
    sidebar: "w-64 bg-[#c0c0c0] p-4 border-2 border-[#808080] shadow-win95",
    widget: "mb-4 bg-white border-2 border-[#808080] shadow-win95",
    title: "bg-[#000080] text-white p-1 mb-2 text-center font-bold shadow-win95",
    content: "p-2 text-sm text-black",
    link: "text-[#000080] hover:text-[#0000ff] hover:underline",
  },
  cyber: {
    sidebar: "w-64 bg-black p-4 border border-green-500",
    widget: "mb-4 bg-black border border-green-400",
    title: "bg-green-900 text-green-400 p-1 mb-2 text-center font-mono",
    content: "p-2 text-sm text-green-400 font-mono",
    link: "text-green-400 hover:text-green-300 hover:underline",
  },
  vaporwave: {
    sidebar: "w-64 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 border border-white",
    widget: "mb-4 bg-black/50 border border-white",
    title: "bg-white text-black p-1 mb-2 text-center font-mono",
    content: "p-2 text-sm text-white",
    link: "text-white hover:text-pink-300 hover:underline",
  },
  grunge: {
    sidebar: "w-64 bg-stone-800 p-4 border border-amber-100",
    widget: "mb-4 bg-stone-800 border border-amber-100",
    title: "bg-amber-100 text-stone-800 p-1 mb-2 text-center font-mono",
    content: "p-2 text-sm text-amber-100 font-mono",
    link: "text-amber-100 hover:text-amber-200 hover:underline",
  },
};

export default function Sidebar90s({
  navigation = [],
  categories = [],
  widgets = [],
  theme = "default",
}: SidebarProps) {
  const styles = themeStyles[theme];

  return (
    <aside className={styles.sidebar}>
      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className={styles.widget}>
          <div className={styles.title}>Categories</div>
          <div className={styles.content}>
            <ul className="space-y-1">
              {categories.map((category, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">📁</span>
                  <a href="#" className={styles.link}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      {navigation.length > 0 && (
        <div className={styles.widget}>
          <div className={styles.title}>Navigation</div>
          <div className={styles.content}>
            <ul className="space-y-1">
              {navigation.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={styles.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Additional Widgets */}
      {widgets.map((widget, index) => (
        <div key={index} className={styles.widget}>
          {widget.title && <div className={styles.title}>{widget.title}</div>}
          <div className={styles.content}>
            {/* Strip CSS and render clean text content */}
            {widget.content
              .replace(/\{[^}]*\}/g, "")
              .replace(/\.[^{]*\{[^}]*\}/g, "")
              .replace(/\..*{.*}/g, "")
              .replace(/style="[^"]*"/g, "")
              .replace(/<style>.*<\/style>/g, "")}
          </div>
        </div>
      ))}

      {/* Hit Counter Widget */}
      <div className={styles.widget}>
        <div className={styles.title}>Site Stats</div>
        <div className={`${styles.content} text-center`}>
          <div className="mb-2">
            <img src="/images/counter.gif" alt="Hit Counter" className="mr-2 inline-block" />
            <span>Visitors: 1,337</span>
          </div>
          <div className="text-xs text-gray-600">Last Updated: {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Web Buttons */}
      <div className="mt-4 space-y-2 text-center">
        <img src="/images/netscape_now.gif" alt="Netscape Now!" width="88" height="31" className="mx-auto" />
        <img src="/images/ie_logo.gif" alt="Internet Explorer" width="88" height="31" className="mx-auto" />
      </div>
    </aside>
  );
}
