"use client";

import { useState } from "react";

import RetroLayout from "@/components/RetroLayout";

import { useWebsiteTransform } from "../../hooks/useWebsiteTransform";

export default function Parse() {
  const { transform, loading, error, transformedHtml } = useWebsiteTransform();
  const [url, setUrl] = useState("https://webdevnerds.com");
  const [jsonData, setJsonData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await transform(url);
    setShowPreview(true);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Website Parser</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Parse
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jsonData && <RetroLayout data={jsonData} />}
    </div>
  );
}
