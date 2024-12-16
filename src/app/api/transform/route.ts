import { NextResponse } from "next/server";

import { WebsiteParser } from "../../../services/websiteParser";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const response = await fetch(url);
    const html = await response.text();

    // Parse the website into structured format
    const parser = new WebsiteParser(html);
    const parsedWebsite = parser.parse();
    console.log("parsedWebsite start");
    console.dir(parsedWebsite, { depth: null });
    console.log("parsedWebsite end");

    // Transform to 90s style
    // const transformer = new HTML90sTransformer(parsedWebsite);
    // const transformed = transformer.transform();
    // console.log("transformed start");
    // console.dir(transformed, { depth: null });
    // console.log("transformed end");

    return NextResponse.json({ html: JSON.stringify(parsedWebsite) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to transform website" }, { status: 500 });
  }
}
