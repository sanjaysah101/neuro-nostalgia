interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RetroButton({ children, className = '', ...props }: RetroButtonProps) {
  const playClickSound = () => {
    const audio = new Audio('/sounds/click.wav');
    audio.play().catch(() => {}); // Handle autoplay restrictions gracefully
  };

  return (
    <button
      className={`win95-button ${className}`}
      onClick={(e) => {
        playClickSound();
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
} 