import type { Cheerio } from "cheerio";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";

export interface ParsedWebsite {
  meta: {
    title: string;
    description?: string;
    favicon?: string;
  };
  navigation: {
    items: Array<{ text: string; url: string }>;
    location: "header" | "sidebar" | "footer";
  };
  header: {
    logo?: string;
    title: string;
    subtitle?: string;
  };
  content: {
    main: Array<{
      type: "article" | "section" | "text" | "image" | "gallery";
      title?: string;
      content: string;
      images?: string[];
    }>;
    sidebar?: Array<{
      type: "widget" | "menu" | "text";
      title?: string;
      content: string;
    }>;
  };
  footer: {
    sections: Array<{
      title?: string;
      content: string;
    }>;
    copyright?: string;
  };
}

export class WebsiteParser {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  parse(): ParsedWebsite {
    return {
      meta: this.extractMeta(),
      navigation: this.extractNavigation(),
      header: this.extractHeader(),
      content: this.extractContent(),
      footer: this.extractFooter(),
    };
  }

  private extractMeta() {
    return {
      title: this.$("title").text() || "Untitled Page",
      description: this.$('meta[name="description"]').attr("content"),
      favicon: this.$('link[rel="icon"]').attr("href"),
    };
  }

  private extractNavigation() {
    const navSelectors = ["nav", ".nav", ".navigation", "#nav", "ul.menu"];
    let $nav = this.$("");

    for (const selector of navSelectors) {
      const $found = this.$(selector);
      if ($found.length) {
        $nav = $found;
        break;
      }
    }

    const items: ParsedWebsite["navigation"]["items"] = [];
    if ($nav?.length) {
      $nav.find("a").each((_, el) => {
        items.push({
          text: this.$(el).text().trim(),
          url: this.$(el).attr("href") || "#",
        });
      });
    }

    return {
      items,
      location: this.determineNavLocation($nav as Cheerio<Element>),
    };
  }

  private determineNavLocation($nav: Cheerio<Element>): "header" | "sidebar" | "footer" {
    if (!$nav?.length) return "header";

    // Check if nav is within header
    const $header = this.$("header, .header, #header");
    if ($header.find($nav).length) return "header";

    // Check if nav is within footer
    const $footer = this.$("footer, .footer, #footer");
    if ($footer.find($nav).length) return "footer";

    // Check common sidebar classes/IDs
    if ($nav.closest(".sidebar, #sidebar, aside").length || $nav.parent().is(".sidebar, #sidebar, aside")) {
      return "sidebar";
    }

    // Default to header if location can't be determined
    return "header";
  }

  private extractHeader(): ParsedWebsite["header"] {
    // Try semantic header first
    const $header = this.$("header").first();
    const $fallbackHeader = this.$("#header, .header, [role='banner']").first();
    const $targetHeader = $header.length ? $header : $fallbackHeader;

    // Find logo
    const $logo = $targetHeader.find("img[src*='logo'], img[alt*='logo']").first();

    // Find title
    const $title = $targetHeader.find("h1, .site-title").first();
    const $subtitle = $targetHeader.find("h2, .site-description").first();

    return {
      logo: $logo.attr("src"),
      title: $title.text().trim() || this.$("title").text().trim() || "Welcome",
      subtitle: $subtitle.text().trim(),
    };
  }

  private extractContent(): ParsedWebsite["content"] {
    const main: ParsedWebsite["content"]["main"] = [];
    const sidebar: ParsedWebsite["content"]["sidebar"] = [];

    // Process main content
    const $mainContent = this.$("main, #main, .main-content, article").first();

    // Extract articles and sections
    $mainContent.find("article, section, .post").each((_, element) => {
      const $element = this.$(element);
      const $title = $element.find("h1, h2, h3").first();
      const $images = $element.find("img");

      const images = $images.map((_, img) => this.$(img).attr("src")).get();

      main.push({
        type: element.tagName === "article" ? "article" : "section",
        title: $title.text().trim(),
        content: this.cleanContent($element),
        images: images.length ? images : undefined,
      });
    });

    // Process sidebar content
    const $sidebar = this.$("#sidebar, .sidebar, aside").first();
    if ($sidebar.length) {
      $sidebar.children().each((_, element) => {
        const $element = this.$(element);
        const $title = $element.find("h2, h3, h4").first();

        sidebar.push({
          type: this.determineSidebarElementType($element),
          title: $title.text().trim(),
          content: this.cleanContent($element),
        });
      });
    }

    return {
      main: main.length ? main : [{ type: "text", content: this.extractFallbackContent() }],
      sidebar: sidebar.length ? sidebar : undefined,
    };
  }

  private extractFooter(): ParsedWebsite["footer"] {
    const $footer = this.$("footer, #footer, .footer").first();
    const sections: ParsedWebsite["footer"]["sections"] = [];

    if ($footer.length) {
      // Extract footer sections
      $footer.children().each((_, element) => {
        const $element = this.$(element);
        const $title = $element.find("h3, h4, h5").first();

        sections.push({
          title: $title.text().trim(),
          content: this.cleanContent($element),
        });
      });

      // Extract copyright
      const $copyright = $footer.find(".copyright, [class*='copyright']");

      return {
        sections,
        copyright: $copyright.text().trim(),
      };
    }

    // Fallback footer
    return {
      sections: [
        {
          content: "© " + new Date().getFullYear(),
        },
      ],
    };
  }

  private cleanContent($element: Cheerio<Element>): string {
    // Clone the element to avoid modifying the original
    const $clone = $element.clone();

    // Remove unwanted elements
    $clone.find("script, style, noscript, iframe").remove();

    // Remove empty elements
    $clone.find(":empty").remove();

    return $clone.html()?.trim() || "";
  }

  private determineSidebarElementType($element: Cheerio<Element>): "widget" | "menu" | "text" {
    if ($element.find("ul, ol").length) return "menu";
    if ($element.is(".widget, [class*='widget']")) return "widget";
    return "text";
  }

  private extractFallbackContent(): string {
    // If no structured content was found, extract the body content
    const $body = this.$("body");
    const $clone = $body.clone();

    // Remove header, footer, and navigation elements
    $clone.find("header, footer, nav, script, style").remove();

    return $clone.html()?.trim() || "No content found";
  }
}
