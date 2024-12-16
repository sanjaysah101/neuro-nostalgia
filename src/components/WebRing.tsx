export function WebRing() {
  return (
    <div className="win95-window p-4 mt-4">
      <div className="text-center">
        <div className="text-black mb-2">Part of the Web Time Machine Ring</div>
        <div className="flex justify-center space-x-4">
          <RetroButton onClick={() => window.location.href = '#'}>
            ← Previous
          </RetroButton>
          <RetroButton onClick={() => window.location.href = '#'}>
            Random
          </RetroButton>
          <RetroButton onClick={() => window.location.href = '#'}>
            Next →
          </RetroButton>
        </div>
      </div>
    </div>
  );
} 