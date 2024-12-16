interface RetroWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function RetroWindow({
  title,
  children,
  className = '',
}: RetroWindowProps) {
  return (
    <div className={`win95-window ${className}`}>
      {title && (
        <div className="bg-win95-navy p-2 mb-2">
          <h2 className="text-xl text-win95-yellow">{title}</h2>
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
}
