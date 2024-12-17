import Image from "next/image";

interface RetroWindowProps {
  url?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
  isLoading?: boolean;
}

export function RetroWindow({ url, title, children, className = "", icon, isLoading = false }: RetroWindowProps) {
  return (
    <div className={`border-2 border-[#808080] bg-[#c0c0c0] shadow-win95 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b-2 border-[#808080] bg-[#c0c0c0] p-1">
          <div className="flex items-center gap-2">
            {icon && <Image src={icon} alt="" className="h-4 w-4" />}
            <h2 className="text-sm font-bold text-[#000080]">{title}</h2>
          </div>
          <div className="flex gap-[2px]">
            <button className="h-[14px] w-[16px] border border-b-[#000000] border-l-[#ffffff] border-r-[#000000] border-t-[#ffffff] bg-[#c0c0c0] text-[10px] leading-[8px] text-black active:border-b-[#ffffff] active:border-l-[#000000] active:border-r-[#ffffff] active:border-t-[#000000] active:pl-[2px] active:pt-[2px]">
              &#8212;
            </button>
            <button className="h-[14px] w-[16px] border border-b-[#000000] border-l-[#ffffff] border-r-[#000000] border-t-[#ffffff] bg-[#c0c0c0] text-[10px] leading-[8px] text-black active:border-b-[#ffffff] active:border-l-[#000000] active:border-r-[#ffffff] active:border-t-[#000000] active:pl-[2px] active:pt-[2px]">
              &#9633;
            </button>
            <button className="h-[14px] w-[16px] border border-b-[#000000] border-l-[#ffffff] border-r-[#000000] border-t-[#ffffff] bg-[#c0c0c0] text-[10px] leading-[8px] text-black active:border-b-[#ffffff] active:border-l-[#000000] active:border-r-[#ffffff] active:border-t-[#000000] active:pl-[2px] active:pt-[2px]">
              &#10005;
            </button>
          </div>
        </div>
      )}
      {url && (
        <div className="sticky top-0 z-10 bg-[#c0c0c0]">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              <button className="h-3 w-3 rounded-full bg-[#ff0000]" title="Close" />
              <button className="h-3 w-3 rounded-full bg-[#ffff00]" title="Minimize" />
              <button className="h-3 w-3 rounded-full bg-[#00ff00]" title="Maximize" />
            </div>
            <div className="flex items-center space-x-2">
              <button className="rounded border border-gray-600 bg-[#c0c0c0] px-2 py-1" title="Copy URL">
                📋
              </button>
              <button className="rounded border border-gray-600 bg-[#c0c0c0] px-2 py-1" title="Refresh">
                🔄
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 border-t-2 border-[#ffffff] bg-[#c0c0c0] p-2">
            <input type="text" value={url} readOnly className="w-full bg-[#f0f0f0] p-1 font-mono text-sm" />
            <button className="rounded border-2 border-b-[#404040] border-l-white border-r-[#404040] border-t-white bg-[#c0c0c0] px-4 py-1 text-[#000000] active:border-b-white active:border-l-[#404040] active:border-r-white active:border-t-[#404040]">
              Go
            </button>
          </div>
        </div>
      )}
      <div className="relative overflow-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#000080] border-t-transparent" />
          </div>
        ) : (
          children
        )}
      </div>
      <div className="flex h-6 items-center border-t-2 border-[#ffffff] bg-[#c0c0c0] px-2 text-sm text-black">
        Ready
      </div>
    </div>
  );
}
