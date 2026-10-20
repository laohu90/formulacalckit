import { WorkerSubsiteTool, QuickSolverId } from "../types";

export interface ResolvedToolMetadata {
  title: string;
  formula: string;
  category: string;
  desc: string;
  icon: string;
  quickSolverId?: QuickSolverId;
}

/**
 * Intelligent Dynamic Subdomain Knowledge Base & Semantic Resolver
 * Automatically infers proper bilingual titles, KaTeX math formulas,
 * verified categories, icons, and professional descriptions for any newly added subdomain!
 */
export function resolveDynamicToolMetadata(
  site: WorkerSubsiteTool,
  lang: "en" | "zh"
): ResolvedToolMetadata {
  const sub = (site.subdomain || "").toLowerCase().trim();

  // 1. Sector Area & Arc Length Calculator
  if (sub.includes("sector") || sub.includes("arc-length") || sub.includes("arc_length")) {
    return {
      title: lang === "zh" ? "扇形面积与弧长计算器 (Sector Calculator)" : "Sector Area & Arc Length Calculator",
      formula: "S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr",
      category: "Geometry",
      desc: lang === "zh"
        ? "扇形面积公式与弧长在线求解，支持圆心角度数/弧度制互逆推导、周长计算与圆锥侧面展开图。"
        : "Compute sector area, arc length, central angle, and perimeter with step-by-step derivations in degrees and radians.",
      icon: "🥧",
    };
  }

  // 1.5 Linear System Solver (2x2)
  if (sub.includes("linear-system") || sub.includes("system-solver") || sub.includes("linear_system")) {
    return {
      title: lang === "zh" ? "二元一次方程组求解器 (Linear System)" : "Linear System Solver (2x2)",
      formula: "\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}",
      category: "Algebra",
      desc: lang === "zh"
        ? "二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简、2D函数图象交点可视化。"
        : "Step-by-step 2x2 linear system solver with substitution & elimination methods, exact fractions, and 2D graph intersection.",
      icon: "🧮",
      };
  }

  // 2. Linear Function & Line Equation Calculator
  if (sub.includes("linear") || sub.includes("line-equation") || sub.includes("slope-intercept")) {
    return {
      title: lang === "zh" ? "一次函数解析式生成器 (Linear Function)" : "Linear Function & Line Equation Calculator",
      formula: "y = kx + b",
      category: "Algebra",
      desc: lang === "zh"
        ? "输入两个已知坐标点秒出斜率k、截距b、解析式、一般式及坐标轴交点，支持分数精度与动态坐标图像。"
        : "Find line equation from two points with slope k, intercept b, standard form Ax+By+C=0, and interactive 2D graph.",
      icon: "📈",
    };
  }

  // 3. Pythagorean Theorem Calculator
  if (sub.includes("pythagorean") || sub.includes("pythagoras") || sub.includes("hypotenuse")) {
    return {
      title: lang === "zh" ? "勾股定理计算器 (Pythagorean Calculator)" : "Pythagorean Theorem Calculator",
      formula: "a^2 + b^2 = c^2",
      category: "Geometry",
      desc: lang === "zh"
        ? "直角三角形求斜边或直角边，支持最简二次根式化简（如 2√5）、逐步几何证明与勾股数查询。"
        : "Solve right triangle hypotenuse or legs with automatic radical simplification (e.g. 2√5) and triples table.",
      icon: "📐",
      quickSolverId: "pythagorean",
    };
  }

  // 4. Quadratic Equation Solver
  if (sub.includes("quadratic") || sub.includes("parabola")) {
    return {
      title: lang === "zh" ? "一元二次方程求解器 (Quadratic Solver)" : "Quadratic Equation Solver",
      formula: "ax^2 + bx + c = 0",
      category: "Algebra",
      desc: lang === "zh"
        ? "快速解一元二次方程，输出实根与复数虚根、判别式 Δ、抛物线顶点坐标及十字相乘配方步骤。"
        : "Find real and complex roots, discriminant Δ, vertex coordinates, and step-by-step factoring or formula solutions.",
      icon: "🔢",
      };
  }

  // 5. MathBridge Formula Editor
  if (sub.includes("mathbridge") || sub.includes("latex") || sub.includes("omml")) {
    return {
      title: lang === "zh" ? "数学公式排版工具 (MathBridge)" : "MathBridge Formula Typography Tool",
      formula: "\\sum, \\int, \\frac{d}{dx}",
      category: "Academic",
      desc: lang === "zh"
        ? "LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览与导出。"
        : "Academic math formula editor and converter supporting LaTeX, Word OMML, MathML, and instant typography formatting.",
      icon: "📝",
    };
  }

  // 6. Circle & Sphere Geometry
  if (sub.includes("circle") || sub.includes("sphere")) {
    return {
      title: lang === "zh" ? "圆与球体几何计算器 (Circle & Sphere)" : "Circle & Sphere Geometry Calculator",
      formula: "A = \\pi r^2, V = \\frac{4}{3}\\pi r^3",
      category: "Geometry",
      desc: lang === "zh"
        ? "输入半径、直径或面积任意一个值，立即精确求解圆周长、圆面积、球表面积与球体体积。"
        : "Solve circle area, circumference, diameter, and 3D sphere surface area and volume from any single metric.",
      icon: "⚪",
      quickSolverId: "circle",
    };
  }

  // 7. Trigonometry Solver
  if (sub.includes("trig") || sub.includes("sin") || sub.includes("cos")) {
    return {
      title: lang === "zh" ? "三角函数与直角边比值计算器 (Trigonometry)" : "Trigonometric Functions & Ratios",
      formula: "\\sin^2\\theta + \\cos^2\\theta = 1",
      category: "Trigonometry",
      desc: lang === "zh"
        ? "计算正弦、余弦、正切、余切及反三角函数值，支持角度（Degree）与弧度（Radian）双向切换。"
        : "Compute sine, cosine, tangent, and inverse trig functions in both degrees and radians.",
      icon: "🧭",
      quickSolverId: "trigonometry",
    };
  }

  // 8. Ohm's Law & Physics
  if (sub.includes("ohm") || sub.includes("power") || sub.includes("circuit")) {
    return {
      title: lang === "zh" ? "欧姆定律与电功率计算器 (Ohm's Law)" : "Ohm's Law & Electric Power Calculator",
      formula: "V = I \\cdot R, P = V \\cdot I",
      category: "Physics",
      desc: lang === "zh"
        ? "物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算。"
        : "Compute voltage, current, electrical resistance, and dissipated power with automatic unit conversion.",
      icon: "⚡",
      quickSolverId: "ohms_law",
    };
  }

  // 9. Percentage & Growth
  if (sub.includes("percent") || sub.includes("discount") || sub.includes("growth")) {
    return {
      title: lang === "zh" ? "百分比与变化率计算器 (Percentage)" : "Percentage & Growth Rate Calculator",
      formula: "\\Delta\\% = \\frac{V_2 - V_1}{V_1} \\times 100\\%",
      category: "Finance",
      desc: lang === "zh"
        ? "精准计算增长率、折扣后价格、利润率与基数占比，适用于日常财务与学术运算。"
        : "Calculate percentage increase/decrease, margin, discount, and proportional ratios.",
      icon: "📊",
      quickSolverId: "percentage",
    };
  }

  // 10. Compound Interest
  if (sub.includes("interest") || sub.includes("compound") || sub.includes("investment")) {
    return {
      title: lang === "zh" ? "复利投资收益计算器 (Compound Interest)" : "Compound Interest Growth Calculator",
      formula: "A = P(1 + r/n)^{nt}",
      category: "Finance",
      desc: lang === "zh"
        ? "计算本金按固定利率经过周期复利后的终值与累计净利息，直观展示复利增长曲线。"
        : "Forecast long-term investment growth, compounding frequencies, and accumulated interest over time.",
      icon: "💰",
    };
  }

  // 11. Calculus / Derivative / Integral
  if (sub.includes("calculus") || sub.includes("derivative") || sub.includes("integral") || sub.includes("limit")) {
    return {
      title: lang === "zh" ? "微积分导数与极值求解器 (Calculus)" : "Calculus Derivative & Limit Solver",
      formula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}",
      category: "Calculus",
      desc: lang === "zh"
        ? "函数求导、求极限、切线方程与高阶微商步骤推导，支持多项式与三角函数微积分。"
        : "Step-by-step derivative and limit solver with chain rule, product rule, and tangent slope.",
      icon: "∫",
    };
  }

  // 12. Matrix & Linear Algebra
  if (sub.includes("matrix") || sub.includes("determinant") || sub.includes("eigen")) {
    return {
      title: lang === "zh" ? "矩阵与线性代数计算器 (Matrix Solver)" : "Matrix & Linear Algebra Calculator",
      formula: "|A|, A^{-1}, Ax = b",
      category: "Algebra",
      desc: lang === "zh"
        ? "高斯消元求逆矩阵、行列式值计算、特征值特征向量及线性方程组求解。"
        : "Matrix multiplication, determinant, inverse, eigenvalues, and linear equation systems.",
      icon: "▦",
    };
  }

  // Dynamic Fallback: Clean Title-Cased Name
  const formattedName = sub
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const cleanTitle = site.title && site.title !== site.title.toUpperCase()
    ? site.title
    : `${formattedName} (公式计算工具)`;

  const cleanDesc = site.desc && !site.desc.includes("Scientific Calculation Tool") && site.desc.length > 10
    ? site.desc
    : (lang === "zh"
      ? "高精度科学与数学在线计算器，支持输入参数即时求解与分步推导解析。"
      : "High-precision online calculator with instant solving and step-by-step formula analysis.");

  return {
    title: cleanTitle,
    formula: site.category === "Physics" ? "E = mc^2" : "f(x) = \\text{Result}",
    category: site.category && site.category !== "Tools" ? site.category : "Mathematics",
    desc: cleanDesc,
    icon: site.icon || "🧮",
  };
}
