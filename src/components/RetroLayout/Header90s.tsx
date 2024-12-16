import Image from "next/image";

import { LayoutTheme } from "@/types/layout";

interface Header90sProps {
  title?: string;
  logo?: string;
  navigation?: Array<{
    text: string;
    href: string;
    isActive: boolean;
    hasIcon: boolean;
  }>;
  banner?: string;
  theme?: LayoutTheme;
}

const themeStyles = {
  default: {
    header: "bg-win95-navy text-win95-yellow text-center p-4 border-2 border-win95-border",
    logo: "border-2 border-white p-1 bg-win95-gray",
    nav: "bg-win95-gray p-2 border-2 border-win95-border-darker mt-2",
    link: "text-win95-navy font-bold mx-4 hover:text-red-600 hover:underline",
  },
  cyber: {
    header: "bg-black text-green-400 text-center p-4 border border-green-500",
    logo: "border border-green-500 p-1 bg-black",
    nav: "bg-black p-2 border border-green-500 mt-2",
    link: "text-green-400 font-mono mx-4 hover:text-green-200 hover:underline",
  },
};

export default function Header90s({
  title = "Transformed Website",
  logo,
  navigation = [],
  banner,
  theme = "default",
}: Header90sProps) {
  const styles = themeStyles[theme];

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        {logo && <Image src={logo} alt={title} width={100} height={100} className={styles.logo} priority />}
        <h1 className="my-2 text-2xl font-bold">{title}</h1>
        {banner && <Image src={banner} alt="" width={800} height={200} className="mx-auto my-2" priority={false} />}
        {navigation.length > 0 && (
          <nav className={styles.nav}>
            {navigation.map((item, index) => (
              <a
                key={item.href || index}
                href={item.href}
                className={`${styles.link} ${item.isActive ? "font-extrabold" : ""}`}
              >
                {item.hasIcon && "🔹"} {item.text}
              </a>
            ))}
          </nav>
        )}
      </nav>
    </header>
  );
}
