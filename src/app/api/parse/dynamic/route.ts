import { NextResponse } from "next/server";

import * as cheerio from "cheerio";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Add base tag to help with relative URLs
    $("head").prepend(`<base href="${url}">`);

    // Fix relative URLs for images and other resources
    $("img").each((i, elem) => {
      const src = $(elem).attr("src");
      if (src && !src.startsWith("http")) {
        // Handle different relative path scenarios
        if (src.startsWith("//")) {
          $(elem).attr("src", `https:${src}`);
        } else if (src.startsWith("/")) {
          const urlObj = new URL(url);
          $(elem).attr("src", `${urlObj.origin}${src}`);
        } else {
          const baseUrl = url.endsWith("/") ? url : `${url}/`;
          $(elem).attr("src", new URL(src, baseUrl).href);
        }
      }
    });

    // Add retro CSS styles
    $("head").append(`
      <style>
        /* Web-safe retro fonts */
        @font-face {
          font-family: 'MS Sans Serif';
          src: url('https://unpkg.com/@fontsource/ms-sans-serif/files/ms-sans-serif-400.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Perfect DOS VGA';
          src: url('https://unpkg.com/@fontsource/perfect-dos-vga/files/perfect-dos-vga-400.woff2') format('woff2');
        }
        /* Base retro styles */
        body {
          background-color: #c0c0c0 !important;
          font-family: 'Perfect DOS VGA', 'MS Sans Serif', 'Courier New', monospace !important;
          color: #000000 !important;
          font-size: 16px !important;
          line-height: 1.4 !important;
          text-rendering: pixelated !important;
          -webkit-font-smoothing: none !important;
          -moz-osx-font-smoothing: none !important;
          letter-spacing: 0.5px !important;
        }
        /* Paragraph text */
        p {
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          margin: 0.8em 0 !important;
          letter-spacing: 0.5px !important;
        }
        /* Links */
        a {
          color: #000080 !important;
          text-decoration: underline !important;
          font-family: 'Perfect DOS VGA', 'MS Sans Serif', monospace !important;
        }
        a:visited {
          color: #800080 !important;
        }
        /* Buttons */
        button, 
        input[type="button"],
        input[type="submit"] {
          border: 2px solid;
          border-color: #ffffff #808080 #808080 #ffffff !important;
          background: #c0c0c0 !important;
          padding: 2px 6px !important;
          color: #000000 !important;
          font-family: 'MS Sans Serif', 'Perfect DOS VGA', sans-serif !important;
          font-size: 14px !important;
          font-weight: normal !important;
          text-transform: none !important;
        }
        /* Inputs */
        input[type="text"],
        input[type="password"],
        input[type="email"],
        textarea {
          border: 2px solid;
          border-color: #808080 #ffffff #ffffff #808080 !important;
          background: #ffffff !important;
          padding: 2px 4px !important;
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          font-size: 14px !important;
        }
        /* Windows 95 style boxes */
        div, section, article, aside, nav {
          border: 2px solid;
          border-color: #ffffff #808080 #808080 #ffffff !important;
          background: #c0c0c0 !important;
          padding: 2px !important;
          margin: 4px !important;
        }
        /* Headers */
        h1, h2, h3, h4, h5, h6 {
          color: #000080 !important;
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
        }
        h1 { font-size: 28px !important; }
        h2 { font-size: 24px !important; }
        h3 { font-size: 20px !important; }
        h4, h5, h6 { font-size: 16px !important; }
        /* Tables */
        table {
          border: 2px solid #808080 !important;
          background: #ffffff !important;
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          font-size: 14px !important;
        }
        td, th {
          border: 1px solid #808080 !important;
          padding: 4px !important;
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
        }
        /* Code blocks */
        pre, code {
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          background-color: #000000 !important;
          color: #00ff00 !important;
          padding: 8px !important;
          border: 1px solid #808080 !important;
          font-size: 14px !important;
        }
        /* Lists */
        ul, ol {
          font-family: 'Perfect DOS VGA', 'Courier New', monospace !important;
          margin-left: 20px !important;
        }
        li {
          margin: 4px 0 !important;
        }
        /* Images */
        img {
          image-rendering: pixelated !important;
          border: 2px solid;
          border-color: #ffffff #808080 #808080 #ffffff !important;
          padding: 2px !important;
          max-width: 100% !important;
          height: auto !important;
        }
        /* Navigation */
        nav {
          background: #000080 !important;
          color: #ffffff !important;
          padding: 4px !important;
          font-family: 'MS Sans Serif', 'Perfect DOS VGA', sans-serif !important;
          font-size: 14px !important;
        }
        nav a {
          color: #ffffff !important;
          text-decoration: none !important;
        }
        nav a:hover {
          text-decoration: underline !important;
        }
        /* Blockquotes */
        blockquote {
          border-left: 4px solid #808080 !important;
          margin: 8px 0 !important;
          padding-left: 12px !important;
          font-family: 'Perfect DOS VGA', 'MS Sans Serif', serif !important;
          font-style: italic !important;
          font-size: 14px !important;
        }
      </style>
    `);

    // Remove modern CSS frameworks and scripts that might interfere
    $('link[rel="stylesheet"]').remove();
    $("script").remove();

    // Add retro meta tags
    $("head").append(`
      <meta name="viewport" content="width=1024">
      <meta http-equiv="X-UA-Compatible" content="IE=5">
    `);

    return NextResponse.json({ html: $.html() });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json({ error: "Failed to transform website" }, { status: 500 });
  }
}
