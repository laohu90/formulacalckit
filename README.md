# 📐 勾股定理计算器 (Pythagorean Theorem Calculator)

> 几何入门第一大刚需 · 在线直角三角形求斜边与最简根号形式 ($a^2 + b^2 = c^2$)

一款专为初高中数学、工程制图与日常计算设计的专业勾股定理在线计算器。支持输入直角三角形任意两边求第三边，自动输出最简二次根式与精确小数，并提供详尽的逐步解题过程推导与勾股数检索表。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8)

---

## ✨ 核心特性

- **🔢 输入两边智能求第三边**
  - **求斜边 $c$**：$c = \sqrt{a^2 + b^2}$
  - **求直角边 $a$**：$a = \sqrt{c^2 - b^2}$
  - **求直角边 $b$**：$b = \sqrt{c^2 - a^2}$
- **⚡ 自动最简二次根号化简（独家算法）**
  - 自动分解质因数并提取完全平方因子，如：
    - 输入 $3, 3 \implies 3\sqrt{2}$
    - 输入 $2, 4 \implies 2\sqrt{5}$
    - 输入 $1, 1 \implies \sqrt{2}$
    - 输入 $3, 4 \implies 5$（完全平方数自动开方）
  - 支持分数有理化分母，如 $\frac{\sqrt{3}}{2}$。
- **📝 详尽逐步解题过程（Step-by-Step）**
  - 公式选择 $\rightarrow$ 代入数值 $\rightarrow$ 算术平方运算 $\rightarrow$ 根号因数分解过程 $\rightarrow$ 最终精确与近似结论。
  - 支持一键复制解题过程到剪贴板。
- **📐 动态 SVG 直角三角形图示**
  - 等比动态缩放三角形，实时标注边长 $a, b, c$、直角 90° 标记与锐角 $\alpha, \beta$。
  - 可自由切换高线（$h_c$）与角度标注。
- **📊 全量几何属性一览**
  - 面积 $S = \frac{1}{2}ab$
  - 周长 $P = a + b + c$
  - 斜边上的高 $h_c = \frac{ab}{c}$
  - 锐角 $\alpha, \beta$（度数及弧度）
  - 外接圆半径 $R = \frac{c}{2}$
- **🔍 勾股数在线查询与生成验证器**
  - 常用经典勾股数检索表（可按边长搜索、按本原组筛选，一键代入计算）。
  - 勾股数验证器（输入任意三数，秒测是否满足 $a^2 + b^2 = c^2$）。
  - 欧几里得公式生成器（输入 $m > n > 0$ 生成专属勾股数）。
- **📐 特殊直角三角形速查**
  - 45°-45°-90° 等腰直角三角形（$1 : 1 : \sqrt{2}$）
  - 30°-60°-90° 特殊三角形（$1 : \sqrt{3} : 2$）
- **🚀 Google SEO 深度优化**
  - 语义化 HTML5 标签体系，集成 `WebApplication` 与 `FAQPage` Schema.org JSON-LD 结构化数据，利于 Google SERP 抓取和 Rich Snippets 展开卡片呈现。

---

## 🛠️ 本地运行与开发

```bash
# 1. 克隆代码仓库
git clone https://github.com/laohu90/pythagorean-calculator.git
cd pythagorean-calculator

# 2. 安装依赖项
npm install

# 3. 启动本地开发服务器
npm run dev

# 4. 构建生产版本
npm run build
```

---

## 📄 开源许可

本项目遵循 MIT License 开源协议。
