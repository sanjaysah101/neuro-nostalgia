import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import { getResponseForGivenPrompt } from '../../../services/geminiAI';

// Initialize Gemini AI
async function fetchWebsite(url: string) {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error('Failed to fetch website', error);
    throw new Error('Failed to fetch website');
  }
}

async function transform90sStyle(html: string) {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const mainContent = $('main, #main, .main').html() || $('body').html();

  const prompt = `
    Transform this modern website content into authentic 90s-style HTML. 
    Follow these specific requirements:

    1. Layout Structure:
    - Use <table> elements for layout with cellpadding="2" cellspacing="0"
    - Create a 3-column layout with navigation on left, content in center, updates on right
    - Add a classic "This site is under construction" banner at the top
    
    2. Visual Elements:
    - Add at least 3 animated GIFs (flames, construction, "NEW!" badges)
    - Include a hit counter at the bottom
    - Add a "Best viewed in 800x600" disclaimer
    - Include a "Last updated" timestamp
    
    3. Styling:
    - Use <font> tags with web-safe fonts (Times New Roman, Arial)
    - Set background="stars.gif"
    - Use classic 90s colors (#000080 for backgrounds, #FFFF00 for text)
    - Add <marquee> elements for important announcements
    
    4. Navigation:
    - Add a "Home | About | Links | Guestbook" navbar with beveled buttons
    - Include a "Back to Top" link with an arrow GIF
    - Add a web ring navigation section
    
    5. Additional Elements:
    - Add an "Email Me!" mailto link with an envelope GIF
    - Include a "Sign my Guestbook!" button
    - Add a "Best viewed in Netscape Navigator" badge
    - Insert a "Download Now!" button with file size in KB
    
    6. Additional Nostalgic Elements:
    - Add a "This site is optimized for Netscape Navigator 4.0"
    - Include a "Get Internet Explorer Now!" button
    - Add a "Sign my Guestbook" counter
    - Include a "Best viewed with 16-bit color" disclaimer
    - Add a "Website last updated on ${new Date().toLocaleDateString()}"
    
    Original Title: ${title}
    Content: ${mainContent?.slice(0, 1500)}...

    Return complete HTML with all these elements while preserving the main content.
    Add nostalgic HTML comments explaining the layout.
  `;

  const transformedHtml = await getResponseForGivenPrompt(prompt);

  if (!transformedHtml) {
    throw new Error('Failed to transform website');
  }

  // Post-process the transformed HTML to ensure it has required 90s elements
  const processedHtml = addMissing90sElements(transformedHtml);

  return processedHtml;
}

// Helper function to ensure all required 90s elements are present
function addMissing90sElements(html: string): string {
  const $ = cheerio.load(html);

  // Add meta tags for 90s compatibility
  if (!$('meta[http-equiv="X-UA-Compatible"]').length) {
    $('head').append('<meta http-equiv="X-UA-Compatible" content="IE=5">');
  }

  // Add classic 90s background if not present
  if (!$('body').attr('background')) {
    $('body').attr('background', '/images/stars.gif');
  }

  // Fix images
  $('img').each((_, img) => {
    const $img = $(img);
    if (!$img.attr('width')) $img.attr('width', '100');
    if (!$img.attr('height')) $img.attr('height', '100');
    $img.attr('loading', 'lazy');
  });

  return $.html();
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Fetch website content
    const html = await fetchWebsite(url);
    //   console.log({html})

    // Transform using Gemini
    const transformed = await transform90sStyle(html);
    //   console.log({ transformed })

    return NextResponse.json({ html: transformed });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: 'Failed to transform website' },
      { status: 500 }
    );
  }
}
