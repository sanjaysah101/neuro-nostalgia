"use client";

import Image from "next/image";
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
      <div className="container m-auto p-4">
        {/* Hit Counter and Last Updated */}
        <div className="mb-4 flex justify-between bg-[#c0c0c0] p-2 text-black">
          <div>
            <Image src="/images/counter.gif" alt="Visitor Counter" width={20} height={20} className="mr-2 inline" />
            Visitors: {visitorCount.toLocaleString()}
          </div>
          <div>Last Updated: {formattedDate}</div>
        </div>

        {/* Main Window */}
        <RetroWindow title="Neuro Nostalgia - Web Time Machine">
          <div className="space-y-6 bg-[#000080] p-6">
            {/* Animated Welcome Banner */}
            <div className="relative">
              <Image
                src="/images/welcome.gif"
                alt="Welcome Banner"
                width={400}
                height={100}
                className="mx-auto"
                priority
              />
              <marquee className="mt-2 bg-black p-2 text-yellow-300">
                🚀 Transform ANY modern website into authentic 90s style! 🚀
              </marquee>
            </div>

            {/* Browser Compatibility Notice */}
            <div className="flex items-center justify-center space-x-2 bg-[#c0c0c0] p-2 text-black">
              <Image src="/images/ie_logo.gif" alt="IE Logo" width={20} height={20} />
              <span>Best viewed in Internet Explorer 4.0 or Netscape Navigator 4.0</span>
              <Image src="/images/netscape.gif" alt="Netscape Logo" width={20} height={20} />
            </div>

            {/* Features List */}
            <div className="mx-auto max-w-lg bg-[#000000] p-4 text-left font-['Courier_New'] text-green-400">
              <div className="mb-2 text-center text-xl">🌟 Features 🌟</div>
              <ul className="list-inside list-disc space-y-2">
                <li>Transform modern websites into 90s style</li>
                <li>Multiple retro themes available</li>
                <li>Authentic table-based layouts</li>
                <li>Animated GIF support</li>
                <li>Web-safe colors</li>
              </ul>
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
            <div className="flex justify-center space-x-4">
              <Image src="/images/award1.gif" alt="Best Site Award" width={88} height={31} />
              <Image src="/images/award2.gif" alt="Cool Site Award" width={88} height={31} />
              <Image src="/images/award3.gif" alt="Web Excellence" width={88} height={31} />
            </div>
          </div>
        </RetroWindow>

        {/* Preview Section */}
        {showPreview && <WebsitePreview url={url} transformedHtml={transformedHtml} loading={loading} />}

        {/* Web Ring Navigation */}
        <div className="mt-4 bg-[#c0c0c0] p-4">
          <div className="text-center text-black">
            <Image src="/images/webring.gif" alt="Web Ring" width={88} height={31} className="mx-auto mb-2" />
            <div className="flex justify-center space-x-4">
              <RetroButton>← Previous</RetroButton>
              <RetroButton>Random</RetroButton>
              <RetroButton>Next →</RetroButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-4 text-center">
          <div className="space-y-2">
            <div>Made with 💾 for the Neuro Nostalgia Hackathon 2024</div>
            <div className="flex justify-center space-x-4">
              <Image src="/images/html_valid.gif" alt="Valid HTML" width={88} height={31} />
              <Image src="/images/css_valid.gif" alt="Valid CSS" width={88} height={31} />
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
