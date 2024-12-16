import Image from "next/image";
import { useEffect, useState } from "react";

import { WebsiteData } from "@/app/api/parse/route";
import { LayoutTheme } from "@/types/layout";

import ThemeSwitcher from "../ThemeSwitcher";
import Footer90s from "./Footer90s";
import Header90s from "./Header90s";
import Main90s from "./Main90s";
import Sidebar90s from "./Sidebar90s";

interface RetroLayoutProps {
  data: WebsiteData;
}

export default function RetroLayout({ data }: RetroLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<LayoutTheme>("default");
  const [layoutStyle, setLayoutStyle] = useState<"classic" | "frames" | "table">("classic");
  const [showHitCounter, setShowHitCounter] = useState(true);
  const hitCount = Math.floor(Math.random() * 10000);

  const themeStyles = {
    default: {
      bg: "bg-[#c0c0c0]",
      text: "text-black",
      border: "border-win95-border",
      window: "bg-[#ffffff] shadow-win95",
    },
    cyber: {
      bg: "bg-black",
      text: "text-green-400",
      border: "border-green-500",
      window: "bg-black shadow-neon-green",
    },
    vaporwave: {
      bg: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
      text: "text-white",
      border: "border-white",
      window: "bg-[#000000] shadow-neon-pink",
    },
    grunge: {
      bg: "bg-[#2c1810]",
      text: "text-amber-100",
      border: "border-amber-900",
      window: "bg-stone-900 shadow-grunge",
    },
  };

  const layout = data?.layout || {
    header: {},
    main: { content: {} },
    sidebar: {},
    footer: {},
  };

  const sidebarNavigation =
    layout.sidebar?.navigation?.flatMap((nav) =>
      nav.menuLinks?.map((link) => ({
        text: link.text,
        href: link.href,
      }))
    ) || [];

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
    <div className="mx-auto max-w-6xl space-y-4 px-4">
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
            <Sidebar90s {...layout.sidebar} theme={currentTheme} />
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

  useEffect(() => {
    const timer = setTimeout(() => setShowHitCounter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${themeStyles[currentTheme].bg} p-4`}>
      {renderLayoutSwitcher()}

      {layoutStyle === "classic" && renderClassicLayout()}
      {layoutStyle === "frames" && renderFramesLayout()}
      {layoutStyle === "table" && renderTableLayout()}

      {/* 90s Footer Elements */}
      <div className="mt-4 space-y-2 text-center">
        {showHitCounter && (
          <div className="flex items-center justify-center space-x-2">
            <Image src="/images/counter.gif" alt="Hit Counter" width={16} height={16} />
            <span className="font-['Courier_New'] text-sm">Visitors: {hitCount}</span>
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <Image src="/images/html_valid.gif" alt="Valid HTML" width={88} height={31} />
          <Image src="/images/css_valid.gif" alt="Valid CSS" width={88} height={31} />
          <Image src="/images/netscape_now.gif" alt="Netscape Now" width={88} height={31} />
        </div>
      </div>
    </div>
  );
}
