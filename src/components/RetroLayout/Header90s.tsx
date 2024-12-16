import Image from "next/image";

import { LayoutTheme } from "@/types/layout";

import { getHeaderStyles } from "./themeStyles";

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

export default function Header90s({
  title = "Transformed Website",
  logo,
  navigation = [],
  banner,
  theme = "default",
}: Header90sProps) {
  const styles = getHeaderStyles(theme);

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
