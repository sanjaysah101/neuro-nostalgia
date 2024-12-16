import { useState } from 'react';

export function useWebsiteTransform() {
  const [transformedHtml, setTransformedHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const transform = async (url: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transform website');
      }

      setTransformedHtml(data.html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { transform, loading, error, transformedHtml };
} 