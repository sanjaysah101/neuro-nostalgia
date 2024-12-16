"use client";

import { useEffect, useState } from "react";

import { BackToTop } from "@/components/BackToTop";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { RetroButton } from "@/components/RetroButton";
import { RetroWindow } from "@/components/RetroWindow";
import { useWebsiteTransform } from "@/hooks/useWebsiteTransform";

import WebsitePreview from "../components/WebsitePreview";

export default function Home() {
  const [url, setUrl] = useState("https://webdevnerds.com");
  const { transform, loading, error, transformedHtml } = useWebsiteTransform();
  const [showPreview, setShowPreview] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1000); // Start with a default value

  console.log({ transformedHtml });

  useEffect(() => {
    // Generate random visitor count after component mounts
    setVisitorCount(Math.floor(Math.random() * 10000) + 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await transform(url);
    setShowPreview(true);
  };

  // Format the date on client side only
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#000080] text-white">
      <div className="m-auto max-w-4xl p-4">
        <div className="mb-4 flex justify-between border-2 border-[#808080] bg-[#c0c0c0] p-2 text-black">
          <div className="flex items-center">
            <span className="mr-2 font-bold">
              <span className="animate-pulse">🔄</span> System Status:
            </span>
            <span className="bg-black px-2 font-['Courier_New'] text-green-400">[ONLINE]</span>
          </div>
          <div>
            <span className="font-bold">📅 Last Update:</span>{" "}
            <span className="font-['Courier_New']">{formattedDate}</span>
          </div>
        </div>

        {/* Main Window */}
        <RetroWindow title="Neuro Nostalgia - Web Time Machine">
          <div className="space-y-6 bg-[#000080] p-6">
            {/* Animated Welcome Banner */}
            <div className="relative">
              <h1 className="mb-6 text-center text-6xl font-bold tracking-widest">
                <span className="animate-pulse text-yellow-300">W</span>
                <span className="animate-pulse text-cyan-400">E</span>
                <span className="animate-pulse text-pink-500">L</span>
                <span className="animate-pulse text-green-400">C</span>
                <span className="animate-pulse text-yellow-300">O</span>
                <span className="animate-pulse text-cyan-400">M</span>
                <span className="animate-pulse text-pink-500">E</span>
              </h1>
              <div className="mt-2 overflow-hidden whitespace-nowrap bg-black p-2">
                <div className="animate-marquee inline-block text-yellow-300">
                  ⭐️ Transform ANY modern website into authentic 90s style! ⭐️ &nbsp;&nbsp;||&nbsp;&nbsp;
                  <span className="text-cyan-400">✨ Experience the magic of Web 1.0! ✨</span>
                </div>
              </div>
            </div>

            {/* Browser Compatibility Notice */}
            <div className="flex items-center justify-center space-x-2 bg-[#c0c0c0] p-2 text-black">
              <span>🌐</span>
              <span>Best viewed in Internet Explorer 4.0 or Netscape Navigator 4.0</span>
              <span>🌐</span>
            </div>

            {/* Features List */}
            <div className="w-full border-4 border-[#808080] bg-black p-4">
              <div className="mb-4 bg-[#000080] p-2 text-center font-bold text-yellow-300">
                <span className="inline-block animate-pulse">🌟 AWESOME FEATURES 🌟</span>
              </div>
              <div className="font-['Courier_New'] text-sm text-green-400 sm:text-base">
                <ul className="list-inside list-disc space-y-1 sm:space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="shrink-0 text-cyan-400">►</span>
                    <span>Transform modern websites into 90s style</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="shrink-0 text-cyan-400">►</span>
                    <span>Multiple retro themes available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="shrink-0 text-cyan-400">►</span>
                    <span>Authentic table-based layouts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="shrink-0 text-cyan-400">►</span>
                    <span>Animated GIF support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="shrink-0 text-cyan-400">►</span>
                    <span>Web-safe colors</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* URL Input Section */}
            <div className="rounded border-2 border-gray-400 bg-[#c0c0c0] p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="url" className="mb-2 block text-black">
                    Enter Website URL to Transform:
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="win95-input w-full"
                    required
                    placeholder="https://example.com"
                  />
                </div>
                <div className="text-center">
                  <RetroButton type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Transform to 90s Style!"}
                  </RetroButton>
                </div>
                {error && <div className="mt-4 rounded border border-red-500 bg-red-100 p-2 text-red-700">{error}</div>}
              </form>
            </div>

            {/* Awards Section */}
            <div className="flex justify-center space-x-4 font-['Courier_New'] text-yellow-300">
              <div className="border-2 border-gray-400 bg-black p-2 text-center">
                <div>[★★★]</div>
                <div>BEST SITE</div>
                <div>2024</div>
              </div>
              <div className="border-2 border-gray-400 bg-black p-2 text-center">
                <div>[⚡️⚡️⚡️]</div>
                <div>COOL SITE</div>
                <div>AWARD</div>
              </div>
              <div className="border-2 border-gray-400 bg-black p-2 text-center">
                <div>[🏆]</div>
                <div>WEB</div>
                <div>EXCELLENCE</div>
              </div>
            </div>
          </div>
        </RetroWindow>

        {/* Preview Section */}
        {showPreview && <WebsitePreview url={url} transformedHtml={transformedHtml} loading={loading} />}

        {/* Footer */}
        <footer className="mt-4 text-center">
          <div className="space-y-2">
            <div>Made with 💾 for the Neuro Nostalgia Hackathon 2024</div>
            <div className="flex justify-center space-x-4">
              <div className="border border-gray-400 bg-black p-1">
                <pre className="text-xs text-green-400">
                  ┌─────────┐{"\n"} HTML 1.0 {"\n"} VALID {"\n"}└─────────┘
                </pre>
              </div>
              <div className="border border-gray-400 bg-black p-1">
                <pre className="text-xs text-cyan-400">
                  ┌─────────┐{"\n"} CSS 1.0 {"\n"} VALID {"\n"}└─────────┘
                </pre>
              </div>
            </div>
            <div className="text-sm">
              <a href="mailto:webmaster@example.com" className="text-yellow-300 hover:underline">
                📧 Contact Webmaster
              </a>
            </div>
          </div>
        </footer>
      </div>

      {loading && <LoadingAnimation />}
      <BackToTop />
    </div>
  );
}
