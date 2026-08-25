import {
  Code2,
  Bot,
  Gamepad2,
  Palette,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  tags: string[];
}

interface SkillGroup {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "语言 & 框架",
    subtitle: "构建一切的基础砖",
    icon: Code2,
    accent: "from-[#6b8e5a] to-[#3d5a3e]",
    skills: [
      { name: "JavaScript / TypeScript", level: 85, tags: ["React", "Vite", "Node"] },
      { name: "HTML5 & CSS3", level: 92, tags: ["Tailwind", "响应式", "动画"] },
      { name: "Python", level: 72, tags: ["数据处理", "脚本"] },
    ],
  },
  {
    title: "AI & 训练工程",
    subtitle: "与模型对话的手艺",
    icon: Bot,
    accent: "from-[#a89466] to-[#6e5f3d]",
    skills: [
      { name: "提示词工程", level: 95, tags: ["CoT", "角色扮演", "结构化输出"] },
      { name: "大模型微调 & RLHF", level: 75, tags: ["LoRA", "数据合成"] },
      { name: "TRAE 智能开发", level: 90, tags: ["多轮协作", "游戏项目"] },
      { name: "数据标注与评估", level: 82, tags: ["质量指标", "A/B 测试"] },
    ],
  },
  {
    title: "游戏 & 引擎",
    subtitle: "用代码把想象变成体验",
    icon: Gamepad2,
    accent: "from-[#e8702a] to-[#9f4a14]",
    skills: [
      { name: "Canvas 2D 渲染", level: 88, tags: ["坦克战", "STG弹幕"] },
      { name: "弹幕算法 & 碰撞检测", level: 82, tags: ["自机狙", "环形弹"] },
      { name: "关卡 & Boss 设计", level: 78, tags: ["难度曲线", "Spell Card"] },
      { name: "游戏 UI / HUD 设计", level: 85, tags: ["现代军事", "极简玻璃态"] },
    ],
  },
  {
    title: "创作 & 视觉",
    subtitle: "审美决定上限",
    icon: Palette,
    accent: "from-[#a04848] to-[#5f2626]",
    skills: [
      { name: "AI 绘图", level: 88, tags: ["Higgs", "SDXL", "风格一致性"] },
      { name: "动漫视频剪辑", level: 75, tags: ["Premiere", "AE 特效"] },
      { name: "UI 审美与色彩", level: 85, tags: ["低饱和军绿", "黑金风格"] },
    ],
  },
];

function SkillBar({ level, accent }: { level: number; accent: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${accent} rounded-full transition-all duration-[1.2s] ease-out`}
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

/**
 * （单页版）Chapter 02 · 个人技能
 */
export default function SkillsPage() {
  return (
    <div className="pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <header className="mb-14 md:mb-20 pt-4 md:pt-8 hero-anim hero-reveal">
        <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5">
          Chapter · 02
        </span>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1] mb-5" style={{ letterSpacing: "-0.04em" }}>
          个人<span className="font-playfair italic text-[#ffb988]">技能</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
          这些是我的工具箱——每一把都磨过很多次，越用越称手。技能条不是终点，而是当前刻度。
        </p>
      </header>

      <div className="space-y-6 md:space-y-8">
        {SKILL_GROUPS.map((group, gi) => {
          const Icon = group.icon;
          return (
            <section
              key={group.title}
              className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 bg-white/8 backdrop-blur-xl border border-white/20 hero-anim hero-fade"
              style={{ animationDelay: `${0.1 * gi}s` }}
            >
              <div className="flex items-start gap-4 md:gap-5 mb-8 pb-6 border-b border-white/10">
                <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${group.accent} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-white text-xl md:text-2xl font-semibold mb-1">
                    {group.title}
                  </h2>
                  <p className="text-white/55 text-sm">{group.subtitle}</p>
                </div>
                <div className="hidden sm:flex items-end gap-1 text-right">
                  <Sparkles className="w-4 h-4 text-[#e8702a] mb-1" />
                  <span className="text-xs text-white/50 tracking-wider font-mono">
                    {group.skills.length} SKILLS
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-7">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-baseline justify-between mb-2 gap-4">
                      <h3 className="text-white font-medium text-base md:text-lg truncate">
                        {skill.name}
                      </h3>
                      <span
                        className={`font-mono text-sm font-semibold bg-gradient-to-r ${group.accent} bg-clip-text text-transparent whitespace-nowrap`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <SkillBar level={skill.level} accent={group.accent} />
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {skill.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/70 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-14 md:mt-20 rounded-2xl bg-black/60 border border-white/15 p-5 md:p-7 font-mono text-sm backdrop-blur">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-[#a04848]" />
          <span className="w-3 h-3 rounded-full bg-[#a89466]" />
          <span className="w-3 h-3 rounded-full bg-[#6b8e5a]" />
          <span className="ml-3 text-white/40 text-xs">hachi@portfolio — zsh</span>
        </div>
        <div className="space-y-2 text-white/80">
          <p>
            <span className="text-[#6b8e5a]">hachi</span>
            <span className="text-white/50"> in </span>
            <span className="text-[#a89466]">~/portfolio</span>
            <span className="text-white/50"> on </span>
            <span className="text-[#e8702a]">git:main</span>
          </p>
          <p>
            <span className="text-[#e8702a]">$</span>{" "}
            <span>hachi --still-learning</span>
            <Terminal className="inline w-4 h-4 ml-1 animate-pulse text-white" />
          </p>
          <p className="text-white/55 pl-5">✓ 保持每天打磨一件工具的节奏……</p>
        </div>
      </section>
    </div>
  );
}
