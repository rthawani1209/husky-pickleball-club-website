import React, { useEffect, useRef, useState } from "react";
import hero from "./photos/1-editorial-hero.png";
// The hero is an illustration with pointer-driven tilt, not a WebGL scene.
export function CourtScene() {
  const stage = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(true);
  const aim = useRef({ x: 0, y: 0, drag: false, px: 0, py: 0 });
  // Motion stays enabled unless the visitor requests reduced motion at the OS level.
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setMotion(!media.matches);
    const change = () => setMotion(!media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  // Ease toward the pointer position; cancel the animation loop on cleanup.
  useEffect(() => {
    let frame = 0;
    let x = 0,
      y = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const s = aim.current;
      x += (s.x - x) * 0.085;
      y += (s.y - y) * 0.085;
      const e = stage.current;
      if (e)
        e.style.transform = motion
          ? `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translate3d(${x * 1.2}px,${y}px,0)`
          : "none";
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [motion]);
  return (
    <div
      className="editorial-stage"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || aim.current.drag) {
          const r = e.currentTarget.getBoundingClientRect();
          aim.current.x = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
          aim.current.y = ((e.clientY - r.top - r.height / 2) / r.height) * 8;
        }
      }}
      onPointerDown={(e) => {
        aim.current.drag = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerUp={() => (aim.current.drag = false)}
      onPointerCancel={() => (aim.current.drag = false)}
      onPointerLeave={() => {
        aim.current.x = 0;
        aim.current.y = 0;
      }}
    >
      <div className="artwork" ref={stage}>
        <img
          src={hero}
          alt="Illustrative purple pickleball paddle and yellow ball under warm studio lighting"
          fetchPriority="high"
        />
      </div>

      <span className="art-credit">ILLUSTRATIVE CLUB EQUIPMENT</span>
    </div>
  );
}

