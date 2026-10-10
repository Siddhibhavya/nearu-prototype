import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg aria-hidden="true" height="14" viewBox="0 0 8 14" width="8"><path d={dir === "left" ? "M7 1 1 7l6 6" : "M1 1l6 6-6 6"} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
);

// A horizontally scrolling row with arrows that appear only where there is more to scroll to.
export function ScrollRow({ className, label, children, arrowTop }: { className: string; label: string; children: ReactNode; arrowTop?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft <= 30, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 30 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, []);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * Math.max(160, (ref.current?.clientWidth ?? 300) * 0.7), behavior: "smooth" });
  return (
    <div className="scroll-wrap" style={arrowTop !== undefined ? ({ "--arrow-top": `${arrowTop}px` } as CSSProperties) : undefined}>
      <div aria-label={label} className={className} ref={ref} role="region" tabIndex={0}>{children}</div>
      {!edge.start && <button aria-label="Scroll left" className="scroll-arrow left" onClick={() => go(-1)} type="button"><Chevron dir="left" /></button>}
      {!edge.end && <button aria-label="Scroll right" className="scroll-arrow right" onClick={() => go(1)} type="button"><Chevron dir="right" /></button>}
    </div>
  );
}

