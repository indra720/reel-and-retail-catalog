/** Floating background: soft aurora orbs + faint grid, GPU-cheap. */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="orb orb-indigo animate-float-a -left-40 -top-40 h-[480px] w-[480px]" />
      <div className="orb orb-violet animate-float-b -right-52 top-1/3 h-[560px] w-[560px]" />
      <div className="orb orb-cyan animate-float-c bottom-[-140px] left-1/4 h-[420px] w-[420px]" />
      <div className="orb orb-violet animate-float-b left-[-160px] bottom-1/4 h-[380px] w-[380px]" />
    </div>
  );
}
