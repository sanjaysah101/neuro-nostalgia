import { useEffect, useState } from "react";

import { RetroWindow } from "./RetroWindow";

export const DynamicLayout = ({ url }: { url: string }) => {
  const [transformedHtml, setTransformedHtml] = useState<{ html: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/parse/dynamic`, {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const html = await data.json();
      setTransformedHtml(html);
    };

    fetchData();
  }, [url]);

  return (
    <div className="mt-8">
      <RetroWindow title={`Retro Version - ${url}`} className="bg-[#c0c0c0]">
        <div className="h-[800px] overflow-hidden bg-white">
          {transformedHtml ? (
            <iframe
              srcDoc={transformedHtml.html}
              className="h-full w-full border-0"
              sandbox="allow-same-origin allow-scripts allow-forms"
              title="Retro Website Preview"
            />
          ) : null}
        </div>
      </RetroWindow>
    </div>
  );
};
