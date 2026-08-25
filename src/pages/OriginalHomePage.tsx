import { ArrowRight } from "lucide-react";
import { ScrollButton } from "../App";

/**
 * （单页版）Chapter 01 · 主页全屏 Hero
 *  保留：Chapter · 01 / 左下段落 / 右下「开始探索 →」按钮
 *  移除："岩层之下 / 岁月成书" 大标题 / 「我们的交互式地图…」说明段落（此前已修改）
 *  「开始探索」滚动到章节总览 #overview
 */
export default function OriginalHomePage() {
  return (
    // 注意：main 容器已经统一加了 pt-[88px] 做导航栏避让，这里继续保持顶部排版 pt-0 让 Hero 紧贴导航栏下方
    <div className="pt-0 pb-20 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <section className="min-h-[calc(100dvh-8rem)] flex flex-col justify-end pb-12 md:pb-20 hero-anim hero-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="md:col-span-7 lg:col-span-6">
            <span className="inline-block text-xs md:text-sm tracking-[0.25em] uppercase text-[#e8702a] font-semibold mb-5 md:mb-6">
              Chapter · 01
            </span>

            {/* ====== 醒目标识 MACHANG：Playfair 衬线白字 + 入场推出（MA 一行 / CHANG 起新行左对齐，整体往右挪避免贴左边缘） ====== */}
            <div className="machang-wrap inline-flex flex-col select-none cursor-default mb-7 md:mb-9 ml-3 sm:ml-6 md:ml-10 lg:ml-16">
              {/* 第一行：MA（2 字母，索引 0 / 1） */}
              <div className="block leading-[1]">
                {"MA".split("").map((ch, localIdx) => {
                  const i = localIdx;
                  return (
                    <span
                      key={`row1-${i}`}
                      className={`machang-char mc-${i} font-playfair italic font-semibold text-white leading-none`}
                      style={{
                        /* 参照 Hachi (Playfair italic) + 尺寸：mobile 48px / md 74px / lg 100px / xl 120px */
                        fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
                        /* 入场逐字延迟：从左至右 0.25s 开始，每字 0.08s 推出 */
                        animationDelay: `${0.25 + i * 0.08}s`,
                        /* 字间距：0.03em 给 Playfair 大字足够呼吸感 */
                        marginLeft: i === 0 ? 0 : "0.03em",
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </div>
              {/* 第二行：CHANG（5 字母，索引 2 / 3 / 4 / 5 / 6）—— 左对齐第一行 MA，取消之前的错落缩进 */}
              <div className="block leading-[1] mt-2 md:mt-3 ml-0">
                {"CHANG".split("").map((ch, localIdx) => {
                  const i = 2 + localIdx;
                  return (
                    <span
                      key={`row2-${i}`}
                      className={`machang-char mc-${i} font-playfair italic font-semibold text-white leading-none`}
                      style={{
                        fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
                        /* 承接上一行的逐字时间轴：M A 2 字 0.25 + 0.33 → C 接着 0.41 开始 */
                        animationDelay: `${0.25 + i * 0.08}s`,
                        marginLeft: i === 2 ? 0 : "0.03em",
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </div>
            </div>

            <p className="text-white/90 text-[15px] md:text-lg leading-[1.9] md:leading-[2] max-w-xl">
              每一层<span className="text-[#ffb988] font-medium">沉积岩</span>都记得它曾是哪片海、
              哪阵风；<br className="hidden md:block" />
              每一段<span className="font-playfair italic text-[#f3ddb4]">代码与像素</span>的纹理也一样。
              <br className="hidden md:block" />
              这里记录的，是我<span className="text-[#c9ddb0]">凿开岩层</span>、
              逐层拾起的一些细碎故事与作品。
            </p>
          </div>

          <div className="md:col-span-5 lg:col-span-6 md:justify-self-end flex md:justify-end">
            <ScrollButton
              to="overview"
              className="group inline-flex items-center gap-3 bg-[#e8702a] text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold shadow-[0_18px_40px_-12px_rgba(232,112,42,0.65)] hover:bg-[#d5601f] transition-colors"
            >
              开始探索
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
              </span>
            </ScrollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
