import Image from 'next/image';

export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Image
        src="/images/hourglass2.gif"
        alt="Loading..."
        className="w-6 h-6"
        width={24}
        height={24}
      />
      <span className="blink text-win95-yellow">Please Wait...</span>
      <Image
        src="/images/hourglass2.gif"
        alt="Loading..."
        className="w-6 h-6"
        width={24}
        height={24}
      />
    </div>
  );
}
