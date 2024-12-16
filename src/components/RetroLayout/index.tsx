import { useState } from "react";

import { WebsiteData } from "@/app/api/parse/route";
import { LayoutTheme } from "@/types/layout";

import ThemeSwitcher from "../ThemeSwitcher";
import Footer90s from "./Footer90s";
import Header90s from "./Header90s";
import Main90s from "./Main90s";
import Sidebar90s from "./Sidebar90s";
import { themeStyles } from "./themeStyles";

interface RetroLayoutProps {
  data: WebsiteData;
}

export default function RetroLayout({ data }: RetroLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<LayoutTheme>("default");
  const [layoutStyle, setLayoutStyle] = useState<"classic" | "frames" | "table">("classic");

  const styles = themeStyles[currentTheme];

  const layout = data?.layout || {
    header: {},
    main: { content: {} },
    sidebar: {},
    footer: {},
  };

  const sidebarNavigation =
    layout.sidebar?.navigation
      ?.flatMap((nav) => nav.menuLinks || [])
      .map((link) => ({
        text: link.text,
        href: link.href,
      })) || [];

  const renderLayoutSwitcher = () => (
    <div className="mb-4 flex items-center justify-between space-x-2 bg-[#808080] p-2">
      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      <div className="flex space-x-2">
        <button
          onClick={() => setLayoutStyle("classic")}
          className={`rounded border-2 px-3 py-1 ${
            layoutStyle === "classic" ? "border-[#ffffff] bg-[#000080] text-white" : "border-[#808080] bg-[#c0c0c0]"
          }`}
        >
          Classic
        </button>
        <button
          onClick={() => setLayoutStyle("frames")}
          className={`rounded border-2 px-3 py-1 ${
            layoutStyle === "frames" ? "border-[#ffffff] bg-[#000080] text-white" : "border-[#808080] bg-[#c0c0c0]"
          }`}
        >
          Frames
        </button>
        <button
          onClick={() => setLayoutStyle("table")}
          className={`rounded border-2 px-3 py-1 ${
            layoutStyle === "table" ? "border-[#ffffff] bg-[#000080] text-white" : "border-[#808080] bg-[#c0c0c0]"
          }`}
        >
          Tables
        </button>
      </div>
    </div>
  );

  const renderClassicLayout = () => (
    <div className="mx-auto space-y-4 px-4">
      <Header90s {...layout.header} theme={currentTheme} />
      <div className="flex gap-4">
        <Sidebar90s {...layout.sidebar} navigation={sidebarNavigation} theme={currentTheme} />
        <Main90s {...layout.main} theme={currentTheme} />
      </div>
      <Footer90s {...layout.footer} theme={currentTheme} />
    </div>
  );

  const renderFramesLayout = () => (
    <div className="grid h-[800px] grid-cols-6 grid-rows-[auto_1fr_auto] gap-1 border-4 border-[#808080]">
      <div className="col-span-6 bg-[#000080] p-2">
        <Header90s {...layout.header} theme={currentTheme} />
      </div>
      <div className="col-span-1 row-span-1 overflow-auto bg-[#c0c0c0] p-2">
        <Sidebar90s {...layout.sidebar} navigation={sidebarNavigation} theme={currentTheme} />
      </div>
      <div className="col-span-5 row-span-1 overflow-auto bg-white p-4">
        <Main90s {...layout.main} theme={currentTheme} />
      </div>
      <div className="col-span-6 bg-[#c0c0c0] p-2">
        <Footer90s {...layout.footer} theme={currentTheme} />
      </div>
    </div>
  );

  const renderTableLayout = () => (
    <table className="w-full border-collapse border-2 border-[#808080]">
      <tbody>
        <tr>
          <td colSpan={2} className="border-2 border-[#808080] bg-[#000080] p-2">
            <Header90s {...layout.header} theme={currentTheme} />
          </td>
        </tr>
        <tr>
          <td className="w-64 border-2 border-[#808080] bg-[#c0c0c0] p-2 align-top">
            <Sidebar90s {...layout.sidebar} navigation={sidebarNavigation} theme={currentTheme} />
          </td>
          <td className="border-2 border-[#808080] bg-white p-4">
            <Main90s {...layout.main} theme={currentTheme} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="border-2 border-[#808080] bg-[#c0c0c0] p-2">
            <Footer90s {...layout.footer} theme={currentTheme} />
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className={`min-h-screen ${styles.bg} p-4`}>
      {renderLayoutSwitcher()}

      {layoutStyle === "classic" && renderClassicLayout()}
      {layoutStyle === "frames" && renderFramesLayout()}
      {layoutStyle === "table" && renderTableLayout()}
    </div>
  );
}
