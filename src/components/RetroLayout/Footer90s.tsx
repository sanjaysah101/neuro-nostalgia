import { LayoutTheme } from "@/types/layout";

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

const themeStyles: { [key in LayoutTheme]: { footer: string; links: string; link: string; copyright: string } } = {
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
  vaporwave: {
    footer: "bg-black/50 mt-4 p-4 border-t border-white text-center",
    links: "mb-4 flex justify-center gap-4",
    link: "text-white hover:text-pink-300 hover:underline",
    copyright: "text-sm text-white/60",
  },
  grunge: {
    footer: "bg-stone-800 mt-4 p-4 border-t border-amber-100 text-center",
    links: "mb-4 flex justify-center gap-4",
    link: "text-amber-100 hover:text-amber-200 hover:underline",
    copyright: "text-sm text-amber-100/60",
  },
};

export default function Footer90s({ links, copyright, hasNewsletter, theme = "default" }: FooterProps) {
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
          <button className="bg-win95-navy px-4 py-2 text-white hover:bg-blue-800">Subscribe to Newsletter</button>
        </div>
      )}
    </footer>
  );
}
