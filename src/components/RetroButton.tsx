interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function RetroButton({ children, className = "", variant = "primary", size = "md", ...props }: RetroButtonProps) {
  const baseStyles = "border-2 bg-[#c0c0c0] font-bold shadow-win95 active:shadow-win95-inset disabled:opacity-50";
  
  const variantStyles = {
    primary: "border-[#808080] text-black hover:bg-[#d4d4d4]",
    secondary: "border-[#808080] bg-[#000080] text-white hover:bg-[#0000a0]",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
