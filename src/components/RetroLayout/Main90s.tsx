import { LayoutTheme } from "@/types/layout";

interface MainProps {
  headings?: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  content?: {
    articles?: Array<{
      text: string;
      date?: string;
      author?: string;
      category?: string;
      hasComments?: boolean;
      readingTime?: string;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      dimensions?: {
        width: string;
        height: string;
      };
      isDecorative?: boolean;
      inArticle?: boolean;
      isThumbnail?: boolean;
    }>;
    videos?: string[];
    tables?: any[];
  };
  theme?: LayoutTheme;
}

const themeStyles: { [key in LayoutTheme]: { main: string; article: string; heading: string; image: string } } = {
  default: {
    main: "flex-1 bg-white p-4 border-2 border-[#808080] min-h-[500px] shadow-win95-inset",
    article: "mb-6 border-2 border-[#808080] p-4 bg-[#c0c0c0] shadow-win95",
    heading: "bg-[#000080] text-white font-bold mb-2 p-1 shadow-win95",
    image: "border-2 border-[#808080] p-1 my-2 shadow-win95 bg-[#c0c0c0]",
  },
  cyber: {
    main: "flex-1 bg-black p-4 border border-green-500 min-h-[500px]",
    article: "mb-6 border border-green-500 p-4",
    heading: "text-green-400 font-mono mb-2 border border-green-500 p-1",
    image: "border border-green-500 p-1 my-2",
  },
  vaporwave: {
    main: "flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 border border-white min-h-[500px]",
    article: "mb-6 border border-white p-4 bg-black/50",
    heading: "text-white font-mono mb-2 border border-white p-1 bg-black/50",
    image: "border border-white p-1 my-2 bg-black/50",
  },
  grunge: {
    main: "flex-1 bg-stone-800 p-4 border border-amber-100 min-h-[500px]",
    article: "mb-6 border border-amber-100 p-4",
    heading: "text-amber-100 font-mono mb-2 border border-amber-100 p-1",
    image: "border border-amber-100 p-1 my-2",
  },
};

export default function Main90s({ headings = { h1: [], h2: [], h3: [] }, content = {}, theme = "default" }: MainProps) {
  const styles = themeStyles[theme];
  const { articles = [], images = [], videos = [], tables = [] } = content;

  return (
    <main className={styles.main}>
      {/* Logo/Header Image Section */}
      {images.length > 0 && images[0].src && (
        <div className={`${styles.image} mb-6 text-center`}>
          <img
            src={images[0].src}
            alt={images[0].alt || "Site Logo"}
            className="mx-auto"
            width={images[0].dimensions?.width || "500"}
            height={images[0].dimensions?.height || "200"}
          />
        </div>
      )}

      {/* Headings Section */}
      {headings.h1.map((h1, index) => (
        <div key={index} className="mb-6">
          <h1 className={`${styles.heading} text-xl`}>
            <blink>{h1}</blink>
          </h1>
          {index === 0 && (
            <div className={`${styles.article} mt-2`}>
              <p className="text-center">
                🚀 Welcome to our retro-styled website! 🚀
                <br />
                <marquee className="my-2">{h1} | Best viewed in Netscape Navigator 4.0 | Resolution: 800x600</marquee>
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Additional Images */}
      {images.slice(1).map((image, index) => (
        <div key={index} className={`${styles.image} text-center`}>
          <img
            src={image.src}
            alt={image.alt || `Image ${index + 2}`}
            className="mx-auto"
            width={image.dimensions?.width || "auto"}
            height={image.dimensions?.height || "auto"}
          />
          {image.alt && <div className="mt-1 text-sm text-gray-600">{image.alt}</div>}
        </div>
      ))}

      {/* No Content Message */}
      {headings.h1.length === 0 && images.length === 0 && (
        <div className={`${styles.article} p-8 text-center`}>
          <div className="mb-4 text-6xl">🚧</div>
          <div className="text-xl">Under Construction</div>
          <div className="mt-2 text-sm">Please check back later!</div>
          <img
            src="/images/under-construction.gif"
            alt="Under Construction"
            className="mx-auto mt-4"
            width="88"
            height="31"
          />
        </div>
      )}
    </main>
  );
}
