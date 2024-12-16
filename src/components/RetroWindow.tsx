interface RetroWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string; // Add support for window icons
  isLoading?: boolean; // Add loading state
}

export function RetroWindow({ title, children, className = "", icon, isLoading = false }: RetroWindowProps) {
  return (
    <div className={`win95-window overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between bg-win95-navy p-1">
          <div className="flex items-center gap-2">
            {icon && <img src={icon} alt="" className="h-4 w-4" />}
            <h2 className="text-sm font-bold text-win95-yellow">{title}</h2>
          </div>
          <div className="flex gap-1">
            <button className="win95-button h-5 w-5 min-w-0 p-0 text-xs">_</button>
            <button className="win95-button h-5 w-5 min-w-0 p-0 text-xs">□</button>
            <button className="win95-button h-5 w-5 min-w-0 p-0 text-xs">×</button>
          </div>
        </div>
      )}
      <div className="relative h-[calc(100%-1.75rem)] overflow-auto bg-win95-gray p-2">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="win95-loading-animation" />
          </div>
        ) : (
          children
        )}
      </div>
      <div className="win95-statusbar border-win95-gray-light flex h-6 items-center border-t px-2 text-sm">
        <span>Ready</span>
      </div>
    </div>
  );
}
