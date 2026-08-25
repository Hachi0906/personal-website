import {
  Gamepad2,
  Camera,
  Music2,
  BookOpen,
  Mountain,
  Film,
  Rocket,
  Flower2,
  type LucideIcon,
} from "lucide-react";

interface Hobby {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  years: string;
  intensity: number;
}

const HOBBIES: Hobby[] = [
  { title: "独立游戏开发", tagline: "一个人就是一支队伍", description: "从零设计到代码落地，享受把脑海里的场景变成玩家可以实际游玩的体验。坦克战、东方 STG，每一款都是完整的世界观练习。", icon: Gamepad2, gradient: "from-[#e8702a] to-[#9f4a14]", years: "2025 - 至今", intensity: 5 },
  { title: "动漫视频剪辑", tagline: "节奏就是一切", description: "把喜欢的番剧素材剪在一起，练的是节奏感、叙事感和对BGM卡点的肌肉记忆。出片不一定发，但每一帧都要自己满意。", icon: Film, gradient: "from-[#a04848] to-[#5f2626]", years: "2023 - 至今", intensity: 4 },
  { title: "AI 绘图探索", tagline: "把脑中的画面描述出来", description: "研究提示词的语法、风格化控制、人物与场景的一致性。地质风、军事风、东方少女风，每种风格都是一套新的语言。", icon: Camera, gradient: "from-[#a89466] to-[#6e5f3d]", years: "2025 - 至今", intensity: 5 },
  { title: "音乐聆听", tagline: "写代码的背景音绝不将就", description: "游戏OST、爵士Lo-Fi、后摇、古风……不同的任务需要不同的声场。坦克战写战斗系统时一定是燃曲，写UI时一定是钢琴Lo-Fi。", icon: Music2, gradient: "from-[#6b8e5a] to-[#3d5a3e]", years: "∞", intensity: 5 },
  { title: "阅读 & 科幻", tagline: "让想象力有地方落脚", description: "偏爱硬科幻与地质学纪实——板块构造的尺度、文明轮回的尺度，读完总会觉得自己做的事情也能放进更大的坐标系里。", icon: BookOpen, gradient: "from-[#5f78a0] to-[#37455f]", years: "从小开始", intensity: 4 },
  { title: "徒步 & 自然观察", tagline: "真的去踩一踩地层", description: "代码之外喜欢往山里跑，看真实的岩层断面、溪流冲刷的痕迹、路边的矿石。有时候对「真实世界」的理解会反哺设计的质感。", icon: Mountain, gradient: "from-[#6b8e5a] to-[#2c4a2d]", years: "季节性", intensity: 3 },
  { title: "折腾新项目", tagline: "点子永远比时间多", description: "看到一个新的框架、一个新的AI能力，第一件事就是想「能做什么小玩具」。原型做了一大堆，能活下来的才是真爱好。", icon: Rocket, gradient: "from-[#e8702a] to-[#6b4423]", years: "Weekends", intensity: 5 },
  { title: "植物 & 手作", tagline: "慢节奏的疗愈时间", description: "对着屏幕久了就去看阳台上的植物，偶尔做点手工小物。需要这种「不产生数据、只产生感受」的活动来保持情绪的平衡。", icon: Flower2, gradient: "from-[#6b8e5a] to-[#476038]", years: "日常", intensity: 3 },
];

function IntensityDots({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= n ? "bg-[#e8702a] shadow-[0_0_6px_#e8702a]" : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * （单页版）Chapter 03 · 个人爱好
 */
export default function HobbiesPage() {
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
        {HOBBIES.map((hobby, i) => {
          const Icon = hobby.icon;
          return (
            <article
              key={hobby.title}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/8 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hero-anim hero-fade"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <div
                className={`pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br ${hobby.gradient} opacity-[0.18] blur-3xl group-hover:opacity-[0.32] transition-opacity`}
              />

              <div className="relative flex items-start justify-between gap-4 mb-5">
                <div
                  className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${hobby.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                </div>
                <div className="text-right">
                  <div className="text-[11px] tracking-wider text-white/50 font-mono mb-2">
                    {hobby.years}
                  </div>
                  <IntensityDots n={hobby.intensity} />
                </div>
              </div>

              <h3 className="relative text-white text-xl md:text-2xl font-semibold mb-1">
                {hobby.title}
              </h3>
              <p
                className={`relative text-xs md:text-sm tracking-wide font-medium bg-gradient-to-r ${hobby.gradient} bg-clip-text text-transparent mb-4`}
              >
                {hobby.tagline}
              </p>
              <p className="relative text-white/70 text-sm md:text-[15px] leading-relaxed">
                {hobby.description}
              </p>
            </article>
          );
        })}
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
