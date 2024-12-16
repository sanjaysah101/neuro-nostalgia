import { useState } from "react";

import { WebsiteData } from "../app/api/parse/route";
import { LoadingAnimation } from "./LoadingAnimation";
import RetroLayout from "./RetroLayout";
import { RetroWindow } from "./RetroWindow";

const WebsitePreview = ({
  url,
  transformedHtml,
  loading,
}: {
  url: string;
  transformedHtml: WebsiteData | string | null;
  loading: boolean;
}) => {
  // Create a default layout structure
  const defaultLayout = {
    title: "Transformed Website",
    meta: {},
    style: {},
    layout: {
      header: {
        title: "Transformed Website",
        mainNav: [],
      },
      main: {
        headings: { h1: [], h2: [], h3: [] },
        content: {
          articles: [],
          images: [],
          videos: [],
          tables: [],
        },
      },
      sidebar: {
        navigation: [],
        categories: [],
        widgets: [],
      },
      footer: {
        links: [],
        copyright: "",
        hasNewsletter: false,
        socialLinks: [],
      },
    },
  };

  // Parse and merge with default layout
  let parsedData;
  try {
    parsedData =
      typeof transformedHtml === "string"
        ? { ...defaultLayout, ...JSON.parse(transformedHtml) }
        : { ...defaultLayout, ...transformedHtml };
  } catch (error) {
    console.error("Error parsing data:", error);
    parsedData = defaultLayout;
  }

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

  if (loading) {
    return (
      <RetroWindow title="Processing..." className="mt-4">
        <div className="flex min-h-[400px] items-center justify-center bg-[#008080]">
          <LoadingAnimation />
        </div>
      </RetroWindow>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Original Website Preview */}
      <RetroWindow title={`Original Website - ${url}`} className="bg-[#c0c0c0]">
        <div className="h-[600px] overflow-hidden bg-white">
          {/* Browser Chrome */}
          <div className="sticky top-0 z-10 bg-[#c0c0c0]">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <button className="h-6 w-6 rounded-full bg-[#ff0000]" title="Close" />
                <button className="h-6 w-6 rounded-full bg-[#ffff00]" title="Minimize" />
                <button className="h-6 w-6 rounded-full bg-[#00ff00]" title="Maximize" />
              </div>
              <div className="flex items-center space-x-2">
                <button className="rounded border border-gray-600 bg-[#c0c0c0] px-2 py-1" title="Copy URL">
                  📋
                </button>
                <button className="rounded border border-gray-600 bg-[#c0c0c0] px-2 py-1" title="Refresh">
                  🔄
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 border-t-2 border-[#ffffff] bg-[#c0c0c0] p-2">
              <span>📍</span>
              <input type="text" value={url} readOnly className="w-full bg-[#f0f0f0] p-1 font-mono text-sm" />
              <button className="rounded border border-gray-600 bg-[#c0c0c0] px-4 py-1">Go</button>
            </div>
          </div>

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

      {/* 90s Transformed Version */}
      <RetroWindow title="90s Transformed Version" className="bg-[#000080]">
        <div className="min-h-[600px] bg-[#c0c0c0] p-4">
          <RetroLayout
            data={{
              title: parsedData?.title || "Transformed Website",
              meta: parsedData?.meta || {},
              style: parsedData?.style || {},
              layout: {
                header: {
                  title: parsedData?.layout?.header?.title || "Transformed Website",
                  logo: parsedData?.layout?.header?.logo,
                  mainNav: parsedData?.layout?.header?.mainNav || [],
                  banner: parsedData?.layout?.header?.banner,
                },
                main: {
                  headings: parsedData?.layout?.main?.headings || { h1: [], h2: [], h3: [] },
                  content: {
                    articles: parsedData?.layout?.main?.content?.articles || [],
                    images: parsedData?.layout?.main?.content?.images || [],
                    videos: parsedData?.layout?.main?.content?.videos || [],
                    tables: parsedData?.layout?.main?.content?.tables || [],
                  },
                },
                sidebar: {
                  navigation: parsedData?.layout?.sidebar?.navigation || [],
                  categories: parsedData?.layout?.sidebar?.categories || [],
                  widgets: parsedData?.layout?.sidebar?.widgets || [],
                },
                footer: {
                  links: parsedData?.layout?.footer?.links || [],
                  copyright: parsedData?.layout?.footer?.copyright || "",
                  hasNewsletter: parsedData?.layout?.footer?.hasNewsletter || false,
                  socialLinks: parsedData?.layout?.footer?.socialLinks || [],
                },
              },
            }}
          />
        </div>
      </RetroWindow>

      {/* Stats and Info */}
      <RetroWindow title="Website Analysis" className="bg-[#008080]">
        <div className="space-y-4 bg-[#c0c0c0] p-4 text-gray-900">
          <table className="w-full border-2 border-[#808080] bg-gray-200">
            <tbody>
              <tr className="border-b border-[#808080]">
                <td className="border-r border-[#808080] p-2 font-bold">Elements Found:</td>
                <td className="p-2">
                  {parsedData?.layout?.main?.content?.articles?.length +
                    (parsedData?.layout?.main?.content?.images?.length || 0) +
                    (parsedData?.layout?.main?.content?.tables?.length || 0) || 0}
                </td>
              </tr>
              <tr className="border-b border-[#808080]">
                <td className="border-r border-[#808080] p-2 font-bold">Layout Style:</td>
                <td className="p-2">
                  {parsedData?.style?.layout?.hasTables
                    ? "Table-based"
                    : parsedData?.style?.layout?.hasFrames
                      ? "Frames"
                      : "Classic"}
                </td>
              </tr>
              <tr className="border-b border-[#808080]">
                <td className="border-r border-[#808080] p-2 font-bold">Images Found:</td>
                <td className="p-2">{parsedData?.layout?.main?.content?.images?.length || 0}</td>
              </tr>
              <tr>
                <td className="border-r border-[#808080] p-2 font-bold">Tables Used:</td>
                <td className="p-2">{parsedData?.layout?.main?.content?.tables?.length || 0}</td>
              </tr>
            </tbody>
          </table>

          <div className="rounded border-2 border-[#808080] bg-black p-2 font-mono text-green-400">
            <div>Status: Transform Complete ✓</div>
            <div>
              Style: {parsedData?.style?.hasGradients ? "Modern" : "Classic"} |{" "}
              {parsedData?.style?.layout?.isResponsive ? "Responsive" : "Fixed Width"}
            </div>
            <div>
              Compatibility: {parsedData?.style?.layout?.hasFrames ? "Netscape 2.0+" : "All Browsers"}{" "}
              {parsedData?.style?.hasBorders ? "| Borders" : ""}
            </div>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

export default WebsitePreview;
