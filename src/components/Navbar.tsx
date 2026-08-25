import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// 顶部导航 5 项：标签 + 锚点 id（对应页面 section 的 id）
export const NAV_ITEMS: { label: string; id: string }[] = [
  { label: "主页", id: "home" },
  { label: "个人技能", id: "skills" },
  { label: "个人爱好", id: "hobbies" },
  { label: "个人成就", id: "achievements" },
  { label: "联系方式", id: "contact" },
];

/**
 * 单页滚动版导航栏：
 * - 无路由（HashRouter 已移除）
 * - 点击药丸：使用 scrollIntoView({ behavior: "smooth", block: "start" }) 平滑滚到对应 section
 * - 激活态高亮：基于 IntersectionObserver（顶栏 100px 以内最近的 section 记为激活）
 */
export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    // 避开顶部导航（收起后约 52px / 展开约 80px）：配合 section 的 scroll-mt-[96px] 精确避让
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavClick(id: string) {
    setActiveId(id);
    setMobileOpen(false);
    // 同一次点击用 rAF 等 setState 后再滚，避免老激活态闪烁
    requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(id)));
  }

  // 1) IntersectionObserver 滚动激活态同步
  // 2) 监听 window.scroll Y 坐标 → scrolled 状态控制导航栏收缩（高度 72→52px）
  useEffect(() => {
    const roots = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (roots.length === 0) return;

    // 同步 scrolled 状态
    const syncScrolled = () => setScrolled(window.scrollY > 40);
    syncScrolled();

    const io = new IntersectionObserver(
      (entries) => {
        // 选择：交叉比最大且 isIntersecting 的那一个
        let best: { id: string; ratio: number } | null = null;
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          if (!best || en.intersectionRatio > best.ratio) {
            best = { id: en.target.id, ratio: en.intersectionRatio };
          }
        });
        if (best) setActiveId(best.id);
      },
      {
        // 命中线：顶栏收缩后约 52px + 展开约 80px，取 100px 作为安全触发线
        rootMargin: scrolled ? "-72px 0px -65% 0px" : "-120px 0px -65% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    roots.forEach((el) => io.observe(el));

    // 滚动到接近最底部时兜底激活「联系方式」
    const onScroll = () => {
      syncScrolled();
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
        setActiveId("contact");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-200 ease-out will-change-transform ${
        scrolled
          // 滚下去：毛玻璃 + 深色压底 + 收缩 padding（高度 ≈ 52px），让章节内容不会被导航栏遮住
          ? "py-1.5 px-3 sm:px-4 bg-[rgba(17,19,17,0.72)] backdrop-blur-xl border-b border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
          // 在顶部：半透明 + 极淡暗色压底，保留 Hero 视觉干净但不与内容叠字
          : "p-4 sm:p-5 bg-black/10 backdrop-blur-[2px]"
      }`}
    >
      {/* Logo - 点击回到主页顶部 */}
      <button
        type="button"
        onClick={() => handleNavClick("home")}
        className="flex items-center gap-2 group"
      >
        <svg
          width={scrolled ? 22 : 26}
          height={scrolled ? 22 : 26}
          viewBox="0 0 256 256"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:rotate-12"
        >
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span
          className={`text-white font-playfair italic wave-text inline-block transition-all duration-200 ${
            scrolled ? "text-lg" : "text-2xl"
          }`}
        >
          {["H", "a", "c", "h", "i"].map((ch, i) => (
            <span
              key={i}
              className="wave-char inline-block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {ch}
            </span>
          ))}
        </span>
      </button>

      {/* Center pill (desktop) */}
      <div
        className={`hidden md:flex absolute left-1/2 -translate-x-1/2 rounded-full items-center gap-1 transition-all duration-200 border backdrop-blur-md ${
          scrolled
            ? "px-1.5 py-1 bg-white/12 border-white/20"
            : "px-2 py-2 bg-white/15 border-white/30"
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`rounded-full font-medium transition-colors ${
                scrolled ? "px-3 py-1 text-[13px]" : "px-4 py-1.5 text-sm"
              } ${
                isActive
                  ? "text-white bg-white/25"
                  : "text-white/75 hover:bg-white/20 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 右上角 CTA (desktop)：跳到联系方式 */}
      <button
        type="button"
        onClick={() => handleNavClick("contact")}
        className={`hidden md:block bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 ${
          scrolled ? "px-5 py-1.5 text-[13px]" : "px-6 py-2.5 text-sm"
        }`}
      >
        取得联系
      </button>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="切换菜单"
        onClick={() => setMobileOpen((v) => !v)}
        className="md:hidden w-10 h-10 flex items-center justify-center text-white"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-0 left-0 right-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-xl px-6 py-2 rounded-full transition-colors ${
                  isActive ? "text-white bg-white/20" : "text-white/80"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="mt-4 bg-white text-gray-900 text-base font-semibold px-8 py-3 rounded-full"
          >
            取得联系
          </button>
        </div>
      )}
    </nav>
  );
}
