import { ScrollButton, ScrollCardLink } from "../App";

/**
 * （单页版）章节总览：欢迎 Hero + 4 张章节入口卡 + 引言横幅
 *  - 之前用 <Link to="/skills"> 这类路由跳转的地方，全部改成 scrollIntoView 锚点按钮
 */
export default function OverviewPage() {
  return (
    <div className="pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Hero 标题区 */}
      <section className="mb-16 md:mb-24 pt-4 md:pt-8 hero-anim hero-reveal">
        <div className="max-w-4xl">
          <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5">
            Welcome · Hachi Portfolio
          </span>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] mb-6" style={{ letterSpacing: "-0.05em" }}>
            探索我的
            <span className="block font-playfair italic mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ffb988] to-[#e8702a]">
              岩层世界
            </span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
            每一段经历都像一层沉积岩，在时间中堆叠、凝结，最终成为脚下的大地。
            用光标拨开地层，让我带你看看构成我的所有层面。
          </p>
          <div className="flex gap-3 sm:gap-4 flex-wrap mt-10">
            <ScrollButton
              to="skills"
              className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              查看我的技能 →
            </ScrollButton>
            <ScrollButton
              to="contact"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-white/20 transition-all"
            >
              与我联系
            </ScrollButton>
          </div>
        </div>
      </section>

      {/* 快捷入口卡片网格 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-24">
        {[
          { title: "个人技能", desc: "语言、框架、工具链，我能驾驭的技术栈。", to: "skills", tag: "02" },
          { title: "个人爱好", desc: "代码之外，让生命丰盈的那些热情。", to: "hobbies", tag: "03" },
          { title: "个人成就", desc: "每一枚徽章，都是地层里的一枚化石。", to: "achievements", tag: "04" },
          { title: "联系方式", desc: "合作、邀约，或只是想打个招呼？", to: "contact", tag: "05" },
        ].map((card, i) => (
          <ScrollCardLink
            key={card.to}
            to={card.to}
            className="w-full group relative p-6 md:p-7 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#e8702a]/20 hero-anim hero-fade"
            style={{ animationDelay: `${0.12 * i}s` }}
          >
            <div className="text-[11px] tracking-[0.2em] text-[#e8702a]/80 font-mono mb-4">
              CHAPTER · {card.tag}
            </div>
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 group-hover:text-[#ffb988] transition-colors">
              {card.title}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              {card.desc}
            </p>
            <div className="text-white/80 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-[#ffb988]">
              进入章节 <span>→</span>
            </div>
          </ScrollCardLink>
        ))}
      </section>

      {/* 引言横幅 */}
      <section className="rounded-3xl p-8 md:p-12 bg-white/8 backdrop-blur-xl border border-white/20 text-center">
        <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4">
          Layers hold tales of time
        </p>
        <blockquote className="font-playfair italic text-white text-2xl md:text-4xl leading-snug max-w-3xl mx-auto">
          「岩层之下，岁月成书。你愿意读我的第几页？」
        </blockquote>
      </section>

      {/* 左下段落 + 开始探索 */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 items-end">
        <div>
          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-md">
            每一层沉积都记录着地球的篇章，从远古海床到飘散的火山灰，
            在我们脚下层层叠叠跨越数百万年。而我，也正在书写属于自己的地层。
          </p>
        </div>
        <div className="sm:text-right">
          <ScrollButton
            to="achievements"
            className="inline-block bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
          >
            开始探索
          </ScrollButton>
        </div>
      </section>
    </div>
  );
}
