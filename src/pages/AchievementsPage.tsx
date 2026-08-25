import {
  Award,
  Trophy,
  Star,
  Target,
  Flame,
  BookOpen,
  GraduationCap,
  Shield,
  type LucideIcon,
} from "lucide-react";

interface Achievement {
  title: string;
  org: string;
  date: string;
  description: string;
  icon: LucideIcon;
  tier: "S" | "A" | "B";
  tags: string[];
}

const ACHIEVEMENTS: Achievement[] = [
  // ===== 浅层 · 成长沉积层（B · 成长级）— 最上面的岩层 =====
  { title: "成就收集计划 · 开启", org: "Portfolio 里程碑", date: "2026 · 8月", description: "把自己的成果正式整理成作品集网站：地质主题 + 光标聚光灯效果，让每一层成就都能被清晰看到。", icon: Award, tier: "B", tags: ["作品集", "里程碑"] },
  { title: "南海桂城中学 毕业", org: "全日制高中", date: "2023 - 2026", description: "完成三年全日制高中学业，打下扎实理科与综合素养基础，在校期间持续深耕计算机与创作领域的自学探索。", icon: Shield, tier: "B", tags: ["高中", "理科"] },

  // ===== 中层 · 精英积淀层（A · 精英级）— 中间的岩层 =====
  { title: "校园合伙人 · 星辰科技", org: "校园合作计划", date: "2026 · 夏季", description: "加入星辰科技校园合伙人，作为校园代表参与 AI 技术的落地方案探索与合作推广，拓展技术视野与行业资源。", icon: Star, tier: "A", tags: ["校园合作", "AI 推广"] },
  { title: "华南农业大学都柏林国际学院 录取", org: "本科 26 届新生", date: "2026 · 入学", description: "以高考生身份顺利进入华南农业大学都柏林国际学院，接受中英双学位国际化培养，聚焦前沿科技方向。", icon: BookOpen, tier: "A", tags: ["学历", "国际合作办学"] },
  { title: "AI 创作累计 1000+ 作品", org: "个人创作集", date: "累积", description: "使用 AI 绘图工具产出超过千张不同风格的图像作品，熟练掌握风格化控制、人物一致性、角色与场景组合等进阶技巧。", icon: Flame, tier: "A", tags: ["AI 创作", "提示词工程"] },

  // ===== 深层 · 殿堂核心层（S · 殿堂级）— 最下面的岩层 =====
  { title: "高级 AI 训练师认证", org: "阿里巴巴达摩院 · 官方认证", date: "2026 · 7月", description: "系统完成大模型训练、微调、提示词工程、数据标注与评估全流程考核，获得官方颁发的高级认证资质。", icon: GraduationCap, tier: "S", tags: ["AI", "官方认证", "高级"] },
  { title: "《边境保卫战》独立完成", org: "个人独立项目", date: "2026 · 夏季", description: "从零设计并实现完整坦克对战网页游戏：8 个实战关卡 + 新兵训练、现代军事 UI、技能树、成就体系与双结局剧情。", icon: Trophy, tier: "S", tags: ["游戏开发", "Canvas", "全栈"] },
  { title: "《雾湖冰精传》东方 STG", org: "个人独立项目", date: "2026 · 暑期", description: "东方 Project 风格纵向卷轴弹幕射击游戏：多层弹幕算法（自机狙/环形弹/放射弹/激光）、多阶段 Boss、Spell Card 击破记录、残机 + Bomb 经典系统。", icon: Target, tier: "S", tags: ["STG", "弹幕算法", "游戏设计"] },
];

// 地层分组（B 成长级在上 → A 精英级在中 → S 殿堂级在下）
const STRATA: {
  tier: Achievement["tier"];
  layerLabel: string;
  layerSubtitle: string;
  grainColor: string; // 岩层纹理主色（与 TIER_STYLES 呼应）
}[] = [
  {
    tier: "B",
    layerLabel: "Stratum · B · 浅层沉积",
    layerSubtitle: "成长沉积层 — 最初的砾石与沙，一切开始在这里沉积、压实、成岩。",
    grainColor: "#5f78a0",
  },
  {
    tier: "A",
    layerLabel: "Stratum · A · 中层积淀",
    layerSubtitle: "精英积淀层 — 压力与时间让矿物结晶，能力在一次次尝试中显影。",
    grainColor: "#6b8e5a",
  },
  {
    tier: "S",
    layerLabel: "Stratum · S · 深层核心",
    layerSubtitle: "殿堂核心层 — 地层最深处，高温高压之下锻造出的稀有化石与矿脉。",
    grainColor: "#a89466",
  },
];

const TIER_STYLES: Record<Achievement["tier"], { label: string; text: string; border: string; bg: string }> = {
  S: { label: "S · 殿堂级", text: "text-[#ffd980]", border: "border-[#a89466]", bg: "bg-gradient-to-br from-[#a89466]/30 to-[#a89466]/10" },
  A: { label: "A · 精英级", text: "text-[#6b8e5a]", border: "border-[#6b8e5a]", bg: "bg-gradient-to-br from-[#6b8e5a]/25 to-[#6b8e5a]/8" },
  B: { label: "B · 成长级", text: "text-[#8fa4c2]", border: "border-[#5f78a0]", bg: "bg-gradient-to-br from-[#5f78a0]/22 to-[#5f78a0]/6" },
};

/**
 * （单页版）Chapter 04 · 个人成就
 */
export default function AchievementsPage() {
  return (
    <div className="pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <header className="mb-14 md:mb-20 pt-4 md:pt-8 hero-anim hero-reveal">
        <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5">
          Chapter · 04
        </span>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1] mb-5" style={{ letterSpacing: "-0.04em" }}>
          个人<span className="font-playfair italic text-[#ffb988]">成就</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
          这些是地层里被发掘出来的化石——每一块都代表着一段专注投入的时光。
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-14 md:mb-20">
        {[
          { num: "8", label: "里程碑成就", accent: "text-[#ffd980]" },
          { num: "3", label: "S 级 · 殿堂级", accent: "text-[#a89466]" },
          { num: "2", label: "完整独立游戏", accent: "text-[#e8702a]" },
          { num: "∞", label: "还在继续累积", accent: "text-[#6b8e5a]" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5 md:p-6 bg-white/8 backdrop-blur-xl border border-white/20 text-center hero-anim hero-fade"
            style={{ animationDelay: `${0.08 * i}s` }}
          >
            <div className={`text-4xl md:text-5xl font-bold ${stat.accent} font-mono mb-2`}>
              {stat.num}
            </div>
            <div className="text-white/65 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#5f78a0]/50 via-[#6b8e5a]/40 to-[#a89466]/60 -translate-x-1/2" />

        <div className="space-y-10 md:space-y-14">
          {STRATA.map((stratum) => {
            const tierStyle = TIER_STYLES[stratum.tier];
            const tierItems = ACHIEVEMENTS.filter((a) => a.tier === stratum.tier);
            // 计算这一层的起始索引，保证左右交替在全局看来连续
            const startIdx = ACHIEVEMENTS.findIndex((a) => a.tier === stratum.tier);
            return (
              <div key={stratum.tier} className="relative">
                {/* 地层分界带：顶部的岩层纹 + Stratum 标签 */}
                <div className="relative mb-8 md:mb-10">
                  {/* 岩层细纹带（10 条不等宽水平线表现沉积层理） */}
                  <div className="relative h-14 md:h-16 overflow-hidden rounded-2xl border border-white/10">
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        background: `repeating-linear-gradient(\n                          to bottom,\n                          ${stratum.grainColor} 0px,\n                          ${stratum.grainColor} 2px,\n                          transparent 2px,\n                          transparent 9px\n                        ),\n                        repeating-linear-gradient(\n                          100deg,\n                          rgba(255,255,255,0.06) 0px,\n                          rgba(255,255,255,0.06) 1px,\n                          transparent 1px,\n                          transparent 22px\n                        )`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(\n                          to right,\n                          ${stratum.grainColor}22 0%,\n                          ${stratum.grainColor}0d 40%,\n                          ${stratum.grainColor}22 100%\n                        )`,
                      }}
                    />
                    {/* Stratum 标签：左侧英文大字 + 右侧中文说明 */}
                    <div className="relative z-10 h-full flex items-center justify-between px-5 md:px-8 gap-4">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: `${stratum.grainColor}99`,
                            background: `${stratum.grainColor}22`,
                          }}
                        >
                          <span
                            className={`font-bold font-mono text-xl md:text-2xl ${tierStyle.text}`}
                          >
                            {stratum.tier}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs md:text-sm font-mono tracking-[0.25em] uppercase ${tierStyle.text} truncate`}
                          >
                            {stratum.layerLabel}
                          </div>
                          <div
                            className={`text-[11px] md:text-xs font-semibold mt-0.5 inline-block px-2 py-0.5 rounded-full border ${tierStyle.text} ${tierStyle.border} bg-black/25`}
                          >
                            {tierStyle.label}
                          </div>
                        </div>
                      </div>
                      <p className="hidden sm:block text-right text-white/60 text-xs md:text-sm max-w-md leading-relaxed">
                        {stratum.layerSubtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 这一层的成就卡片们 */}
                <div className="space-y-6 md:space-y-10">
                  {tierItems.map((a, localI) => {
                    const Icon = a.icon;
                    const globalI = startIdx + localI;
                    const tier = TIER_STYLES[a.tier];
                    const isLeft = globalI % 2 === 0;
                    return (
                      <div
                        key={a.title}
                        className={`relative md:grid md:grid-cols-2 md:gap-10 items-start hero-anim hero-fade`}
                        style={{ animationDelay: `${0.08 * globalI}s` }}
                      >
                        <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white/60 bg-black z-10 items-center justify-center">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              a.tier === "S"
                                ? "bg-[#a89466]"
                                : a.tier === "A"
                                ? "bg-[#6b8e5a]"
                                : "bg-[#5f78a0]"
                            }`}
                          />
                        </div>

                        <div
                          className={`${
                            isLeft ? "md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"
                          }`}
                        >
                          <article
                            className={`rounded-2xl p-6 md:p-7 backdrop-blur-xl border border-white/20 ${tier.bg} hover:border-white/40 transition-all`}
                          >
                            <div
                              className={`flex items-start gap-4 mb-4 ${
                                isLeft ? "md:flex-row-reverse md:text-right" : ""
                              }`}
                            >
                              <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                              </div>
                              <div className={`flex-1 ${isLeft ? "md:order-first" : ""}`}>
                                <div
                                  className={`inline-block text-[11px] tracking-widest font-mono font-semibold px-2.5 py-1 rounded-full border mb-2 ${tier.text} ${tier.border} bg-black/20`}
                                >
                                  {tier.label}
                                </div>
                                <h3 className="text-white text-lg md:text-xl font-semibold leading-snug">
                                  {a.title}
                                </h3>
                              </div>
                            </div>

                            <div
                              className={`flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-white/55 mb-3 ${
                                isLeft ? "md:justify-end" : ""
                              }`}
                            >
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" /> {a.org}
                              </span>
                              <span>{a.date}</span>
                            </div>

                            <p className="text-white/75 text-sm md:text-[15px] leading-relaxed mb-4">
                              {a.description}
                            </p>

                            <div
                              className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}
                            >
                              {a.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 text-white/70 border border-white/10"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </article>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 md:mt-20 rounded-3xl p-8 md:p-12 bg-white/8 backdrop-blur-xl border border-white/20">
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-4">
          Up · Next Layer
        </p>
        <blockquote className="font-playfair italic text-white text-2xl md:text-3xl leading-snug max-w-3xl">
          「每一个徽章背后，都是一段没有人看到的深夜时光。」
        </blockquote>
      </section>
    </div>
  );
}
