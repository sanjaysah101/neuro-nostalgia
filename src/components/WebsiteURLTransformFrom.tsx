import { useState } from "react";

import { RetroButton } from "./RetroButton";

const WebsiteURLTransformFrom = ({ onSubmit }: { onSubmit: (url: string) => void }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="mb-2 block text-black">
          Enter Website URL to Transform:
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="win95-input w-full"
          required
          placeholder="https://example.com"
        />
      </div>
      <div className="text-center">
        <RetroButton type="submit">Transform to 90s Style!</RetroButton>
      </div>
    </form>
  );
};

export default WebsiteURLTransformFrom;
