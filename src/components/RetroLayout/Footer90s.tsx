import { LayoutTheme } from "@/types/layout";

interface FooterProps {
  links: Array<{
    text: string;
    href: string;
    section?: string;
  }>;
  copyright: string;
  hasNewsletter: boolean;
  socialLinks: number;
  theme?: LayoutTheme;
}

const themeStyles = {
  default: {
    footer: "bg-win95-gray mt-4 p-4 border-t-2 border-win95-border-dark text-center",
    links: "mb-4 flex justify-center gap-4",
    link: "text-win95-navy hover:text-red-600 hover:underline",
    copyright: "text-sm text-gray-600",
  },
  cyber: {
    footer: "bg-black mt-4 p-4 border-t border-green-500 text-center",
    links: "mb-4 flex justify-center gap-4",
    link: "text-green-400 hover:text-green-200 hover:underline font-mono",
    copyright: "text-sm text-green-600",
  },
  // Add more themes as needed
};

export default function Footer90s({ links, copyright, hasNewsletter, socialLinks, theme = "default" }: FooterProps) {
  const styles = themeStyles[theme];

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
          <button className="bg-win95-navy text-white px-4 py-2 hover:bg-blue-800">
            Subscribe to Newsletter
          </button>
        </div>
      )}
    </footer>
  );
} 