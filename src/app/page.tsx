"use client";

import Image from "next/image";
import { useState } from "react";

import { BackToTop } from "@/components/BackToTop";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { RetroButton } from "@/components/RetroButton";
import { RetroWindow } from "@/components/RetroWindow";
import { useWebsiteTransform } from "@/hooks/useWebsiteTransform";

import WebsitePreview from "../components/WebsitePreview";

export default function Home() {
  const [url, setUrl] = useState("https://webdevnerds.com");
  const { transform, loading, error, transformedHtml } = useWebsiteTransform();
  console.log({ transformedHtml });
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await transform(url);
    setShowPreview(true);
  };

  // Format the date consistently
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#00007b] text-white">
      <div className="m-auto p-4">
        {/* Main Window */}
        <RetroWindow title="Neuro Nostalgia - Web Time Machine">
          <div className="space-y-6 bg-[#00007b] p-6 text-center">
            <div className="text-yellow-300">
              ⭐ Welcome to the Web Time Machine! Transform any modern website into 90s style! ⭐
            </div>

            <div className="bg-[#c0c0c0] p-2 text-black">
              <Image src="/images/new.gif" alt="New!" width={30} height={15} className="mr-2 inline" />
              Best viewed in 800x600 resolution with Netscape Navigator!
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Image
                src="/images/construction.gif"
                alt="Under Construction"
                width={88}
                height={31}
                className="h-auto w-auto"
              />
              <span className="text-white">Transform any modern website into 90s style!</span>
              <Image
                src="/images/construction.gif"
                alt="Under Construction"
                width={88}
                height={31}
                className="h-auto w-auto"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <RetroButton onClick={() => (window.location.href = "mailto:webmaster@example.com")}>
                📧 Email Webmaster
              </RetroButton>
              <RetroButton onClick={() => window.open("guestbook.html", "_blank")}>✍️ Sign Guestbook</RetroButton>
            </div>
          </div>
        </RetroWindow>

        {/* URL Input Window */}
        <RetroWindow title="Transform Website" className="mt-4">
          <div className="bg-[#c0c0c0] p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="url" className="mb-2 block text-black">
                  Enter Website URL:
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
                  Transform to 90s Style
                </RetroButton>
              </div>
              {error && <div className="mt-4 bg-red-100 p-2 text-red-700">{error}</div>}
            </form>
          </div>
        </RetroWindow>

        {/* Preview Section */}
        {showPreview && <WebsitePreview url={url} transformedHtml={transformedHtml} loading={loading} />}

        {/* Web Ring */}
        <div className="mt-4 bg-[#c0c0c0] p-4">
          <div className="text-center text-black">
            <div className="mb-2">Part of the Web Time Machine Ring</div>
            <div className="flex justify-center space-x-4">
              <RetroButton>← Previous</RetroButton>
              <RetroButton>Random</RetroButton>
              <RetroButton>Next →</RetroButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <div>Created for the Neuro Nostalgia Hackathon 2024</div>
          <div className="mt-2 text-sm">Last Updated: {formattedDate}</div>
          <Image
            src="/images/netscape.gif"
            alt="Best viewed in Netscape"
            className="mx-auto mt-4"
            width={88}
            height={31}
          />
        </div>
      </div>

      {loading && <LoadingAnimation />}
      <BackToTop />
    </div>
  );
}
