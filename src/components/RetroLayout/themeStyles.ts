import { LayoutTheme } from "@/types/layout";

export const themeStyles = {
  default: {
    bg: "bg-[#c0c0c0]",
    header: {
      header: "bg-win95-navy text-win95-yellow text-center p-4 border-2 border-win95-border",
      logo: "border-2 border-white p-1 bg-win95-gray",
      nav: "bg-win95-gray p-2 border-2 border-win95-border-darker mt-2",
      link: "text-win95-navy font-bold mx-4 hover:text-red-600 hover:underline",
    },
    main: {
      main: "flex-1 bg-white border-2 border-[#808080] min-h-[500px] shadow-win95-inset",
      article: "mb-6 border-2 border-[#808080] p-4 bg-[#c0c0c0] shadow-win95",
      heading: "bg-[#000080] text-white font-bold mb-2 p-1 shadow-win95",
      image: "border-2 border-[#808080] p-1 my-2 shadow-win95 bg-[#c0c0c0]",
    },
    sidebar: {
      sidebar: "w-64 bg-[#c0c0c0] p-4 border-2 border-[#808080] shadow-win95",
      widget: "mb-4 bg-white border-2 border-[#808080] shadow-win95",
      title: "bg-[#000080] text-white p-1 mb-2 text-center font-bold shadow-win95",
      content: "p-2 text-sm text-black",
      link: "text-[#000080] hover:text-[#0000ff] hover:underline",
    },
    footer: {
      footer: "bg-win95-gray mt-4 p-4 border-t-2 border-win95-border-dark text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-win95-navy hover:text-red-600 hover:underline",
      copyright: "text-sm text-gray-600",
    },
  },
  cyber: {
    bg: "bg-black",
    header: {
      header: "bg-black text-green-400 text-center p-4 border border-green-500",
      logo: "border border-green-500 p-1 bg-black",
      nav: "bg-black p-2 border border-green-500 mt-2",
      link: "text-green-400 font-mono mx-4 hover:text-green-300 hover:underline",
    },
    main: {
      main: "flex-1 bg-black p-4 border border-green-500 min-h-[500px]",
      article: "mb-6 border border-green-500 p-4 text-green-400",
      heading: "text-green-400 font-mono mb-2 border border-green-500 p-1",
      image: "border border-green-500 p-1 my-2",
    },
    sidebar: {
      sidebar: "w-64 bg-black p-4 border border-green-500",
      widget: "mb-4 bg-black border border-green-400",
      title: "bg-green-900 text-green-400 p-1 mb-2 text-center font-mono",
      content: "p-2 text-sm text-green-400 font-mono",
      link: "text-green-400 hover:text-green-300 hover:underline",
    },
    footer: {
      footer: "bg-black mt-4 p-4 border-t border-green-500 text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-green-400 hover:text-green-200 hover:underline font-mono",
      copyright: "text-sm text-green-600",
    },
  },
  vaporwave: {
    bg: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
    header: {
      header: "bg-black/50 text-white text-center p-4 border border-white backdrop-blur",
      logo: "border border-white p-1 bg-gradient-to-r from-pink-400 to-blue-400",
      nav: "bg-black/50 p-2 border border-white mt-2 backdrop-blur",
      link: "text-white font-bold mx-4 hover:text-pink-300 hover:underline",
    },
    main: {
      main: "flex-1 bg-black/50 p-4 border border-white min-h-[500px] backdrop-blur",
      article: "mb-6 border border-white p-4 text-white bg-black/50",
      heading: "text-white font-bold mb-2 border border-white p-1 bg-black/50",
      image: "border border-white p-1 my-2 bg-black/50",
    },
    sidebar: {
      sidebar: "w-64 bg-black/50 p-4 border border-white backdrop-blur",
      widget: "mb-4 bg-black/50 border border-white",
      title: "bg-white text-black p-1 mb-2 text-center font-bold",
      content: "p-2 text-sm text-white",
      link: "text-white hover:text-pink-300 hover:underline",
    },
    footer: {
      footer: "bg-black/50 mt-4 p-4 border-t border-white text-center backdrop-blur",
      links: "mb-4 flex justify-center gap-4",
      link: "text-white hover:text-pink-300 hover:underline",
      copyright: "text-sm text-white/60",
    },
  },
  grunge: {
    bg: "bg-stone-900",
    header: {
      header: "bg-stone-800 text-amber-100 text-center p-4 border border-amber-100",
      logo: "border border-amber-100 p-1 bg-stone-800",
      nav: "bg-stone-800 p-2 border border-amber-100 mt-2",
      link: "text-amber-100 font-mono mx-4 hover:text-amber-200 hover:underline",
    },
    main: {
      main: "flex-1 bg-stone-800 p-4 border border-amber-100 min-h-[500px]",
      article: "mb-6 border border-amber-100 p-4 text-amber-100",
      heading: "text-amber-100 font-mono mb-2 border border-amber-100 p-1",
      image: "border border-amber-100 p-1 my-2",
    },
    sidebar: {
      sidebar: "w-64 bg-stone-800 p-4 border border-amber-100",
      widget: "mb-4 bg-stone-800 border border-amber-100",
      title: "bg-amber-100 text-stone-800 p-1 mb-2 text-center font-mono",
      content: "p-2 text-sm text-amber-100",
      link: "text-amber-100 hover:text-amber-200 hover:underline",
    },
    footer: {
      footer: "bg-stone-800 mt-4 p-4 border-t border-amber-100 text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-amber-100 hover:text-amber-200 hover:underline",
      copyright: "text-sm text-amber-100/60",
    },
  },
  classic: {
    bg: "bg-gray-100",
    header: {
      header: "bg-gray-800 text-white text-center p-4 border-2 border-gray-400",
      logo: "border-2 border-gray-400 p-1 bg-white",
      nav: "bg-gray-100 p-2 border-2 border-gray-400 mt-2",
      link: "text-gray-800 font-serif mx-4 hover:text-blue-600 hover:underline",
    },
    main: {
      main: "flex-1 bg-white p-4 border-2 border-gray-400 min-h-[500px]",
      article: "mb-6 border-2 border-gray-400 p-4 bg-gray-50",
      heading: "bg-gray-800 text-white font-serif mb-2 p-1",
      image: "border-2 border-gray-400 p-1 my-2 bg-white",
    },
    sidebar: {
      sidebar: "w-64 bg-gray-100 p-4 border-2 border-gray-400",
      widget: "mb-4 bg-white border-2 border-gray-400",
      title: "bg-gray-800 text-white p-1 mb-2 text-center font-serif",
      content: "p-2 text-sm text-gray-800",
      link: "text-blue-600 hover:text-blue-800 hover:underline",
    },
    footer: {
      footer: "bg-gray-100 mt-4 p-4 border-t-2 border-gray-400 text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-blue-600 hover:text-blue-800 hover:underline font-serif",
      copyright: "text-sm text-gray-600",
    },
  },
  frames: {
    bg: "bg-white",
    header: {
      header: "bg-white text-gray-800 text-center p-4 border-4 border-double border-gray-700",
      logo: "border-2 border-gray-700 p-1 bg-white",
      nav: "bg-white p-2 border-2 border-gray-700 mt-2",
      link: "text-gray-800 font-serif mx-4 hover:text-blue-800 hover:underline",
    },
    main: {
      main: "flex-1 bg-white p-4 border-4 border-double border-gray-700 min-h-[500px]",
      article: "mb-6 border-2 border-gray-700 p-4",
      heading: "border-b-2 border-gray-700 text-gray-800 font-serif mb-2 p-1",
      image: "border-2 border-gray-700 p-1 my-2",
    },
    sidebar: {
      sidebar: "w-64 bg-white p-4 border-4 border-double border-gray-700",
      widget: "mb-4 bg-white border-2 border-gray-700",
      title: "border-b-2 border-gray-700 text-gray-800 p-1 mb-2 text-center font-serif",
      content: "p-2 text-sm text-gray-800",
      link: "text-blue-800 hover:text-blue-900 hover:underline",
    },
    footer: {
      footer: "bg-white mt-4 p-4 border-4 border-double border-gray-700 text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-blue-800 hover:text-blue-900 hover:underline font-serif",
      copyright: "text-sm text-gray-700",
    },
  },
  tables: {
    bg: "bg-white",
    header: {
      header: "bg-gray-200 text-gray-800 text-center p-4 border border-gray-600",
      logo: "border border-gray-600 p-1 bg-white",
      nav: "bg-white p-2 border border-gray-600 mt-2",
      link: "text-gray-800 font-serif mx-4 hover:text-blue-700 hover:underline",
    },
    main: {
      main: "flex-1 bg-white p-4 min-h-[500px]",
      article: "mb-6 border border-collapse border-gray-600 p-4",
      heading: "bg-gray-200 text-gray-800 font-serif mb-2 p-1 border border-gray-600",
      image: "border border-gray-600 p-1 my-2",
    },
    sidebar: {
      sidebar: "w-64 bg-white p-4 border border-gray-600",
      widget: "mb-4 bg-white border border-gray-600",
      title: "bg-gray-200 text-gray-800 p-1 mb-2 text-center font-serif border border-gray-600",
      content: "p-2 text-sm text-gray-800",
      link: "text-blue-700 hover:text-blue-900 hover:underline",
    },
    footer: {
      footer: "bg-gray-200 mt-4 p-4 border border-gray-600 text-center",
      links: "mb-4 flex justify-center gap-4",
      link: "text-blue-700 hover:text-blue-900 hover:underline font-serif",
      copyright: "text-sm text-gray-600",
    },
  },
} as const;

export type ThemeStyles = typeof themeStyles;

export const getHeaderStyles = (theme: LayoutTheme) => themeStyles[theme].header;
export const getMainStyles = (theme: LayoutTheme) => themeStyles[theme].main;
export const getSidebarStyles = (theme: LayoutTheme) => themeStyles[theme].sidebar;
export const getFooterStyles = (theme: LayoutTheme) => themeStyles[theme].footer;
