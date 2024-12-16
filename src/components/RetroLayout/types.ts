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
