# Retro Website Transformer

A Next.js application that transforms modern websites into 90s-style layouts with various retro
themes.

## Features

- 🎨 Multiple retro themes:

  - Default (Windows 95)
  - Cyber

- 📐 Layout options:

  - Classic
  - Frames
  - Tables

- 🎯 Retro elements:
  - Hit counter
  - Under construction GIF
  - HTML/CSS validation badges
  - Netscape Now! button
  - Marquee text
  - Blinking text

## Technical Overview

### Core Components

- `RetroLayout`: Main component handling layout switching and theme management
- `Main90s`: Content display with retro styling
- `Header90s`: Navigation and banner area
- `Sidebar90s`: Widget and secondary navigation
- `Footer90s`: Links and copyright information

### Data Structure

The application uses TypeScript interfaces to ensure type safety:

```typescript
interface WebsiteData {
  title: string;
  meta: MetaData;
  layout: {
    header: HeaderData;
    sidebar: SidebarData;
    main: MainData;
    footer: FooterData;
  };
  style: StyleData;
}
```

### API

The `/api/parse` endpoint transforms modern websites into the retro format:

- Extracts content using Cheerio
- Organizes data into structured format
- Preserves essential elements like navigation, images, and text content

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
