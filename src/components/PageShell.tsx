import { useEffect, useRef, useState, ReactNode } from "react";
import RevealLayer, { BG_IMAGE_1, BG_IMAGE_2 } from "./RevealLayer";

interface PageShellProps {
  children: ReactNode;
  /** 是否启用页面入场动画（默认 true） */
  animate?: boolean;
}

/**
 * 通用页面外壳：统一的地质双层背景 + 光标聚光灯 + 暗色叠加层
 * 所有子页面都套在里面，保证主题风格一致。
 */
export default function PageShell({ children, animate = true }: PageShellProps) {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({
        x: smooth.current.x,
        y: smooth.current.y,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen bg-black overflow-hidden ${animate ? "hero-zoom" : ""}`}
      style={{ minHeight: "100dvh" }}
    >
      {/* Base image (z-10) */}
      <div
        className="fixed inset-0 bg-center bg-cover bg-no-repeat z-10"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Reveal layer (z-30) - 固定在视口，随页面滚动聚光灯仍跟随鼠标 */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />
      </div>

      {/* Dark overlay (z-40) - 保证内容卡片可读性，又不遮挡聚光灯 */}
      <div className="fixed inset-0 z-40 pointer-events-none bg-black/55" />

      {/* Content (z-50) - 可滚动，留给页面具体内容 */}
      <main className="relative z-50 pt-28 pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
