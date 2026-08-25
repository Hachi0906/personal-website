import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import SinglePageBackground from "./components/SinglePageBackground";
import OriginalHomePage from "./pages/OriginalHomePage";
import OverviewPage from "./pages/OverviewPage";
import SkillsPage from "./pages/SkillsPage";
import HobbiesPage from "./pages/HobbiesPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";

/**
 * 单页长滚动版应用：
 *  - 不再用 React Router / HashRouter
 *  - 鼠标滚轮上下滑动浏览 6 个拼接页面
 *  - 顶部导航药丸 & Logo & CTA 点击 → 平滑滚动到对应 section
 *  - 滚动时 IntersectionObserver 自动同步导航激活态
 */

// 统一「平滑滚到指定 id」工具函数（给各页面内的按钮复用）
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 给页面内的"路由跳转按钮"做一个无路由替代组件
export function ScrollButton({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(to)}
      className={className}
    >
      {children}
    </button>
  );
}

// 给页面内的"章节卡锚点"做一个无路由替代组件（原来用 react-router-dom 的 Link 跳 /skills，现在滚到 #skills）
export function ScrollCardLink({
  to,
  className,
  style,
  children,
}: {
  to: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(to)}
      className={`text-left ${className ?? ""}`}
      style={style}
    >
      {children}
    </button>
  );
}

// —— 把各个页面的"章节锚点 id"提前声明好（供各页面内部跳转用）
export const SECTION_IDS = {
  home: "home",
  overview: "overview",
  skills: "skills",
  hobbies: "hobbies",
  achievements: "achievements",
  contact: "contact",
} as const;

export default function App() {
  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em] relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 单页共享背景：地质双层图 + 光标聚光灯（只监听一次 RAF） */}
      <SinglePageBackground />

      {/* 顶栏：平滑滚动 + 滚动激活态（无路由） */}
      <Navbar />

      {/* 可滚动内容容器：z-50 高于 fixed 背景层，pt-[88px] 整体下移避开通顶 fixed 导航栏 */}
      <main className="relative z-50 pt-[88px]">
        {/* #home：Chapter 01 — 原始全屏 Hero（Chapter 01 + 左下段落 + 右下开始探索） */}
        <section
          id={SECTION_IDS.home}
          className="scroll-mt-[96px]"
        >
          <OriginalHomePage />
        </section>

        {/* #overview：章节总览（欢迎 Hero + 4 张章节入口卡 + 引言横幅） */}
        <section
          id={SECTION_IDS.overview}
          className="scroll-mt-[96px]"
        >
          <OverviewPage />
        </section>

        {/* #skills：Chapter 02 — 技能 */}
        <section
          id={SECTION_IDS.skills}
          className="scroll-mt-[96px]"
        >
          <SkillsPage />
        </section>

        {/* #hobbies：Chapter 03 — 爱好 */}
        <section
          id={SECTION_IDS.hobbies}
          className="scroll-mt-[96px]"
        >
          <HobbiesPage />
        </section>

        {/* #achievements：Chapter 04 — 成就 */}
        <section
          id={SECTION_IDS.achievements}
          className="scroll-mt-[96px]"
        >
          <AchievementsPage />
        </section>

        {/* #contact：Chapter 05 — 联系方式 */}
        <section
          id={SECTION_IDS.contact}
          className="scroll-mt-[96px]"
        >
          <ContactPage />
        </section>
      </main>
    </div>
  );
}
