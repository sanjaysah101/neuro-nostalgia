import { ParsedWebsite } from "./websiteParser";

export class HTML90sTransformer {
  private website: ParsedWebsite;

  constructor(parsedWebsite: ParsedWebsite) {
    this.website = parsedWebsite;
  }

  transform(): string {
    return `
      <html>
        <head>
          ${this.generateHead()}
        </head>
        <body bgcolor="#000080" text="#000000" link="#0000FF" vlink="#800080">
          <center>
            ${this.generateHeader()}
            ${this.generateNavigation()}
            ${this.generateMainContent()}
            ${this.generateFooter()}
          </center>
        </body>
      </html>
    `;
  }

  private generateHead(): string {
    return `
      <title>${this.website.meta.title}</title>
      <meta name="description" content="${this.website.meta.description || ""}">
      <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=5">
      ${this.website.meta.favicon ? `<link rel="icon" href="${this.website.meta.favicon}">` : ""}
      <style>
        body { 
          font-family: "Times New Roman", Times, serif;
          margin: 0;
          padding: 20px 0;
          background-image: url('/images/stars.gif');
        }
        td { font-family: Arial, sans-serif; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      </style>
    `;
  }

  private generateHeader(): string {
    return `
      <table width="100%" cellpadding="2" cellspacing="0" bgcolor="#000080">
        <tr>
          <td align="center">
            ${this.website.header.logo ? `<img src="${this.website.header.logo}" alt="Logo" border="0"><br>` : ""}
            <font face="Arial" color="#FFFF00" size="+2">
              <b>${this.website.header.title}</b>
            </font>
            ${
              this.website.header.subtitle
                ? `<br><font face="Arial" color="#FFFFFF" size="+1">${this.website.header.subtitle}</font>`
                : ""
            }
          </td>
        </tr>
      </table>
      <marquee behavior="alternate" scrollamount="3">
        <font face="Arial" color="#FFFF00" size="+1">
          🚧 WELCOME TO OUR WEBSITE - UNDER CONSTRUCTION 🚧
        </font>
      </marquee>
    `;
  }

  private generateNavigation(): string {
    const { items, location } = this.website.navigation;
    const navHtml = `
      <table border="0" cellspacing="0" cellpadding="4" width="100%" bgcolor="#C0C0C0">
        <tr>
          <td align="center">
            [ ${items
              .map((item) => `<a href="${item.url}"><font color="#0000FF">${item.text}</font></a>`)
              .join(" | ")} ]
          </td>
        </tr>
      </table>
    `;

    return location === "header" ? navHtml : "";
  }

  private generateMainContent(): string {
    return `
      <table width="85%" cellpadding="4" cellspacing="1" bgcolor="#000000" style="margin: 20px auto;">
        <tr>
          ${this.website.navigation.location === "sidebar" ? this.generateSidebar("left") : ""}
          <td bgcolor="#FFFFFF" valign="top">
            ${this.generateMainSection()}
          </td>
          ${this.website.content.sidebar ? this.generateSidebar("right") : ""}
        </tr>
      </table>
    `;
  }

  private generateMainSection(): string {
    return this.website.content.main
      .map((section) => {
        let content = `
          ${section.title ? `<h2><font color="#000080">${section.title}</font></h2>` : ""}
          <div style="line-height: 1.4;">
            ${section.content}
          </div>
        `;

        if (section.images?.length) {
          content += `
            <center>
              <table border="0" cellspacing="10" cellpadding="0">
                <tr>
                  ${section.images
                    .map(
                      (img) => `
                    <td align="center">
                      <img src="${img}" border="1" width="200">
                    </td>
                  `
                    )
                    .join("")}
                </tr>
              </table>
            </center>
          `;
        }

        return content;
      })
      .join("<hr width='90%'>");
  }

  private generateSidebar(position: "left" | "right"): string {
    const content =
      position === "left"
        ? this.generateNavigationSidebar()
        : this.generateWidgetSidebar(this.website.content.sidebar || []);

    return `
      <td width="20%" bgcolor="#C0C0C0" valign="top">
        ${content}
      </td>
    `;
  }

  private generateNavigationSidebar(): string {
    return `
      <div style="padding: 10px;">
        <font face="Arial" size="2">
          <div align="center" style="background-color: #000080; padding: 5px;">
            <font color="#FFFF00"><b>Navigation</b></font>
          </div>
          ${this.website.navigation.items
            .map(
              (item) => `
            <div style="margin: 5px 0;">
              <img src="/images/bullet.gif" width="12" height="12">
              <a href="${item.url}">${item.text}</a>
            </div>
          `
            )
            .join("")}
        </font>
      </div>
    `;
  }

  private generateWidgetSidebar(widgets: ParsedWebsite["content"]["sidebar"] = []): string {
    return (widgets || [])
      .map(
        (widget) => `
      <div style="padding: 10px; margin-bottom: 10px;">
        <font face="Arial" size="2">
          ${
            widget.title
              ? `
            <div align="center" style="background-color: #000080; padding: 5px;">
              <font color="#FFFF00"><b>${widget.title}</b></font>
            </div>
          `
              : ""
          }
          <div style="border: 2px inset #FFFFFF; padding: 8px; margin-top: 5px;">
            ${widget.content}
          </div>
        </font>
      </div>
    `
      )
      .join("");
  }

  private generateFooter(): string {
    return `
      <table width="100%" cellpadding="4" cellspacing="0" bgcolor="#000080">
        <tr>
          <td align="center">
            <font face="Arial" color="#FFFFFF" size="2">
              ${this.website.footer.sections.map((section) => section.content).join(" | ")}
              ${this.website.footer.copyright ? `<br>${this.website.footer.copyright}` : ""}
            </font>
          </td>
        </tr>
      </table>
      <div style="margin-top: 10px;">
        <img src="/images/counter.gif" alt="Visitor Counter">
        <br>
        <font size="1">Visitors: 1337</font>
      </div>
    `;
  }
}
