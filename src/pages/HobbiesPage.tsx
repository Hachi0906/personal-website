import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Gamepad2,
  Camera,
  Music2,
  BookOpen,
  Mountain,
  Film,
  Rocket,
  Flower2,
  Compass,
  Mountain as GeologyMap,
  type LucideIcon,
} from "lucide-react";

interface Hobby {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  strataColor: string; // 地质色（B 蓝 / A 绿 / S 金）— 呼应成就章 BAS 分层
  years: string;
  intensity: number;
}

const HOBBIES: Hobby[] = [
  { title: "独立游戏开发", tagline: "一个人就是一支队伍", description: "从零设计到代码落地，享受把脑海里的场景变成玩家可以实际游玩的体验。坦克战、东方 STG，每一款都是完整的世界观练习。", icon: Gamepad2, gradient: "from-[#e8702a] to-[#9f4a14]", strataColor: "#e8702a", years: "2025 - 至今", intensity: 5 },
  { title: "动漫视频剪辑", tagline: "节奏就是一切", description: "把喜欢的番剧素材剪在一起，练的是节奏感、叙事感和对BGM卡点的肌肉记忆。出片不一定发，但每一帧都要自己满意。", icon: Film, gradient: "from-[#a04848] to-[#5f2626]", strataColor: "#5f78a0", years: "2023 - 至今", intensity: 4 },
  { title: "AI 绘图探索", tagline: "把脑中的画面描述出来", description: "研究提示词的语法、风格化控制、人物与场景的一致性。地质风、军事风、东方少女风，每种风格都是一套新的语言。", icon: Camera, gradient: "from-[#a89466] to-[#6e5f3d]", strataColor: "#a89466", years: "2025 - 至今", intensity: 5 },
  { title: "音乐聆听", tagline: "写代码的背景音绝不将就", description: "游戏OST、爵士Lo-Fi、后摇、古风……不同的任务需要不同的声场。坦克战写战斗系统时一定是燃曲，写UI时一定是钢琴Lo-Fi。", icon: Music2, gradient: "from-[#6b8e5a] to-[#3d5a3e]", strataColor: "#6b8e5a", years: "∞", intensity: 5 },
  { title: "阅读 & 科幻", tagline: "让想象力有地方落脚", description: "偏爱硬科幻与地质学纪实——板块构造的尺度、文明轮回的尺度，读完总会觉得自己做的事情也能放进更大的坐标系里。", icon: BookOpen, gradient: "from-[#5f78a0] to-[#37455f]", strataColor: "#5f78a0", years: "从小开始", intensity: 4 },
  { title: "徒步 & 自然观察", tagline: "真的去踩一踩地层", description: "代码之外喜欢往山里跑，看真实的岩层断面、溪流冲刷的痕迹、路边的矿石。有时候对「真实世界」的理解会反哺设计的质感。", icon: Mountain, gradient: "from-[#6b8e5a] to-[#2c4a2d]", strataColor: "#6b8e5a", years: "季节性", intensity: 3 },
  { title: "折腾新项目", tagline: "点子永远比时间多", description: "看到一个新的框架、一个新的AI能力，第一件事就是想「能做什么小玩具」。原型做了一大堆，能活下来的才是真爱好。", icon: Rocket, gradient: "from-[#e8702a] to-[#6b4423]", strataColor: "#e8702a", years: "Weekends", intensity: 5 },
  { title: "植物 & 手作", tagline: "慢节奏的疗愈时间", description: "对着屏幕久了就去看阳台上的植物，偶尔做点手工小物。需要这种「不产生数据、只产生感受」的活动来保持情绪的平衡。", icon: Flower2, gradient: "from-[#6b8e5a] to-[#476038]", strataColor: "#6b8e5a", years: "日常", intensity: 3 },
];

function IntensityDots({ n, accent }: { n: number; accent: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: i <= n ? accent : "rgba(255,255,255,0.18)",
            boxShadow: i <= n ? `0 0 6px ${accent}` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * 单张爱好卡片的初始位置：扇形堆叠（扇面散开 + 重叠 ~65%）
 *   前一张 → 左上；后一张 → 右下 24/22 px，旋转递增 0.7°
 *   看起来就像一叠地质标本卡
 * ------------------------------------------------------------------------ */
type CardInit = { baseX: number; baseY: number; rotDeg: number };

function buildStackedLayout(count: number, isMobile: boolean): CardInit[] {
  const out: CardInit[] = [];
  // 用固定种子伪随机（不跳布局），但整体堆叠规则仍稳定
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const dx = isMobile ? 18 : 26;   // 每张向右偏移（px）
  const dy = isMobile ? 16 : 20;   // 每张向下偏移（px）
  const baseX = isMobile ? 14 : 36;
  const baseY = isMobile ? 24 : 44;
  const baseRot = -1.6;
  const stepRot = isMobile ? 0.6 : 0.82;
  for (let i = 0; i < count; i++) {
    const wobbleX = (rnd() - 0.5) * 6; // ±3px 小抖动
    const wobbleY = (rnd() - 0.5) * 5;
    out.push({
      baseX: baseX + i * dx + wobbleX,
      baseY: baseY + i * dy + wobbleY,
      rotDeg: baseRot + i * stepRot,
    });
  }
  return out;
}

/* 工具：边界 clamp（三处复用：拖拽移动、惯性、尺寸变化） */
function clampXY(
  x: number,
  y: number,
  aw: number,
  ah: number,
  cw: number,
  ch: number,
) {
  const maxX = Math.max(0, aw - cw);
  const maxY = Math.max(0, ah - ch);
  return { x: Math.max(0, Math.min(x, maxX)), y: Math.max(0, Math.min(y, maxY)) };
}

/* --------------------------------------------------------------------------
 * 爱好卡片组件：
 *   高性能拖拽 — pointermove 读 ref + requestAnimationFrame 批量写 translate3d
 *   拖拽中 transition:none → 松手后恢复 transition + 惯性阻尼
 *   地质标本主题样式
 * ------------------------------------------------------------------------ */
interface HobbyCardProps {
  hobby: Hobby;
  index: number;
  total: number;
  init: CardInit;
  arenaRef: React.RefObject<HTMLDivElement>;
  zTop: number;
  onBringToFront: () => void;
}

function HobbyCard({ hobby, index, total, init, arenaRef, zTop, onBringToFront }: HobbyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false); // 启动 GPU 合成层后过渡位

  // — 瞬时坐标都存 useRef，避免高频 setState 触发 React render —
  const dragRef = useRef({
    x: init.baseX,
    y: init.baseY,
    dx: 0,              // 指针距卡片左上角偏移（px）
    pointerId: null as number | null,
    vx: 0, vy: 0,       // 最近帧速度（px/frame），用于松手惯性
    lastTx: init.baseX,
    lastTy: init.baseY,
    rafId: 0 as number | 0,
    inertiaActive: false,
  });

  const Icon = hobby.icon;
  const specimenId = `H-${String(index + 1).padStart(2, "0")}`;

  /* ---- 把卡片当前 transform 应用到 DOM（不走 React state） ---- */
  const applyTransform = () => {
    const el = cardRef.current;
    if (!el) return;
    const d = dragRef.current;
    const rot = dragging ? 0.6 : init.rotDeg;
    const extra = dragging ? "scale(1.025)" : "scale(1)";
    el.style.transform = `translate3d(${d.x.toFixed(2)}px, ${d.y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) ${extra}`;
  };

  /* ---- 初始挂载：按 arena 尺寸 clamp 一次，监听 arena / card 尺寸变化 ---- */
  useLayoutEffect(() => {
    const arena = arenaRef.current;
    const card = cardRef.current;
    if (!arena || !card) return;
    const clampAndApply = () => {
      const aw = arena.clientWidth;
      const ah = arena.clientHeight;
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const { x, y } = clampXY(dragRef.current.x, dragRef.current.y, aw, ah, cw, ch);
      dragRef.current.x = x;
      dragRef.current.y = y;
      applyTransform();
    };
    clampAndApply();
    setDismissed(true); // 打开 transition（未挂载时关闭避免入场跳动）

    const ro = new ResizeObserver(clampAndApply);
    ro.observe(arena);
    ro.observe(card);
    window.addEventListener("resize", clampAndApply);
    return () => {
      if (dragRef.current.rafId) cancelAnimationFrame(dragRef.current.rafId);
      ro.disconnect();
      window.removeEventListener("resize", clampAndApply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- 指针按下：记录偏移 + bringToFront + 捕获指针 ---- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const arena = arenaRef.current;
    const card = cardRef.current;
    if (!arena || !card) return;
    if (e.button !== 0 && e.pointerType === "mouse") return; // 鼠标只有左键能拖
    e.preventDefault();
    onBringToFront();
    setDragging(true);

    const d = dragRef.current;
    const aRect = arena.getBoundingClientRect();
    const cRect = card.getBoundingClientRect();
    d.dx = e.clientX - cRect.left;
    d.dy = e.clientY - cRect.top;
    d.pointerId = e.pointerId;
    d.vx = 0; d.vy = 0;
    d.lastTx = e.clientX;
    d.lastTy = e.clientY;
    if (d.rafId) { cancelAnimationFrame(d.rafId); d.rafId = 0; }
    d.inertiaActive = false;
    // 对齐到当前真实像素（避免跟 transform 叠加的跳帧）
    d.x = cRect.left - aRect.left;
    d.y = cRect.top - aRect.top;
    applyTransform();
    try { card.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  /* ---- 指针移动：合并到 RAF 批量写 DOM，不触发 React render ---- */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!dragging || d.pointerId !== e.pointerId) return;
    e.preventDefault();

    // 记录瞬时速度（pointer 事件是每 ~8ms 一次，rAF 16ms 一次平均够用）
    const dtX = e.clientX - d.lastTx;
    const dtY = e.clientY - d.lastTy;
    // 指数平滑：70% 当前 + 30% 历史，避免锯齿
    d.vx = d.vx * 0.35 + dtX * 0.65;
    d.vy = d.vy * 0.35 + dtY * 0.65;
    d.lastTx = e.clientX;
    d.lastTy = e.clientY;

    const arena = arenaRef.current;
    const card = cardRef.current;
    if (!arena || !card) return;
    const aRect = arena.getBoundingClientRect();
    let nx = e.clientX - aRect.left - d.dx;
    let ny = e.clientY - aRect.top - d.dy;
    const clamped = clampXY(nx, ny, arena.clientWidth, arena.clientHeight, card.offsetWidth, card.offsetHeight);
    d.x = clamped.x; d.y = clamped.y;

    if (!d.rafId) {
      d.rafId = requestAnimationFrame(() => {
        d.rafId = 0;
        applyTransform();
      });
    }
  };

  /* ---- 指针抬起：进入惯性阻尼动画 ---- */
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d.pointerId !== e.pointerId) return;
    d.pointerId = null;
    const card = cardRef.current;
    const arena = arenaRef.current;
    if (card && d.pointerId == null) {
      try { card.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    }
    setDragging(false);

    // — 惯性：每帧 v *= 0.92，速度 < 0.08 时停止 —
    const hasInertia = Math.abs(d.vx) + Math.abs(d.vy) > 0.25;
    if (hasInertia && arena && card) {
      d.inertiaActive = true;
      const tick = () => {
        d.vx *= 0.915;
        d.vy *= 0.915;
        d.x += d.vx;
        d.y += d.vy;
        const clamped = clampXY(
          d.x, d.y,
          arena.clientWidth, arena.clientHeight,
          card.offsetWidth, card.offsetHeight,
        );
        d.x = clamped.x; d.y = clamped.y;
        // 碰壁反弹 35% 能量
        if (d.x === 0 || d.x === Math.max(0, arena.clientWidth - card.offsetWidth)) d.vx *= -0.35;
        if (d.y === 0 || d.y === Math.max(0, arena.clientHeight - card.offsetHeight)) d.vy *= -0.35;
        applyTransform();
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.08) {
          d.rafId = requestAnimationFrame(tick);
        } else {
          d.rafId = 0;
          d.inertiaActive = false;
        }
      };
      if (d.rafId) cancelAnimationFrame(d.rafId);
      d.rafId = requestAnimationFrame(tick);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`hobby-card group ${dragging ? "is-dragging" : ""} ${dismissed ? "is-mounted" : ""}`}
      style={{
        // left/top 用 transform 写（见 applyTransform），这里先给 0 作为 fallback
        left: 0,
        top: 0,
        width: "min(92%, 390px)",
        zIndex: dragging ? 9999 : zTop,
        ["--specimen" as string]: `"${specimenId}"`,
        ["--strata-color" as string]: hobby.strataColor,
        animationDelay: `${0.07 * index}s`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* ===== 顶部「岩层走向缝」手柄条：斜纹层理 + 走向/倾向标签 ===== */}
      <div className="hobby-card__strata-handle" aria-hidden>
        <span className="hobby-card__strata-label hobby-card__strata-label--left">
          STRIKE · 走向
        </span>
        <Compass className="hobby-card__strata-icon" strokeWidth={1.8} />
        <span className="hobby-card__strata-label hobby-card__strata-label--right">
          DIP · 倾向
        </span>
      </div>

      {/* 岩层色角带：左上一个小三角色标（B蓝/A绿/S金），呼应成就章分层 */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-0 h-0 z-10"
        style={{
          borderTop: "22px solid var(--strata-color)",
          borderRight: "22px solid transparent",
          filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.25))",
        }}
      />

      {/* 标本光晕：对应爱好的地质色，只在 hover 变亮（不破坏整体地质暗色） */}
      <div
        className="pointer-events-none absolute -top-16 -left-16 w-52 h-52 rounded-full bg-gradient-to-br opacity-[0.18] blur-3xl group-hover:opacity-[0.32] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, var(--strata-color), transparent 60%)`,
        }}
      />

      <div className="relative px-5 pt-7 pb-6 md:px-6 md:pt-8 md:pb-7">
        {/* ===== 头：图标 + 标本编号 + 年份 + 强度 ===== */}
        <div className="relative flex items-start justify-between gap-4 mb-5">
          <div
            className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, var(--strata-color), rgba(17,19,17,0.9))`,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: `0 10px 22px -10px var(--strata-color), inset 0 1px 0 rgba(255,255,255,0.18)`,
            }}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.22em] text-white/50 font-mono mb-2">
              {hobby.years}
            </div>
            <IntensityDots n={hobby.intensity} accent={hobby.strataColor} />
          </div>
        </div>

        <h3 className="relative text-white text-xl md:text-2xl font-semibold mb-1 tracking-[-0.015em]">
          {hobby.title}
        </h3>
        <p
          className={`relative text-xs md:text-sm tracking-wide font-medium mb-4`}
          style={{
            color: hobby.strataColor,
            textShadow: `0 0 10px ${hobby.strataColor}33`,
          }}
        >
          {hobby.tagline}
        </p>
        <p className="relative text-white/72 text-sm md:text-[15px] leading-[1.9]">
          {hobby.description}
        </p>

        {/* ===== 脚：标本编号印章（地质博物馆 "SPECIMEN H-0X"） ===== */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2 text-[10px] text-white/45 tracking-[0.28em] uppercase font-mono">
            <GeologyMap className="w-3.5 h-3.5 text-white/55" strokeWidth={1.8} />
            <span>Core · Hobby Tray · {total} Specimens</span>
          </div>
          <div
            className="hobby-card__specimen-seal"
            style={{
              borderColor: hobby.strataColor,
              color: hobby.strataColor,
              boxShadow: `inset 0 0 0 1px ${hobby.strataColor}55, 0 0 14px ${hobby.strataColor}22`,
            }}
          >
            <div className="hobby-card__specimen-seal__top">SPECIMEN · 标本</div>
            <div className="hobby-card__specimen-seal__num">{specimenId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * （单页版）Chapter 03 · 个人爱好
 */
export default function HobbiesPage() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const initialLayout = useMemo(
    () => buildStackedLayout(HOBBIES.length, isMobile),
    [isMobile],
  );
  // z 栈：按下的那张置顶
  const [zTop, setZTop] = useState<number[]>(() =>
    initialLayout.map((_, i) => 20 + i),
  );
  const bringToFront = (i: number) =>
    setZTop((prev) => {
      const next = prev.slice();
      const max = Math.max(...next);
      next[i] = max + 1;
      return next;
    });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <header className="mb-14 md:mb-20 pt-4 md:pt-8 hero-anim hero-reveal">
        <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5">
          Chapter · 03
        </span>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1] mb-5" style={{ letterSpacing: "-0.04em" }}>
          个人<span className="font-playfair italic text-[#ffb988]">爱好</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
          代码之外是什么让我保持热情？这些事情不一定有产出，但它们塑造了我的节奏感。
        </p>
      </header>

      {/* ===== 岩芯观察台：BAS 三色地质边框 + 罗盘刻度 + 缩小版（max-w-5xl，不再撑满） ===== */}
      <section className="mb-16 md:mb-20 hero-anim hero-fade">
        <div ref={arenaRef} className="hobby-arena max-w-5xl mx-auto">
          {/* 罗盘刻度（SVG 作为背景）+ 边框渐变 */}
          <div className="hobby-arena__compass-frame" aria-hidden />
          <div className="hobby-arena__label">
            <Compass className="inline w-3.5 h-3.5 -mt-0.5 mr-2" strokeWidth={2} />
            Core Tray · 岩芯标本观察台 No.03
          </div>
          <div className="hobby-arena__hint font-playfair italic">
            ✦ Arrange specimens freely within the tray · 在观察台内随意摆布标本
          </div>
          {/* 地质 BAS 色参考条 */}
          <div className="hobby-arena__strata-bar" aria-hidden>
            <span style={{ background: "#5f78a0" }} />
            <span style={{ background: "#6b8e5a" }} />
            <span style={{ background: "#a89466" }} />
            <span style={{ background: "#e8702a" }} />
          </div>

          {HOBBIES.map((hobby, i) => (
            <HobbyCard
              key={hobby.title}
              hobby={hobby}
              index={i}
              total={HOBBIES.length}
              init={initialLayout[i]}
              arenaRef={arenaRef}
              zTop={zTop[i]}
              onBringToFront={() => bringToFront(i)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl p-8 md:p-12 bg-white/8 backdrop-blur-xl border border-white/20">
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-5">
          Hachi · Lifestyle Credo
        </p>
        <blockquote className="font-playfair italic text-white text-2xl md:text-3xl leading-snug max-w-3xl">
          「认真的爱好，是另一种形式的专业。」
        </blockquote>
        <div className="mt-8 flex flex-wrap gap-3">
          {["玩得深", "看得广", "做得久", "爱得真"].map((t) => (
            <span
              key={t}
              className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm"
            >
              #{t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
