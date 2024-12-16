import { RetroButton } from "./RetroButton";

export function WebRing() {
  return (
    <div className="win95-window mt-4 p-4">
      <div className="text-center">
        <div className="mb-2 text-black">Part of the Web Time Machine Ring</div>
        <div className="flex justify-center space-x-4">
          <RetroButton onClick={() => (window.location.href = "#")}>← Previous</RetroButton>
          <RetroButton onClick={() => (window.location.href = "#")}>Random</RetroButton>
          <RetroButton onClick={() => (window.location.href = "#")}>Next →</RetroButton>
        </div>
      </div>
    </div>
  );
}
