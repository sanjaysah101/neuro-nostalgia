import Image from "next/image";

import { LayoutTheme } from "@/types/layout";

import { getMainStyles } from "./themeStyles";
import { Article, Image as ImageType, Table, Video } from "./types";

interface MainProps {
  headings?: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  content?: {
    articles?: Article[];
    images?: ImageType[];
    videos?: Video[];
    tables?: Table[];
  };
  theme?: LayoutTheme;
}

const validateTheme = (theme: string): LayoutTheme => {
  const validThemes: LayoutTheme[] = ["default", "cyber", "vaporwave", "grunge", "classic", "frames", "tables"];
  return validThemes.includes(theme as LayoutTheme) ? (theme as LayoutTheme) : "default";
};

const getImageDimension = (dimension: string | undefined, defaultValue: string) => {
  if (!dimension) return parseInt(defaultValue, 10);
  const parsed = parseInt(dimension, 10);
  return isNaN(parsed) ? parseInt(defaultValue, 10) : parsed;
};

export default function Main90s({ headings = { h1: [], h2: [], h3: [] }, content = {}, theme = "default" }: MainProps) {
  const validTheme = validateTheme(theme);
  const styles = getMainStyles(validTheme);
  const { images = [] } = content;

  return (
    <main className={styles.main}>
      {/* Logo/Header Image Section */}
      {images && images.length > 0 && images[0].src && (
        <div className={`${styles.image} mb-6 text-center`}>
          <Image
            src={images[0].src}
            alt={images[0].alt || "Site Logo"}
            className="mx-auto"
            width={getImageDimension(images[0].dimensions?.width, "500")}
            height={getImageDimension(images[0].dimensions?.height, "200")}
          />
        </div>
      )}

      {/* Headings Section */}
      {headings.h1.map((h1, index) => (
        <div key={index} className="mb-6">
          <h1 className={`${styles.heading} animate-blink text-xl`}>{h1}</h1>
          {index === 0 && (
            <div className={`${styles.article} mt-2`}>
              <div className="text-center">
                🚀 Welcome to our retro-styled website! 🚀
                <br />
                <div className="my-2 overflow-hidden whitespace-nowrap">
                  <div className="animate-marquee">
                    {h1} | Best viewed in Netscape Navigator 4.0 | Resolution: 800x600
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Additional Images */}
      {images.slice(1).map((image, index) => (
        <div key={index} className={`${styles.image} text-center`}>
          <Image
            src={image.src}
            alt={image.alt || `Image ${index + 2}`}
            className="mx-auto"
            width={getImageDimension(image.dimensions?.width, "500")}
            height={getImageDimension(image.dimensions?.height, "300")}
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
          <Image
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
