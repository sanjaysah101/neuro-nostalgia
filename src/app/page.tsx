'use client';

import { useState } from 'react';
import { RetroWindow } from '@/components/RetroWindow';
import { RetroButton } from '@/components/RetroButton';
import { useWebsiteTransform } from '@/hooks/useWebsiteTransform';
import Image from 'next/image';
import { LoadingAnimation } from '@/components/LoadingAnimation';

export default function Home() {
  const [url, setUrl] = useState('');
  const { transform, loading, error, transformedHtml } = useWebsiteTransform();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await transform(url);
  };

  return (
    <div className="min-h-screen p-4 stars-bg">
      <RetroWindow title="Neuro Nostalgia - Web Time Machine" className="mb-8">
        <div className="text-center">
          <div className="bg-win95-navy text-win95-yellow p-2 mb-4 marquee-container">
            <div className="marquee-content">
              🌟 Welcome to the Web Time Machine! Transform any modern website
              into 90s style! 🌟
            </div>
          </div>

          <div className="bg-win95-bg text-black p-2 mt-2 text-sm border border-win95-border-darker">
            <Image
              src="/images/new.gif"
              alt="New!"
              width={30}
              height={15}
              className="inline mr-2"
            />
            Best viewed in 800x600 resolution with Netscape Navigator!
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Image
              src="/images/construction.gif"
              alt="Under Construction"
              className="transform scale-x-[-1]"
              width={100}
              height={100}
            />
            <span className="blink">
              Transform any modern website into 90s style!
            </span>
            <Image
              src="/images/construction.gif"
              alt="Under Construction"
              className="transform scale-x-[-1]"
              width={100}
              height={100}
            />
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <RetroButton
              onClick={() =>
                (window.location.href = 'mailto:webmaster@example.com')
              }
            >
              📧 Email Webmaster
            </RetroButton>
            <RetroButton
              onClick={() => window.open('guestbook.html', '_blank')}
            >
              ✍️ Sign Guestbook
            </RetroButton>
          </div>
        </div>
      </RetroWindow>

      <main className="max-w-3xl mx-auto space-y-8">
        <RetroWindow>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block mb-2 text-black">
                Enter Website URL:
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="win95-input w-full text-black"
                required
                placeholder="https://example.com"
              />
            </div>
            <RetroButton type="submit" disabled={loading}>
              {loading ? 'Transforming...' : 'Transform to 90s Style'}
            </RetroButton>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </form>
        </RetroWindow>

        {transformedHtml && (
          <RetroWindow title="Transformed Preview">
            <div
              className="bg-white p-4 overflow-auto max-h-[600px]"
              dangerouslySetInnerHTML={{ __html: transformedHtml }}
            />
          </RetroWindow>
        )}
      </main>

      <footer className="mt-8 text-center">
        <RetroWindow>
          <p className="text-sm mt-2">
            Created for the Neuro Nostalgia Hackathon 2024
          </p>
          <div className="text-xs text-gray-600 mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
          <Image
            src="/images/netscape.gif"
            alt="Best viewed in Netscape"
            className="mt-2 mx-auto"
            width={100}
            height={100}
          />
        </RetroWindow>
      </footer>

      {loading && <LoadingAnimation />}
    </div>
  );
}
