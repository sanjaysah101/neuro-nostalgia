import Image from "next/image";

interface RetroWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
  isLoading?: boolean;
}

export function RetroWindow({ title, children, className = "", icon, isLoading = false }: RetroWindowProps) {
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
