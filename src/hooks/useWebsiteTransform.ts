"use client";

import { useState } from "react";

import { WebsiteData } from "../app/api/parse/route";

export function useWebsiteTransform() {
  const [transformedHtml, setTransformedHtml] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const transform = async (url: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        cache: "force-cache",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transform website");
      }

      console.log({ data });
      setTransformedHtml(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { transform, loading, error, transformedHtml };
}
