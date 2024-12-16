export const useSound = () => {
  const playClick = () => {
    const audio = new Audio('/sounds/click.wav');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore errors if sound can't play
    });
  };

  return { playClick };
};
