export const THEMES = {
  default: {
    background: "bg-win95-bg",
    text: "text-black",
    // ... other theme properties
  },
  cyber: {
    background: "bg-black",
    text: "text-green-400",
    // ... other theme properties
  },
  // ... other themes
} as const;

export const API_ENDPOINTS = {
  transform: "/api/transform",
  parse: "/api/parse",
} as const;
