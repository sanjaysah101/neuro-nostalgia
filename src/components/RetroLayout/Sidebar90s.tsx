import { LayoutTheme } from "../../types/layout";
import { getSidebarStyles } from "./themeStyles";

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

export default function Sidebar90s({
  navigation = [],
  categories = [],
  widgets = [],
  theme = "default",
}: SidebarProps) {
  const styles = getSidebarStyles(theme);

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
    </aside>
  );
}
