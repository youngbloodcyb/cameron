"use client";

import { useEffect, useRef } from "react";

// public/walker.png is a 4×2 grid of 256px walk-cycle frames, facing right,
// with a transparent background. Frames are pre-aligned (hat centered, feet
// on a shared baseline) so the cycle doesn't jitter.
const COLS = 4;
const ROWS = 2;
const FRAMES = COLS * ROWS;

// public/walker-still.png is a single 256px frame of him standing, aligned
// the same way as the walk frames, shown whenever he isn't walking.

// public/walker-held.png is a 4×2 grid of him flailing his arms, same frame
// size and alignment as walker.png, shown while he's being carried.

const SPEED = 70; // px per second
const FPS = 10; // walk-cycle frames per second
const HELD_FPS = FPS * 2; // he flails twice as fast while he's held
const LIFT = 10; // px he rises when picked up
const LIFT_EASE = 20; // how quickly he rises and settles (per second)
const DROP_REST = 700; // ms he stands still after being dropped
const MAX_LEG = 400; // farthest px he walks before picking a new spot

// A little guy who wanders around the viewport, above the page content.
// Grab him to pick him up and carry him somewhere else.
export function Walker() {
  const ref = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const heldRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const sprite = spriteRef.current;
    const still = stillRef.current;
    const flail = heldRef.current;
    const shadow = shadowRef.current;
    if (!el || !sprite || !still || !flail || !shadow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      return;
    }

    // Size comes from CSS (smaller on phones), so measure it.
    const maxX = () => Math.max(0, window.innerWidth - el.offsetWidth);
    const maxY = () => Math.max(0, window.innerHeight - el.offsetHeight);
    const clamp = (v: number, max: number) => Math.min(Math.max(v, 0), max);
    const nextTarget = (from: { x: number; y: number }) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = MAX_LEG * (0.3 + Math.random() * 0.7);
      return {
        x: clamp(from.x + Math.cos(angle) * dist, maxX()),
        y: clamp(from.y + Math.sin(angle) * dist, maxY()),
      };
    };

    let pos = { x: Math.random() * maxX(), y: Math.random() * maxY() };
    let target = nextTarget(pos);
    let facingRight = true;
    let restUntil = 0;
    let frame = 0;
    let frameTime = 0;
    let last = performance.now();
    let raf = 0;
    // Set while he's being carried: where on him he was grabbed.
    let held: { dx: number; dy: number } | null = null;
    let lift = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      held = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
      restUntil = 0;
      shadow.style.opacity = "1";
      document.documentElement.classList.add("walker-held");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!held) return;
      const x = clamp(e.clientX - held.dx, maxX());
      if (Math.abs(x - pos.x) > 1) facingRight = x > pos.x;
      pos = { x, y: clamp(e.clientY - held.dy, maxY()) };
    };

    const onPointerUp = () => {
      if (!held) return;
      held = null;
      target = nextTarget(pos);
      // Stand still for a beat after landing before walking off.
      restUntil = performance.now() + DROP_REST;
      shadow.style.opacity = "0";
      document.documentElement.classList.remove("walker-held");
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Stay on screen if the viewport shrinks.
      pos.x = Math.min(pos.x, maxX());
      pos.y = Math.min(pos.y, maxY());

      if (held) {
        frameTime += dt;
        if (frameTime >= 1 / HELD_FPS) {
          frameTime = 0;
          frame = (frame + 1) % FRAMES;
        }
      } else if (now >= restUntil) {
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);
        const step = SPEED * dt;

        if (dist <= step) {
          pos = target;
          target = nextTarget(pos);
          // Take a breather before heading off again.
          restUntil = now + 1000 + Math.random() * 3000;
          frame = 0;
        } else {
          pos.x += (dx / dist) * step;
          pos.y += (dy / dist) * step;
          if (Math.abs(dx) > 1) facingRight = dx > 0;

          frameTime += dt;
          if (frameTime >= 1 / FPS) {
            frameTime = 0;
            frame = (frame + 1) % FRAMES;
          }
        }
      }

      // Exactly one layer shows: flailing while held, standing while
      // resting, walking otherwise.
      const resting = !held && now < restUntil;
      sprite.style.visibility = !held && !resting ? "visible" : "hidden";
      still.style.visibility = resting ? "visible" : "hidden";
      flail.style.visibility = held ? "visible" : "hidden";

      const col = frame % COLS;
      const row = Math.floor(frame / COLS);
      const framePos = `${(col * 100) / (COLS - 1)}% ${(row * 100) / (ROWS - 1)}%`;
      sprite.style.backgroundPosition = framePos;
      flail.style.backgroundPosition = framePos;
      // Ease up when picked up and back down when dropped; the shadow
      // stays put on the ground.
      lift += ((held ? LIFT : 0) - lift) * Math.min(1, LIFT_EASE * dt);
      shadow.style.transform = `translateX(-50%) translateY(${lift}px)`;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y - lift}px, 0) scaleX(${facingRight ? 1 : -1})`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.classList.remove("walker-held");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 size-[72px] cursor-grab touch-none select-none sm:size-24"
      style={{ willChange: "transform" }}
    >
      {/* Shown on the "ground" under his feet while he's lifted. */}
      <div
        ref={shadowRef}
        className="absolute left-1/2 top-[98%] h-[8%] w-[45%] rounded-full bg-black/30 blur-[1px]"
        style={{ opacity: 0 }}
      />
      <div
        ref={spriteRef}
        className="size-full bg-no-repeat"
        style={{
          backgroundImage: "url(/walker.png)",
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        }}
      />
      <div
        ref={stillRef}
        // Visibility is set inline, not with Tailwind's `invisible`: this
        // project's Tailwind uses `important: true`, which would make the
        // class beat the inline style the animation loop sets.
        className="absolute inset-0 bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url(/walker-still.png)",
          visibility: "hidden",
        }}
      />
      <div
        ref={heldRef}
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: "url(/walker-held.png)",
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          visibility: "hidden",
        }}
      />
    </div>
  );
}
