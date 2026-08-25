import { useEffect, useRef, useState } from "react";
import RevealLayer, { BG_IMAGE_1, BG_IMAGE_2 } from "./RevealLayer";

/**
 * 单页滚动版全局背景：
 * - 只创建 1 次鼠标聚光灯监听（不再每页重复 mount RAF）
 * - fixed 双层地质背景 + RevealLayer 遮罩 + 55% 暗色叠加
 * - 内容由 App.tsx 里的 <main> 独立承载（z-50 可滚动容器）
 */
export default function SinglePageBackground() {
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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hero-zoom">
      {/* Base image (z-10) */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />
      {/* Reveal layer (z-30) - 聚光灯揭示图 */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />
      {/* Dark overlay (z-40) - 保证内容卡片可读，不遮挡聚光灯 */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
