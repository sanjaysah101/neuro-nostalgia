import { LayoutTheme } from "../../types/layout";
import { getFooterStyles } from "./themeStyles";

interface FooterProps {
  links: Array<{
    text: string;
    href: string;
    section?: string;
  }>;
  copyright: string;
  hasNewsletter: boolean;
  theme?: LayoutTheme;
}

export default function Footer90s({ links, copyright, hasNewsletter, theme = "default" }: FooterProps) {
  const styles = getFooterStyles(theme);

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {links.map((link, index) => (
          <a key={index} href={link.href} className={styles.link}>
            {link.text}
          </a>
        ))}
      </div>
      {copyright && <div className={styles.copyright}>{copyright}</div>}
      {hasNewsletter && (
        <div className="mt-4">
          <button className="bg-win95-navy px-4 py-2 text-white hover:bg-blue-800">Subscribe to Newsletter</button>
        </div>
      )}
    </footer>
  );
}
