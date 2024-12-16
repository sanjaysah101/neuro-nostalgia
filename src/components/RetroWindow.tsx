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
        <div className="flex items-center justify-between bg-[#000080] p-1">
          <div className="flex items-center gap-2">
            {icon && <Image src={icon} alt="" className="h-4 w-4" />}
            <h2 className="text-sm font-bold text-yellow-300">{title}</h2>
          </div>
          <div className="flex gap-1">
            <button className="h-5 w-5 border-2 border-[#808080] bg-[#c0c0c0] text-xs shadow-win95 active:shadow-win95-inset">
              _
            </button>
            <button className="h-5 w-5 border-2 border-[#808080] bg-[#c0c0c0] text-xs shadow-win95 active:shadow-win95-inset">
              □
            </button>
            <button className="h-5 w-5 border-2 border-[#808080] bg-[#c0c0c0] text-xs shadow-win95 active:shadow-win95-inset">
              ×
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
      <div className="flex h-6 items-center border-t-2 border-[#ffffff] bg-[#c0c0c0] px-2 text-sm">
        <span>Ready</span>
      </div>
    </div>
  );
}
