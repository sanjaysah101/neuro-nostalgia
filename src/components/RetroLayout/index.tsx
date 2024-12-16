import { useState } from "react";

import { LayoutTheme } from "@/types/layout";
import { WebsiteData } from "@/app/api/parse/route";

import Footer90s from "./Footer90s";
import Header90s from "./Header90s";
import Main90s from "./Main90s";
import Sidebar90s from "./Sidebar90s";
import ThemeSwitcher from "../ThemeSwitcher";

interface RetroLayoutProps {
  data: WebsiteData;
}

export default function RetroLayout({ data }: RetroLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<LayoutTheme>("default");
  const [isFramesetView, setIsFramesetView] = useState(false);

  const themeStyles = {
    default: "bg-win95-bg text-black",
    cyber: "bg-black text-green-400",
    vaporwave: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white",
    grunge: "bg-stone-800 text-amber-100",
  };

  // Ensure data.layout exists before accessing its properties
  const layout = data?.layout || {
    header: {},
    main: { content: {} },
    sidebar: {},
    footer: {},
  };

  return (
    <div className={`min-h-screen ${themeStyles[currentTheme]}`}>
      <div className="mb-4 flex items-center justify-between bg-[#c0c0c0] p-2">
        <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        <button
          onClick={() => setIsFramesetView(!isFramesetView)}
          className="rounded border border-gray-600 bg-[#c0c0c0] px-4 py-1"
        >
          {isFramesetView ? "Table Layout" : "Frameset Layout"}
        </button>
      </div>

      {isFramesetView ? (
        <div className="grid grid-cols-5 gap-2 border-2 border-[#808080]">
          <div className="col-span-1 bg-[#c0c0c0] p-2">
            <Sidebar90s
              navigation={layout.sidebar?.navigation || []}
              categories={layout.sidebar?.categories || []}
              widgets={layout.sidebar?.widgets || []}
              theme={currentTheme}
            />
          </div>
          <div className="col-span-4">
            <Header90s
              title={layout.header?.title}
              logo={layout.header?.logo}
              navigation={layout.header?.mainNav || []}
              banner={layout.header?.banner}
              theme={currentTheme}
            />
            <Main90s
              headings={layout.main?.headings || { h1: [], h2: [], h3: [] }}
              articles={layout.main?.content?.articles || []}
              images={layout.main?.content?.images || []}
              videos={layout.main?.content?.videos || []}
              tables={layout.main?.content?.tables || []}
              theme={currentTheme}
            />
          </div>
        </div>
      ) : (
        // Keep existing table-based layout
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
              navigation={layout.sidebar?.navigation || []}
              categories={layout.sidebar?.categories || []}
              widgets={layout.sidebar?.widgets || []}
              theme={currentTheme}
            />

            <Main90s
              headings={layout.main?.headings || { h1: [], h2: [], h3: [] }}
              articles={layout.main?.content?.articles || []}
              images={layout.main?.content?.images || []}
              videos={layout.main?.content?.videos || []}
              tables={layout.main?.content?.tables || []}
              theme={currentTheme}
            />
          </div>

          <Footer90s
            links={layout.footer?.links || []}
            copyright={layout.footer?.copyright || ""}
            hasNewsletter={layout.footer?.hasNewsletter || false}
            socialLinks={layout.footer?.socialLinks || []}
            theme={currentTheme}
          />
        </div>
      )}
    </div>
  );
}
