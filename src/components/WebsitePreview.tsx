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

  const renderMetadata = (metadata: WebsiteData["meta"]) => (
    <div className="mb-4 space-y-2 border-2 border-[#808080] bg-[#c0c0c0] p-4">
      <h3 className="font-bold">Page Metadata</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(metadata).map(
          ([key, value]) =>
            value && (
              <div key={key} className="col-span-2">
                <span className="font-bold">{key}:</span> <span className="font-mono">{value}</span>
              </div>
            )
        )}
      </div>
    </div>
  );

  // Add content analysis section
  const renderContentAnalysis = (data: WebsiteData) => (
    <div className="mt-4 space-y-2 border-2 border-[#808080] bg-[#c0c0c0] p-4">
      <h3 className="font-bold">Content Analysis</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="font-bold">Main Content Blocks:</span>{" "}
          {data.layout.main.content.articles.filter((a) => a.isMainContent ?? false).length}
        </div>
        <div>
          <span className="font-bold">Images:</span> {data.layout.main.content.images.length}
        </div>
        <div>
          <span className="font-bold">Navigation Items:</span> {data.layout.header.mainNav.length}
        </div>
        <div>
          <span className="font-bold">Layout Style:</span>{" "}
          {data.style.layout.hasTables ? "Table-based" : data.style.layout.hasFrames ? "Frames" : "Modern"}
        </div>
      </div>
    </div>
  );

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
      {/* 90s Transformed Version */}
      <RetroWindow title="90s Transformed Version" className="bg-[#000080]" url={url}>
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

      {/* Enhanced Analysis Section */}
      {!loading && transformedHtml && (
        <RetroWindow title="Website Analysis" className="bg-[#008080]">
          <div className="space-y-4 bg-[#c0c0c0] p-4 text-gray-900">
            {typeof transformedHtml !== "string" && transformedHtml && (
              <>
                {renderMetadata(transformedHtml.meta)}
                {renderContentAnalysis(transformedHtml)}

                {/* Technical Details */}
                <div className="rounded border-2 border-[#808080] bg-black p-2 font-mono text-green-400">
                  <div>Status: Transform Complete ✓</div>
                  <div>
                    Style: {transformedHtml.style.hasGradients ? "Modern" : "Classic"} |{" "}
                    {transformedHtml.style.layout.isResponsive ? "Responsive" : "Fixed Width"}
                  </div>
                  <div>
                    Compatibility: {transformedHtml.style.layout.hasFrames ? "Netscape 2.0+" : "All Browsers"}{" "}
                    {transformedHtml.style.hasBorders ? "| Borders" : ""}
                  </div>
                  <div>
                    Language: {transformedHtml.meta.language} | Last Modified:{" "}
                    {transformedHtml.meta.lastModified || "N/A"}
                  </div>
                </div>
              </>
            )}
          </div>
        </RetroWindow>
      )}
    </div>
  );
};

export default WebsitePreview;
