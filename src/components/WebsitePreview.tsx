import { LoadingAnimation } from "./LoadingAnimation";
import RetroLayout from "./RetroLayout";
import { RetroWindow } from "./RetroWindow";

const WebsitePreview = ({
  url,
  transformedHtml,
  loading,
}: {
  url: string;
  transformedHtml: string | any;
  loading: boolean;
}) => {
  // Create a default layout structure
  const defaultLayout = {
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

  console.log("Parsed Data:", parsedData); // Debug log

  return (
    <RetroWindow title="Website Preview" className="mt-4">
      <div className="bg-[#c0c0c0] p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Original Website */}
          <div className="win95-window">
            <div className="bg-win95-navy p-1">
              <span className="text-sm text-win95-yellow">Original Website</span>
            </div>
            <div className="h-[600px] bg-white">
              <iframe
                src={url}
                className="h-full w-full border-0"
                sandbox="allow-same-origin allow-scripts"
                title="Original Website"
              />
            </div>
          </div>

          {/* Transformed Version */}
          <div className="win95-window">
            <div className="bg-win95-navy p-1">
              <span className="text-sm text-win95-yellow">90s Transformed Version</span>
            </div>
            <div className="h-[600px] overflow-auto bg-white">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <LoadingAnimation />
                </div>
              ) : (
                <RetroLayout
                  data={{
                    layout: {
                      header: {
                        title: parsedData?.layout?.header?.title || "Transformed Website",
                        logo: parsedData?.layout?.header?.logo,
                        mainNav: parsedData?.layout?.header?.mainNav || [],
                        banner: parsedData?.layout?.banner,
                      },
                      main: {
                        headings: { h1: [], h2: [], h3: [] },
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
              )}
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};

export default WebsitePreview;
