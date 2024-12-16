import { NextResponse } from "next/server";

import * as cheerio from "cheerio";

export type WebsiteData = {
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
    sidebar: {
      navigation: Array<{
        menuLinks: Array<{
          text: string;
          href: string;
        }>;
      }>;
      categories: string[];
      widgets: Array<{
        title: string;
        content: string;
        hasImage: boolean;
      }>;
    };
    main: {
      headings: {
        h1: string[];
        h2: string[];
        h3: string[];
      };
      content: {
        articles: Array<{
          text: string;
          date: string;
          author: string;
          category: string;
          hasComments: boolean;
          readingTime: string;
        }>;
        images: Array<{
          src: string;
          alt: string;
          dimensions: {
            width: string;
            height: string;
          };
          isDecorative: boolean;
          inArticle: boolean;
          isThumbnail: boolean;
        }>;
        videos: Array<{
          src: string;
          poster: string;
        }>;
        tables: Array<{
          headers: string[];
          rows: number;
          hasBorder: boolean;
        }>;
      };
    };
    footer: {
      links: Array<{
        text: string;
        href: string;
        section: string;
      }>;
      copyright: string;
      hasNewsletter: boolean;
      socialLinks: number;
    };
  };
  style: {
    colors: {
      background: string;
      text: string;
      links: string;
      accent: string;
    };
    fonts: string[];
    hasGradients: boolean;
    hasBorders: boolean;
    layout: {
      isResponsive: boolean;
      hasFrames: boolean;
      hasTables: boolean;
      hasFloats: boolean;
    };
  };
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    // Define images
    const images = Array.from(
      new Map(
        $("img")
          .map((_, el) => ({
            src: $(el).attr("src"),
            alt: $(el).attr("alt") || "",
          }))
          .get()
          .filter((img) => img.src)
          .map((img) => [img.src, img])
      ).values()
    );

    // Define articles
    const articles = Array.from(
      new Set(
        $("article")
          .map((_, el) => $(el).text().trim())
          .get()
      )
    );

    // Define navMenus first
    const navMenus = $("nav")
      .map((_, el) => ({
        menuLinks: Array.from(
          new Map(
            $(el)
              .find("a")
              .map((_, navEl) => ({
                text: $(navEl).text().trim(),
                href: $(navEl).attr("href"),
              }))
              .get()
              .filter((link): link is { text: string; href: string } => Boolean(link.href))
              .map((link) => [link.href, link])
          ).values()
        ),
      }))
      .get();

    // Define videos
    const videos = Array.from(
      new Map(
        $("video")
          .map((_, el) => ({
            src: $(el).attr("src") || $(el).find("source").attr("src"),
            poster: $(el).attr("poster") || "",
          }))
          .get()
          .filter((video) => video.src)
          .map((video) => [video.src, video])
      ).values()
    );

    // Extract structured data with unique entries
    const mainContent: WebsiteData = {
      title: $("head > title, .site-title").text().trim(),
      meta: {
        description: $('meta[name="description"]').attr("content") || "",
        keywords: $('meta[name="keywords"]').attr("content") || "",
        author: $('meta[name="author"]').attr("content") || "",
        generator: $('meta[name="generator"]').attr("content") || "",
        viewport: $('meta[name="viewport"]').attr("content") || "",
        charset: $("meta[charset]").attr("charset") || "UTF-8",
      },
      layout: {
        header: {
          title: $("h1, .site-title, #site-title").first().text().trim() || $("head > title").text().trim(),
          logo: $("img[src*='logo'], .custom-logo, .site-logo").attr("src") || "",
          mainNav: Array.from(
            new Map(
              $("#primary-menu, .primary-menu, .main-navigation, #site-navigation, .nav-primary, header nav, nav:first")
                .find("a")
                .map((_, el) => ({
                  text: $(el).text().trim(),
                  href: $(el).attr("href"),
                  isActive: $(el).hasClass("active") || $(el).hasClass("current-menu-item") || false,
                  hasIcon: $(el).find("img, i, svg").length > 0,
                }))
                .get()
                .filter(
                  (link): link is { text: string; href: string; isActive: boolean; hasIcon: boolean } =>
                    Boolean(link.href) && !link?.href?.includes("#")
                )
                .map((link) => [link.href, link])
            ).values()
          ),
          banner: $(".banner, .hero, .site-banner, header img").first().attr("src") || "",
        },
        sidebar: {
          navigation: navMenus,
          categories: Array.from(
            new Set(
              $(
                ".categories a, .category a, .cat-item, aside a[href*='category'], .widget_categories a, .sidebar-menu a"
              )
                .map((_, el) => $(el).text().trim())
                .get()
                .filter(Boolean)
            )
          ),
          widgets: $(".widget, .sidebar > div, aside > div, #secondary > div")
            .map((_, el) => ({
              title: $(el).find(".widget-title, h2, h3, h4").first().text().trim(),
              content: $(el).clone().children(".widget-title, h2, h3, h4").remove().end().text().trim(),
              hasImage: $(el).find("img").length > 0,
            }))
            .get()
            .filter((widget) => widget.title || widget.content),
        },
        main: {
          headings: {
            h1: Array.from(
              new Set(
                $("main h1, article h1, .entry-title, .post-title")
                  .map((_, el) => $(el).text().trim())
                  .get()
                  .filter(Boolean)
              )
            ),
            h2: Array.from(
              new Set(
                $("main h2, article h2")
                  .map((_, el) => $(el).text().trim())
                  .get()
              )
            ),
            h3: Array.from(
              new Set(
                $("main h3, article h3")
                  .map((_, el) => $(el).text().trim())
                  .get()
              )
            ),
          },
          content: {
            articles: articles.map((article) => ({
              text: article,
              date: $("article time, .entry-date, .posted-on").first().attr("datetime") || "",
              author: $("article .author, .entry-author, .byline").first().text().trim() || "",
              category: $("article .category, .entry-category, .post-categories").first().text().trim() || "",
              hasComments: $("article .comments, .comment-count, .comments-link").length > 0,
              readingTime: $("article .reading-time, .rt-time").first().text().trim() || "",
            })),
            images: images
              .filter((img): img is { src: string; alt: string } => Boolean(img.src))
              .map((img) => ({
                ...img,
                dimensions: {
                  width: $(`img[src="${img.src}"]`).attr("width") || "",
                  height: $(`img[src="${img.src}"]`).attr("height") || "",
                },
                isDecorative: !img.alt,
                inArticle: $(`img[src="${img.src}"]`).closest("article").length > 0,
                isThumbnail: $(`img[src="${img.src}"]`).hasClass("thumbnail"),
              })),
            videos: videos.filter((video): video is { src: string; poster: string } => Boolean(video.src)),
            tables: $("table")
              .map((_, el) => ({
                headers: $(el)
                  .find("th")
                  .map((_, th) => $(th).text().trim())
                  .get(),
                rows: $(el).find("tr").length,
                hasBorder: $(el).attr("border") !== undefined,
              }))
              .get(),
          },
        },
        footer: {
          links: Array.from(
            new Map(
              $("footer a, .site-footer a, .footer-widgets a")
                .map((_, el) => ({
                  text: $(el).text().trim(),
                  href: $(el).attr("href"),
                  section: $(el).closest("div, section").find("h3, h4, .widget-title").first().text().trim(),
                }))
                .get()
                .filter(
                  (link): link is { text: string; href: string; section: string } =>
                    Boolean(link.href) && !link?.href?.includes("#")
                )
                .map((link) => [link.href, link])
            ).values()
          ),
          copyright:
            $("footer, .site-footer")
              .text()
              .match(/copyright.*?\d{4}|©.*?\d{4}/i)?.[0] || "",
          hasNewsletter: $("footer form, .newsletter, .subscribe, .mc4wp-form").length > 0,
          socialLinks: $(
            "footer .social a, .social-links a, a[href*='facebook'], a[href*='twitter'], a[href*='instagram']"
          ).length,
        },
      },
      style: {
        colors: {
          background: $("body, main").css("background-color") || "",
          text: $("body").css("color") || "",
          links: $("a").css("color") || "",
          accent: $("header, .accent").css("background-color") || "",
        },
        fonts: Array.from(
          new Set(
            [
              $("body").css("font-family") || "",
              $("h1, h2, h3").css("font-family") || "",
              $("nav").css("font-family") || "",
            ].filter(Boolean)
          )
        ),
        hasGradients: $("*").filter((_, el) => $(el).css("background-image")?.includes("gradient") || false).length > 0,
        hasBorders: $("*").filter((_, el) => ($(el).css("border-width") || "") !== "0px").length > 0,
        layout: {
          isResponsive: $('meta[name="viewport"]').length > 0,
          hasFrames: $("frame, frameset, iframe").length > 0,
          hasTables: $("table").length > 0,
          hasFloats: $("*").filter((_, el) => ($(el).css("float") || "") !== "none").length > 0,
        },
      },
    };

    return NextResponse.json(mainContent);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: `Failed to transform website ${error}` }, { status: 500 });
  }
}
