export interface Layout90sProps {
  data: {
    title: string;
    meta: {
      description: string;
      keywords: string;
      author: string;
      generator: string;
      viewport: string;
      charset: string;
    };
    layout: {
      header: {
        title: string;
        logo: string;
        mainNav: Array<{
          text: string;
          href: string;
          isActive: boolean;
          hasIcon: boolean;
        }>;
        banner: string;
      };
      // ... rest of the types matching your parsed data structure
    };
  };
}

export interface MainContent {
  articles: Article[];
  images: Image[];
  videos: Video[];
  tables: Table[];
}

export interface Image {
  src: string;
  alt: string;
  dimensions?: {
    width: string;
    height: string;
  };
  isDecorative?: boolean;
  inArticle?: boolean;
  isThumbnail?: boolean;
}

export interface Article {
  text: string;
  date?: string;
  author?: string;
  category?: string;
  hasComments?: boolean;
  readingTime?: string;
}

export interface Video {
  src: string;
  poster?: string;
}

export interface Table {
  headers: string[];
  rows: string[][];
  hasBorder: boolean;
}

// Add other necessary interfaces...
