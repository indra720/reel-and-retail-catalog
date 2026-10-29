/** Natural warm luxury background with subtle sunlit leaf shadow ambience */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F8F5F0]">
      {/* Soft warm sunlit glows */}
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#EFE8DD]/70 blur-3xl" />
      <div className="absolute top-1/4 -right-36 h-[600px] w-[600px] rounded-full bg-[#F5ECE0]/60 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-[#F2E9DC]/60 blur-3xl" />
      
      {/* Subtle organic texture mask */}
      <div className="absolute inset-0 bg-grid-fade opacity-30" />
    </div>
  );
}

