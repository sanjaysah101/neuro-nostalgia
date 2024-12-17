"use client";

import { useState } from "react";

import { LoadingAnimation } from "./LoadingAnimation";
import { RetroWindow } from "./RetroWindow";

const OriginalWebsitePreview = ({ url }: { url: string }) => {
  // Add state for iframe loading
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  // Handle iframe events
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoading(false);
  };

  return (
    <RetroWindow title={`Original Website - ${url}`} url={url} className="mt-8 bg-[#c0c0c0]">
      <div className="h-[600px] overflow-hidden bg-white">
        {/* Website Content */}
        <div className="relative h-[500px] border-2 border-[#808080] bg-white p-4">
          {iframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#c0c0c0]">
              <LoadingAnimation />
            </div>
          )}
          {iframeError ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-xl">⚠️ Unable to load website</div>
                <div className="text-sm text-gray-600">Try refreshing or check the URL</div>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              className="h-full w-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts"
              title="Original Website Preview"
            />
          )}
        </div>
      </div>
    </RetroWindow>
  );
};

export default OriginalWebsitePreview;
