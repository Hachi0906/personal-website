import { scrollToId } from "../App";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Github,
  BookOpen,
  Gamepad2,
  Send,
  type LucideIcon,
} from "lucide-react";

interface Channel {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
  copyable?: boolean;
}

const CHANNELS: Channel[] = [
  { label: "电子邮件", value: "2976234897@qq.com", hint: "最稳妥的方式，工作日 24h 内回复", icon: Mail, accent: "from-[#e8702a] to-[#9f4a14]", copyable: true },
  { label: "微信", value: "hachi0906", hint: "加好友请备注来意，比如「合作 · 项目名」", icon: MessageCircle, accent: "from-[#6b8e5a] to-[#3d5a3e]", copyable: true },
  { label: "所在坐标", value: "广东 · 佛山 / 广州", hint: "在校期间可接受线下合作与校园活动", icon: MapPin, accent: "from-[#5f78a0] to-[#37455f]" },
  { label: "响应时段", value: "工作日 19:00 - 23:00 · 周末全天", hint: "上课时间消息可能会延迟回复，见谅", icon: Clock, accent: "from-[#a89466] to-[#6e5f3d]" },
];

const SOCIALS = [
  { label: "作品集 / 项目", value: "查看项目页", icon: BookOpen, target: "achievements" as const },
  { label: "游戏 Demo", value: "边境保卫战 / 雾湖冰精传", icon: Gamepad2, target: "hobbies" as const },
  { label: "开源仓库", value: "即将上线", icon: Github, target: null as null },
];

/**
 * （单页版）Chapter 05 · 联系方式
 */
export default function ContactPage() {
  return (
    <div className="pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <header className="mb-14 md:mb-20 pt-4 md:pt-8 hero-anim hero-reveal">
        <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5">
          Chapter · 05
        </span>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-[1] mb-5" style={{ letterSpacing: "-0.04em" }}>
          联系<span className="font-playfair italic text-[#ffb988]">方式</span>
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
          无论是合作、邀约，还是你也喜欢地质 / 独立游戏 / AI 创作想一起聊聊？
          我很乐意收到你的消息。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-16 md:mb-24">
        <section className="lg:col-span-3 space-y-5 md:space-y-6">
          {CHANNELS.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <article
                key={ch.label}
                className="group rounded-2xl p-5 md:p-6 bg-white/8 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all hero-anim hero-fade"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div
                    className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${ch.accent} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
                        {ch.label}
                      </h3>
                      {ch.copyable && (
                        <button
                          onClick={() => navigator.clipboard?.writeText(ch.value)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                        >
                          一键复制
                        </button>
                      )}
                    </div>
                    <p className="text-white text-lg md:text-xl font-semibold font-mono truncate mb-2">
                      {ch.value}
                    </p>
                    <p className="text-white/60 text-sm">{ch.hint}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="lg:col-span-2">
          <form
            className="sticky top-28 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white/8 backdrop-blur-xl border border-white/20 hero-anim hero-fade"
            style={{ animationDelay: "0.25s" }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("留言已发出（Demo 模式，真正的表单需要后端接口哦）");
            }}
          >
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8702a] to-[#9f4a14] flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-lg font-semibold">发一条消息给我</h2>
                <p className="text-white/55 text-xs">工作日内我会尽快回你</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs tracking-wider uppercase mb-2">
                  你的称呼
                </label>
                <input
                  type="text"
                  required
                  placeholder="怎么称呼你？"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder:text-white/35 focus:border-[#e8702a] focus:ring-2 focus:ring-[#e8702a]/30 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-wider uppercase mb-2">
                  联系方式
                </label>
                <input
                  type="text"
                  required
                  placeholder="邮箱 / 微信，我好回复你"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder:text-white/35 focus:border-[#e8702a] focus:ring-2 focus:ring-[#e8702a]/30 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-wider uppercase mb-2">
                  留言内容
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="想跟我聊什么？合作、游戏、AI、随便聊聊都可以～"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 text-white placeholder:text-white/35 focus:border-[#e8702a] focus:ring-2 focus:ring-[#e8702a]/30 outline-none transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                发送留言
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* 其它入口：点击卡片平滑滚动到对应章节 */}
      <section className="rounded-3xl p-8 md:p-10 bg-white/8 backdrop-blur-xl border border-white/20">
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">其它入口</h3>
        <p className="text-white/60 text-sm mb-7">
          想先看看我做过的东西，再决定要不要联系？从下面进去逛逛吧～
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            const content = (
              <>
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#e8702a]/20 transition-colors">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/55 text-xs tracking-wider uppercase mb-1">
                    {s.label}
                  </div>
                  <p className="text-white text-sm font-medium truncate group-hover:text-[#ffb988] transition-colors">
                    {s.value}
                  </p>
                </div>
              </>
            );
            const className =
              "group flex items-center gap-4 p-5 rounded-2xl bg-black/30 border border-white/15 hover:border-[#e8702a]/60 transition-all w-full text-left";
            if (s.target) {
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => scrollToId(s.target!)}
                  className={className}
                >
                  {content}
                </button>
              );
            }
            return (
              <div key={s.label} className={className + " cursor-default"}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 md:mt-20 text-center max-w-2xl mx-auto">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-5">
          End of the Layers
        </p>
        <blockquote className="font-playfair italic text-white text-2xl md:text-3xl leading-snug">
          「岩层最底下，永远还会有下一层。」
        </blockquote>
        <p className="text-white/45 text-sm mt-6">
          © {new Date().getFullYear()} Hachi · made with love, code & a lot of coffee.
        </p>
      </section>
    </div>
  );
}
