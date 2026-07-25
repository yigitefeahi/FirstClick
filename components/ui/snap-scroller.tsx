"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const LOCK_MS = 400;
const WHEEL_THRESHOLD = 4;
const TOUCH_THRESHOLD = 28;

/** Full-viewport snap slide — match landing feel. Add overflow-* per surface. */
export const SNAP_SLIDE =
  "relative h-[calc(100svh-4rem)] w-full shrink-0 snap-start snap-always print:h-auto print:overflow-visible";
function canScrollFurther(el: HTMLElement, deltaY: number) {
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 1) return false;
  if (deltaY > 0) return el.scrollTop < max - 1;
  return el.scrollTop > 1;
}

function nearestScrollable(target: EventTarget | null, root: HTMLElement): HTMLElement | null {
  let node = target instanceof Element ? target : null;
  while (node && node !== root) {
    if (node instanceof HTMLElement) {
      const oy = getComputedStyle(node).overflowY;
      if (
        (oy === "auto" || oy === "scroll" || oy === "overlay") &&
        node.scrollHeight > node.clientHeight + 1
      ) {
        return node;
      }
    }
    node = node.parentElement;
  }
  return null;
}

export function SnapScroller({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const touchYRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const slideEls = () =>
      Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement);

    const syncIndex = () => {
      const items = slideEls();
      if (!items.length) return;
      const top = el.scrollTop;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, i) => {
        const d = Math.abs(item.offsetTop - top);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      indexRef.current = best;
    };

    const goTo = (next: number) => {
      const items = slideEls();
      if (!items.length) return;
      const clamped = Math.max(0, Math.min(next, items.length - 1));
      if (clamped === indexRef.current) return;

      lockedRef.current = true;
      indexRef.current = clamped;
      el.scrollTo({ top: items[clamped].offsetTop, behavior: "smooth" });

      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = setTimeout(() => {
        lockedRef.current = false;
        syncIndex();
      }, LOCK_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const nested = nearestScrollable(e.target, el);
      if (nested && canScrollFurther(nested, e.deltaY)) return;

      const items = slideEls();
      const slide = items[indexRef.current];
      if (slide && canScrollFurther(slide, e.deltaY)) return;

      const atStart = indexRef.current <= 0;
      const atEnd = indexRef.current >= items.length - 1;
      // Let the page scroll past the snap region (footer / content below).
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      if (lockedRef.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      goTo(indexRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchYRef.current == null) return;
      const nested = nearestScrollable(e.target, el);
      const items = slideEls();
      const slide = items[indexRef.current];
      const dyGuess =
        touchYRef.current - (e.touches[0]?.clientY ?? touchYRef.current);
      if (nested && canScrollFurther(nested, dyGuess)) return;
      if (slide && canScrollFurther(slide, dyGuess)) return;
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchYRef.current == null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchYRef.current;
      const dy = touchYRef.current - endY;
      touchYRef.current = null;
      if (lockedRef.current) return;
      if (Math.abs(dy) < TOUCH_THRESHOLD) return;

      const nested = nearestScrollable(e.target, el);
      if (nested && canScrollFurther(nested, dy)) return;
      const items = slideEls();
      const slide = items[indexRef.current];
      if (slide && canScrollFurther(slide, dy)) return;

      const atStart = indexRef.current <= 0;
      const atEnd = indexRef.current >= items.length - 1;
      if ((dy < 0 && atStart) || (dy > 0 && atEnd)) return;

      goTo(indexRef.current + (dy > 0 ? 1 : -1));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("scroll", syncIndex, { passive: true });

    return () => {
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("scroll", syncIndex);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "landing-snap h-[calc(100svh-4rem)] snap-y snap-mandatory overflow-y-auto overscroll-y-contain print:h-auto print:overflow-visible print:snap-none",
        className
      )}
    >
      {children}
    </div>
  );
}
