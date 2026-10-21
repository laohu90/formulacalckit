# 📐 Pythagorean Theorem Calculator (勾股定理计算器)

> Professional Right Triangle Hypotenuse & Radical Solver ($a^2 + b^2 = c^2$)  
> Fully Bilingual (English / 简体中文) · SEO Optimized for Google Search Traffic · Clean Minimalist White Aesthetic

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8)](https://tailwindcss.com/)

An advanced, SEO-optimized web application for solving right triangles, simplifying square roots into exact radical forms (e.g. $2\sqrt{5}$, $3\sqrt{2}$), exploring Pythagorean triples, and understanding geometric proofs.

---

## 🌟 Key Features / 核心功能

### 1. 🧮 Two-Side to Third-Side Solver (输入两边求第三边)
- **Find Hypotenuse $c$**: $c = \sqrt{a^2 + b^2}$
- **Find Leg $a$**: $a = \sqrt{c^2 - b^2}$
- **Find Leg $b$**: $b = \sqrt{c^2 - a^2}$
- Real-time geometric validation (enforces $c > a$ and $c > b$).

### 2. ⚡ Automated Simplest Radical Simplification (自动最简二次根式化简)
- Prime factorization engine extracts perfect square factors:
  - $(3, 3) \implies 3\sqrt{2}$
  - $(2, 4) \implies 2\sqrt{5}$
  - $(1, 1) \implies \sqrt{2}$
  - $(3, 4) \implies 5$ (exact integer)
- Rationalizes fractional denominators (e.g. $\frac{\sqrt{3}}{2}$).
- Displays exact radical form, original radicand, and configurable decimal precision (2, 4, 6, 8 places).

### 3. 📝 Complete Step-by-Step Mathematical Derivations (完整逐步推导)
- Step 1: Formula Selection
- Step 2: Substitution of Known Dimensions
- Step 3: Arithmetic & Square Operations
- Step 4: Prime Factorization & Radical Reduction
- Step 5: Final Conclusion with One-Click Copy

### 4. 📐 Dynamic SVG Geometric Diagram (交互式几何图示)
- Live proportional right triangle rendering.
- Right-angle square marker at vertex $C$ (90°).
- Interactive toggle for altitude on hypotenuse ($h_c$) and acute angles ($\alpha$ and $\beta$).
- Dimension pills for area ($S = \frac{1}{2}ab$), perimeter ($P = a+b+c$), altitude ($h_c = \frac{ab}{c}$), and circumradius ($R = \frac{c}{2}$).

### 5. 🔍 Pythagorean Triples Explorer (勾股数速查与生成器)
- Searchable database of primitive and derived triples (e.g. 3-4-5, 5-12-13, 7-24-25, 8-15-17).
- Triple Validator: input any 3 integers to test $a^2 + b^2 = c^2$.
- Euclid’s Formula Generator: $a = m^2 - n^2, b = 2mn, c = m^2 + n^2$.

### 6. 📐 Special Right Triangles Guide (特殊直角三角形速查)
- 45°-45°-90° Isosceles Right Triangle ($1 : 1 : \sqrt{2}$)
- 30°-60°-90° Special Triangle ($1 : \sqrt{3} : 2$)
- Live ratio calculator and one-click injection into main solver.

### 7. 🌐 Full Bilingual Architecture & Google SEO (双语架构与SEO优化)
- **Default Language**: English (`en`), with one-click intelligent toggle to Chinese (`zh`).
- Auto-syncs document `<title>`, `<meta name="description">`, `<meta name="keywords">`, and `html lang`.
- Schema.org structured data (`WebApplication` & `FAQPage` JSON-LD) for Google SERP Rich Snippets.

---

## 🚀 Quick Start / 快速开始

```bash
# Clone the repository
git clone https://github.com/laohu90/pythagorean-calculator.git
cd pythagorean-calculator

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License © 2026
