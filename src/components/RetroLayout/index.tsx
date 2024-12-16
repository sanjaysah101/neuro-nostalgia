import { useState } from "react";

import { LayoutTheme } from "@/types/layout";

import { WebsiteData } from "../../app/api/parse/route";
import ThemeSwitcher from "../ThemeSwitcher";
import Footer90s from "./Footer90s";
import Header90s from "./Header90s";
import Main90s from "./Main90s";
import Sidebar90s from "./Sidebar90s";

export default function RetroLayout({ data }: { data: WebsiteData }) {
  const [currentTheme, setCurrentTheme] = useState<LayoutTheme>("default");

  const themeStyles = {
    default: "bg-win95-bg text-black",
    cyber: "bg-black text-green-400",
    vaporwave: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white",
    grunge: "bg-stone-800 text-amber-100",
  };

  const layout = data?.layout || {};

  return (
    <div className={`min-h-screen ${themeStyles[currentTheme]}`}>
      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

      <div className="mx-auto max-w-7xl px-4">
        <Header90s
          title={layout.header?.title}
          logo={layout.header?.logo}
          navigation={layout.header?.mainNav || []}
          banner={layout.header?.banner}
          theme={currentTheme}
        />

        <div className="my-4 flex gap-4">
          <Sidebar90s
            navigation={data.layout.sidebar.navigation}
            categories={data.layout.sidebar.categories}
            widgets={data.layout.sidebar.widgets}
            theme={currentTheme}
          />

          <Main90s
            headings={data.layout.main.headings}
            articles={data.layout.main.content.articles}
            images={data.layout.main.content.images}
            videos={data.layout.main.content.videos}
            tables={data.layout.main.content.tables}
            theme={currentTheme}
          />
        </div>

        <Footer90s
          links={data.layout.footer.links}
          copyright={data.layout.footer.copyright}
          hasNewsletter={data.layout.footer.hasNewsletter}
          socialLinks={data.layout.footer.socialLinks}
          theme={currentTheme}
        />
      </div>
    </div>
  );
}
