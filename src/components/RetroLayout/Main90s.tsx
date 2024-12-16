import { LayoutTheme } from "@/types/layout";

interface MainProps {
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  articles: Array<{
    text: string;
    date?: string;
    author?: string;
    category?: string;
    hasComments?: boolean;
    readingTime?: string;
  }>;
  images: Array<{
    src: string;
    alt: string;
  }>;
  videos: string[];
  tables: any[];
  theme?: LayoutTheme;
}

const themeStyles: { [key in LayoutTheme]: { main: string; article: string; heading: string; image: string } } = {
  default: {
    main: "flex-1 bg-white p-4 border-2 border-win95-border-dark min-h-[500px]",
    article: "mb-6 border-b border-win95-border-dark pb-4",
    heading: "text-win95-navy font-bold mb-2",
    image: "border-2 border-win95-border-dark p-1 my-2",
  },
  cyber: {
    main: "flex-1 bg-black p-4 border border-green-500 min-h-[500px]",
    article: "mb-6 border-b border-green-500 pb-4",
    heading: "text-green-400 font-mono mb-2",
    image: "border border-green-500 p-1 my-2",
  },
  vaporwave: {
    main: "flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 border border-white min-h-[500px]",
    article: "mb-6 border-b border-white pb-4",
    heading: "text-white font-mono mb-2",
    image: "border border-white p-1 my-2",
  },
  grunge: {
    main: "flex-1 bg-stone-800 p-4 border border-amber-100 min-h-[500px]",
    article: "mb-6 border-b border-amber-100 pb-4",
    heading: "text-amber-100 font-mono mb-2",
    image: "border border-amber-100 p-1 my-2",
  },
  // Add more themes as needed
};

export default function Main90s({ headings, articles, images, videos, tables, theme = "default" }: MainProps) {
  const styles = themeStyles[theme];

  return (
    <main className={styles.main}>
      {headings.h1.map((h1, index) => (
        <h1 key={index} className={`${styles.heading} text-2xl`}>
          {h1}
        </h1>
      ))}

      {articles.map((article, index) => (
        <article key={index} className={styles.article}>
          <div className="mb-2 text-sm text-gray-600">
            {article.date && <span className="mr-4">{article.date}</span>}
            {article.author && <span className="mr-4">By {article.author}</span>}
            {article.category && <span className="mr-4">In {article.category}</span>}
          </div>
          <div className="mb-4">{article.text}</div>
        </article>
      ))}

      {images.length > 0 && (
        <div className="my-4 grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className={styles.image} />
          ))}
        </div>
      )}
    </main>
  );
}
