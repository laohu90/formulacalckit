import { WorkerSubsiteTool, QuickSolverId } from '../types';

export interface ResolvedToolMetadata {
  title: string;
  formula: string;
  category: string;
  desc: string;
  icon: string;
  quickSolverId?: QuickSolverId;
  tags?: string[];
}

/**
 * Tier 1: Canonical Master Registry
 * Exact match by subdomain slug has the absolute highest priority.
 * This completely eliminates substring collisions (such as quadratic-discriminant vs quadratic).
 */
export const EXACT_TOOL_REGISTRY: Record<string, {
  titleZh: string;
  titleEn: string;
  formula: string;
  categoryZh: string;
  categoryEn: string;
  descZh: string;
  descEn: string;
  icon: string;
  quickSolverId?: QuickSolverId;
  tags: string[];
}> = {
  // 1. Completing the Square
  'completing-the-square-calculator': {
    titleZh: '配方法一元二次方程计算器',
    titleEn: 'Completing the Square Calculator',
    formula: 'a(x - h)^2 + k = 0',
    categoryZh: '代数与方程',
    categoryEn: 'Algebra',
    descZh: '一元二次方程配方法分步详解器，将一般式秒转顶点式，提供5步标准代数配方推导与几何面积块图示。',
    descEn: 'Comprehensive step-by-step Completing the Square calculator, quadratic equation solver, vertex form converter, and geometric algebra tile visualization.',
    icon: '🔲',
    tags: ['配方法', '顶点式', '一元二次方程', '二次函数', '抛物线顶点', 'completing the square', 'vertex form', 'algebra', 'quadratic'],
  },

  // 2. GCD & LCM Calculator
  'gcd-calculator': {
    titleZh: '最大公约数与最小公倍数计算器 (GCD/LCM)',
    titleEn: 'GCD & LCM Calculator',
    formula: '\\gcd(a, b), \\operatorname{lcm}(a, b)',
    categoryZh: '算术与代数',
    categoryEn: 'Mathematics',
    descZh: '在线最大公约数(GCD)与最小公倍数(LCM)计算器，支持辗转相除法、短除法、质因数分解与更相减损法完整步骤演示。',
    descEn: 'Calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM) with Euclidean algorithm, classic ladder division, and prime factorization.',
    icon: '🔢',
    tags: ['最大公约数', '最小公倍数', 'GCD', 'LCM', '辗转相除法', '短除法', '质因数分解', 'arithmetic', 'greatest common divisor'],
  },

  // 3. Density Calculator
  'density-calculator': {
    titleZh: '密度计算公式工具 (ρ = m/V)',
    titleEn: 'Density Calculator (ρ = m/V)',
    formula: '\\rho = \\frac{m}{V}',
    categoryZh: '物理与工程',
    categoryEn: 'Physics',
    descZh: '高精度密度科学在线计算器，支持质量、体积与密度三者互求，提供内置物质密度表、科学单位换算与浮力解析。',
    descEn: 'High-precision density calculator supporting mass, volume, and density solving with standard SI unit conversion and substance table.',
    icon: '⚖️',
    tags: ['密度', '质量', '体积', 'ρ=m/V', '浮力', '单位换算', '物理公式', 'density', 'mass', 'volume', 'physics'],
  },

  // 4. Fraction Calculator
  'fraction-calculator': {
    titleZh: '分数计算器 (四则混合运算与通分)',
    titleEn: 'Fraction Calculator (Add, Subtract, Multiply, Divide)',
    formula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
    categoryZh: '算术与代数',
    categoryEn: 'Mathematics',
    descZh: '分数四则混合运算、最简分数约分化简、假分数与带分数转换及通分步骤推导，支持高精度有理数运算。',
    descEn: 'Fraction addition, subtraction, multiplication, division, mixed numbers conversion, and exact reduction with step-by-step guidance.',
    icon: '➗',
    tags: ['分数计算器', '约分', '通分', '带分数', '最简分数', '有理数', 'fraction', 'simplification', 'mixed fraction'],
  },

  // 5. Linear Function & Line Equation
  'linear-function-calculator': {
    titleZh: '一次函数解析式生成器 (两点求直线方程)',
    titleEn: 'Linear Function & Line Equation Calculator',
    formula: 'y = kx + b',
    categoryZh: '代数与函数',
    categoryEn: 'Algebra',
    descZh: '输入两个已知坐标点秒出斜率k、截距b、解析式y=kx+b与一般式Ax+By+C=0，支持分数精度与动态2D坐标图像。',
    descEn: 'Find line equation from two points with slope k, intercept b, standard form Ax+By+C=0, and interactive 2D graph.',
    icon: '📈',
    tags: ['一次函数', '直线方程', '斜率', '截距', '两点求直线', 'y=kx+b', '初中代数', 'linear function', 'slope'],
  },

  // 6. Linear System Solver (2x2)
  'linear-system-solver': {
    titleZh: '二元一次方程组求解器 (2x2 方程组)',
    titleEn: 'Linear System Solver (2x2)',
    formula: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    categoryZh: '代数与方程',
    categoryEn: 'Algebra',
    descZh: '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简、2D函数图象交点可视化与无解/无穷解判定。',
    descEn: 'Step-by-step 2x2 linear system solver with substitution & elimination methods, exact fractions, and 2D graph intersection.',
    icon: '🧮',
    tags: ['二元一次方程组', '消元法', '代入法', '加减消元', '方程组求解', 'linear system', 'simultaneous equations'],
  },

  // 7. MathBridge Typography
  'mathbridge': {
    titleZh: '数学公式排版工具 (MathBridge LaTeX)',
    titleEn: 'MathBridge Formula Typography Tool',
    formula: '\\LaTeX \\rightarrow \\text{MathML} / \\text{Word}',
    categoryZh: '学术与排版',
    categoryEn: 'Academic',
    descZh: 'LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览与一键导出。',
    descEn: 'Academic math formula editor and converter supporting LaTeX, Word OMML, MathML, and instant typography formatting.',
    icon: '📝',
    tags: ['LaTeX', 'MathML', 'Word OMML', '公式排版', '公式编辑', '公式转换', '论文公式', 'mathbridge', 'typography'],
  },

  // 8. Ohm's Law & Electric Power
  'ohms-law-calculator': {
    titleZh: '欧姆定律与电功率计算器',
    titleEn: "Ohm's Law & Electric Power Calculator",
    formula: 'V = I \\cdot R,\\quad P = V \\cdot I',
    categoryZh: '物理与工程',
    categoryEn: 'Physics',
    descZh: '物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算与常用电路推导。',
    descEn: 'Compute voltage, current, electrical resistance, and dissipated power with automatic unit conversion (mA, kΩ, mW).',
    icon: '⚡',
    quickSolverId: 'ohms_law',
    tags: ['欧姆定律', '电压', '电流', '电阻', '功率', '电功率', '电路', 'ohms law', 'voltage', 'current', 'physics'],
  },

  // 9. Pythagorean Theorem
  'pythagorean-calculator': {
    titleZh: '勾股定理计算器 (直角三角形斜边求解)',
    titleEn: 'Pythagorean Theorem Calculator',
    formula: 'a^2 + b^2 = c^2',
    categoryZh: '几何与图形',
    categoryEn: 'Geometry',
    descZh: '直角三角形求斜边或直角边，支持最简二次根式化简（如 2√5）、逐步几何证明与勾股数查询。',
    descEn: 'Calculate missing hypotenuse or legs with exact radical simplification, step-by-step mathematical proofs, and triples table.',
    icon: '📐',
    quickSolverId: 'pythagorean',
    tags: ['勾股定理', '直角三角形', '斜边', '直角边', '根号化简', '勾股数', 'pythagorean', 'triangle', 'hypotenuse'],
  },

  // 10. Quadratic Discriminant
  'quadratic-discriminant-calculator': {
    titleZh: '一元二次方程判别式计算器 (Δ 判别式)',
    titleEn: 'Quadratic Discriminant Calculator (Delta Δ)',
    formula: '\\Delta = b^2 - 4ac',
    categoryZh: '代数与方程',
    categoryEn: 'Algebra',
    descZh: '快速求解判别式 Δ = b² - 4ac，精确判断实根、双重实根或共轭虚根性质，提供抛物线图象开口与顶点坐标分析。',
    descEn: 'Free quadratic discriminant calculator (Δ = b² - 4ac). Find root nature (two real, one double, or complex), complete the square step-by-step, and view parabola graph.',
    icon: '🔍',
    tags: ['判别式', 'Delta', 'Δ=b²-4ac', '根的判别式', '虚根', '实根', '抛物线', 'discriminant', 'delta', 'quadratic'],
  },

  // 11. Quadratic Equation Solver / Vieta's formulas
  'quadratic-equation-solver': {
    titleZh: '韦达定理与二次方程分步计算器',
    titleEn: "Vieta's Formulas & Quadratic Equation Calculator",
    formula: 'x_1 + x_2 = -\\frac{b}{a},\\quad x_1 x_2 = \\frac{c}{a}',
    categoryZh: '代数与方程',
    categoryEn: 'Algebra',
    descZh: '在线韦达定理与根与系数关系推导，支持已知两根反推二次方程、对称式求值（x₁²+x₂²）及十字相乘分步求解。',
    descEn: "Free online Vieta's formulas and quadratic equation calculator. Features step-by-step completing the square, roots-to-equation derivation, symmetric expressions, and visualizer.",
    icon: '📊',
    tags: ['韦达定理', '根与系数的关系', '对称式', '反推方程', '十字相乘', '因式分解', 'Vieta', 'roots', 'quadratic'],
  },

  // 12. Standard Quadratic Solver
  'quadratic-solver': {
    titleZh: '一元二次方程极速求解器',
    titleEn: 'Quadratic Equation Solver',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    categoryZh: '代数与方程',
    categoryEn: 'Algebra',
    descZh: '快速解一元二次方程，输出实根与复数虚根、判别式 Δ、顶点坐标及十字相乘/配方过程与求根公式解析。',
    descEn: 'Find real and complex roots, discriminant Δ, vertex coordinates, and step-by-step factoring or quadratic formula solutions.',
    icon: '🔢',
    quickSolverId: 'quadratic',
    tags: ['一元二次方程', '二次方程', '求根公式', '判别式', '十字相乘', '配方法', 'quadratic equation', 'roots'],
  },

  // 13. Sector & Arc Length
  'sector-calculator': {
    titleZh: '扇形面积与弧长计算器',
    titleEn: 'Sector Area & Arc Length Calculator',
    formula: 'S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr',
    categoryZh: '几何与图形',
    categoryEn: 'Geometry',
    descZh: '扇形面积公式与弧长在线求解，支持圆心角度数/弧度制互逆推导、周长计算与圆锥侧面展开图。',
    descEn: 'Calculate sector area, arc length, central angle, and perimeter with step-by-step derivations in degrees and radians.',
    icon: '🥧',
    tags: ['扇形面积', '弧长计算器', '圆心角', '扇形公式', '圆锥侧面积', '初中几何', 'sector area', 'arc length', 'geometry'],
  },

  // 14. Math Comprehensive Suite (from wildcard server)
  'math': {
    titleZh: '数学综合计算与公式工具箱',
    titleEn: 'Comprehensive Mathematics Suite',
    formula: 'f(x) = \\int g(x)\\,dx',
    categoryZh: '通用数学',
    categoryEn: 'Mathematics',
    descZh: '全功能数学公式综合求解与推导平台，涵盖基础代数、微积分、几何定理与高精度科学计算。',
    descEn: 'Comprehensive math and scientific formula platform supporting algebra, calculus, geometry, and high-precision computing.',
    icon: '🧮',
    tags: ['数学综合', '公式计算器', '代数', '几何', '微积分', 'math', 'algebra', 'calculus'],
  },

  // Additional registered tools for future subdomains
  'circle-calculator': {
    titleZh: '圆与球体几何计算器',
    titleEn: 'Circle & Sphere Geometry Calculator',
    formula: 'A = \\pi r^2,\\quad V = \\frac{4}{3}\\pi r^3',
    categoryZh: '几何与图形',
    categoryEn: 'Geometry',
    descZh: '输入半径、直径或面积任意一个值，立即精确求解圆周长、圆面积、球表面积与球体体积。',
    descEn: 'Solve circle area, circumference, diameter, and 3D sphere surface area and volume from any single metric.',
    icon: '⚪',
    quickSolverId: 'circle',
    tags: ['圆', '球体', '圆面积', '圆周长', '球体积', '球表面积', 'circle', 'sphere'],
  },
  'trigonometry-calculator': {
    titleZh: '三角函数与直角边比值计算器',
    titleEn: 'Trigonometric Functions & Ratios',
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1',
    categoryZh: '三角函数',
    categoryEn: 'Trigonometry',
    descZh: '计算正弦、余弦、正切、余切及反三角函数值，支持角度（Degree）与弧度（Radian）双向切换。',
    descEn: 'Compute sine, cosine, tangent, and inverse trig functions in both degrees and radians.',
    icon: '🧭',
    quickSolverId: 'trigonometry',
    tags: ['三角函数', '正弦', '余弦', '正切', 'trigonometry', 'sine', 'cosine'],
  },
  'percentage-calculator': {
    titleZh: '百分比与变化率计算器',
    titleEn: 'Percentage & Growth Rate Calculator',
    formula: '\\Delta\\% = \\frac{V_2 - V_1}{V_1} \\times 100\\%',
    categoryZh: '实用与金融',
    categoryEn: 'Finance',
    descZh: '精准计算增长率、折扣后价格、利润率与基数占比，适用于日常财务与学术运算。',
    descEn: 'Calculate percentage increase/decrease, margin, discount, and proportional ratios.',
    icon: '📊',
    quickSolverId: 'percentage',
    tags: ['百分比', '增长率', '变化率', '折扣', 'percentage', 'growth'],
  },
  'compound-interest-calculator': {
    titleZh: '复利投资收益计算器',
    titleEn: 'Compound Interest Growth Calculator',
    formula: 'A = P(1 + r/n)^{nt}',
    categoryZh: '实用与金融',
    categoryEn: 'Finance',
    descZh: '计算本金按固定利率经过周期复利后的终值与累计净利息，直观展示复利增长曲线。',
    descEn: 'Forecast long-term investment growth, compounding frequencies, and accumulated interest over time.',
    icon: '💰',
    tags: ['复利', '利息', '本金', '年利率', 'compound interest', 'investment'],
  },
  'herons-formula-calculator': {
    titleZh: '海伦公式任意三角形面积计算器',
    titleEn: "Heron's Triangle Area Calculator",
    formula: 'A = \\sqrt{s(s-a)(s-b)(s-c)}',
    categoryZh: '几何与图形',
    categoryEn: 'Geometry',
    descZh: '只需已知三角形三条边长，无需测量高，自动校验两边之和大于第三边并输出精确面积。',
    descEn: 'Calculate the exact area of any triangle knowing only the lengths of its three sides.',
    icon: '📐',
    tags: ['海伦公式', '三角形面积', '三边求面积', 'heron formula', 'triangle'],
  },
  'kinematics-motion-calculator': {
    titleZh: '匀变速直线运动物理方程计算器',
    titleEn: 'Uniform Acceleration Kinematics',
    formula: 'v = v_0 + at,\\quad s = v_0 t + \\frac{1}{2}at^2',
    categoryZh: '物理与工程',
    categoryEn: 'Physics',
    descZh: '经典力学公式：计算初速度、末速度、加速度、位移与耗时，自带标准国际单位解析。',
    descEn: 'Solve initial velocity, final velocity, acceleration, displacement, and time with standard SI unit checks.',
    icon: '⚡',
    tags: ['匀变速直线运动', '初速度', '末速度', '加速度', '位移', 'kinematics', 'physics'],
  },
};

/**
 * Tier 2: Specificity-Ranked Rule Matcher
 * Ordered strictly by rule specificity (e.g. compound tokens first).
 * A longer composite pattern (e.g. 'quadratic-discriminant') will ALWAYS match before 'quadratic'.
 */
interface PatternRule {
  id: string;
  test: (sub: string) => boolean;
  priority: number;
  metadata: (lang: 'en' | 'zh') => ResolvedToolMetadata;
}

const SPECIFICITY_RULES: PatternRule[] = [
  // 1. Completing the square
  {
    id: 'completing-the-square',
    test: (s) => s.includes('completing') && s.includes('square'),
    priority: 100,
    metadata: (lang) => ({
      title: lang === 'zh' ? '配方法一元二次方程计算器' : 'Completing the Square Calculator',
      formula: 'a(x - h)^2 + k = 0',
      category: lang === 'zh' ? '代数与方程' : 'Algebra',
      desc: lang === 'zh'
        ? '一元二次方程配方法分步详解器，将一般式秒转顶点式，提供5步标准代数配方推导与几何面积块图示。'
        : 'Comprehensive step-by-step Completing the Square calculator, quadratic equation solver, and vertex form converter.',
      icon: '🔲',
    }),
  },

  // 2. Quadratic Discriminant
  {
    id: 'quadratic-discriminant',
    test: (s) => (s.includes('quadratic') && s.includes('discriminant')) || s.includes('discriminant') || s.includes('delta'),
    priority: 95,
    metadata: (lang) => ({
      title: lang === 'zh' ? '一元二次方程判别式计算器 (Δ 判别式)' : 'Quadratic Discriminant Calculator (Delta Δ)',
      formula: '\\Delta = b^2 - 4ac',
      category: lang === 'zh' ? '代数与方程' : 'Algebra',
      desc: lang === 'zh'
        ? '快速求解判别式 Δ = b² - 4ac，精确判断实根、双重实根或共轭虚根性质，提供抛物线图象开口与顶点坐标分析。'
        : 'Free quadratic discriminant calculator (Δ = b² - 4ac) to find root nature (two real, one double, or complex).',
      icon: '🔍',
    }),
  },

  // 3. Vieta's formulas / quadratic equation relations
  {
    id: 'quadratic-vieta',
    test: (s) => s.includes('vieta') || (s.includes('quadratic') && s.includes('equation')),
    priority: 90,
    metadata: (lang) => ({
      title: lang === 'zh' ? '韦达定理与二次方程分步计算器' : "Vieta's Formulas & Quadratic Equation Calculator",
      formula: 'x_1 + x_2 = -\\frac{b}{a},\\quad x_1 x_2 = \\frac{c}{a}',
      category: lang === 'zh' ? '代数与方程' : 'Algebra',
      desc: lang === 'zh'
        ? '在线韦达定理与根与系数关系推导，支持已知两根反推二次方程、对称式求值（x₁²+x₂²）及十字相乘分步求解。'
        : "Free online Vieta's formulas and quadratic equation calculator. Features roots-to-equation derivation and step-by-step factoring.",
      icon: '📊',
    }),
  },

  // 4. Linear System 2x2
  {
    id: 'linear-system',
    test: (s) => s.includes('linear-system') || s.includes('system-solver') || (s.includes('linear') && s.includes('system')),
    priority: 85,
    metadata: (lang) => ({
      title: lang === 'zh' ? '二元一次方程组求解器 (2x2)' : 'Linear System Solver (2x2)',
      formula: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
      category: lang === 'zh' ? '代数与方程' : 'Algebra',
      desc: lang === 'zh'
        ? '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简与2D函数图象交点可视化。'
        : 'Step-by-step 2x2 linear system solver with substitution & elimination methods and exact fractions.',
      icon: '🧮',
    }),
  },

  // 5. Linear Function / Slope-Intercept
  {
    id: 'linear-function',
    test: (s) => s.includes('linear') || s.includes('slope') || s.includes('line-equation'),
    priority: 80,
    metadata: (lang) => ({
      title: lang === 'zh' ? '一次函数解析式生成器' : 'Linear Function & Line Equation Calculator',
      formula: 'y = kx + b',
      category: lang === 'zh' ? '代数与函数' : 'Algebra',
      desc: lang === 'zh'
        ? '输入两个已知坐标点秒出斜率k、截距b、解析式y=kx+b与一般式，支持分数精度与动态坐标图像。'
        : 'Find line equation from two points with slope k, intercept b, standard form Ax+By+C=0, and 2D graph.',
      icon: '📈',
    }),
  },

  // 6. Sector & Arc Length
  {
    id: 'sector-arc',
    test: (s) => s.includes('sector') || s.includes('arc-length') || s.includes('arc_length'),
    priority: 75,
    metadata: (lang) => ({
      title: lang === 'zh' ? '扇形面积与弧长计算器' : 'Sector Area & Arc Length Calculator',
      formula: 'S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr',
      category: lang === 'zh' ? '几何与图形' : 'Geometry',
      desc: lang === 'zh'
        ? '扇形面积公式与弧长在线求解，支持圆心角度数/弧度制互逆推导、周长计算与圆锥侧面展开图。'
        : 'Calculate sector area, arc length, central angle, and perimeter with step-by-step derivations in degrees and radians.',
      icon: '🥧',
    }),
  },

  // 7. General Quadratic Solver
  {
    id: 'quadratic-general',
    test: (s) => s.includes('quadratic') || s.includes('parabola'),
    priority: 70,
    metadata: (lang) => ({
      title: lang === 'zh' ? '一元二次方程求解器' : 'Quadratic Equation Solver',
      formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      category: lang === 'zh' ? '代数与方程' : 'Algebra',
      desc: lang === 'zh'
        ? '快速解一元二次方程，输出实根与复数虚根、判别式 Δ、顶点坐标及十字相乘/配方过程。'
        : 'Find real and complex roots, discriminant Δ, vertex coordinates, and step-by-step factoring or formula solutions.',
      icon: '🔢',
      quickSolverId: 'quadratic',
    }),
  },

  // 8. GCD / LCM
  {
    id: 'gcd-lcm',
    test: (s) => s.includes('gcd') || s.includes('lcm') || s.includes('greatest-common') || s.includes('divisor'),
    priority: 68,
    metadata: (lang) => ({
      title: lang === 'zh' ? '最大公约数与最小公倍数计算器' : 'GCD & LCM Calculator',
      formula: '\\gcd(a, b), \\operatorname{lcm}(a, b)',
      category: lang === 'zh' ? '算术与代数' : 'Mathematics',
      desc: lang === 'zh'
        ? '在线最大公约数(GCD)与最小公倍数(LCM)计算器，支持短除法、辗转相除法与质因数分解详细步骤。'
        : 'Calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM) with Euclidean algorithm and ladder division.',
      icon: '🔢',
    }),
  },

  // 9. Density
  {
    id: 'density',
    test: (s) => s.includes('density') || s.includes('mass-volume'),
    priority: 65,
    metadata: (lang) => ({
      title: lang === 'zh' ? '密度计算公式工具' : 'Density Calculator',
      formula: '\\rho = \\frac{m}{V}',
      category: lang === 'zh' ? '物理与工程' : 'Physics',
      desc: lang === 'zh'
        ? '高精度密度科学在线计算器，支持质量、体积与密度三者互求，提供科学单位换算与分步推导解析。'
        : 'High-precision density calculator supporting mass, volume, and density solving with unit conversion.',
      icon: '⚖️',
    }),
  },

  // 10. Fraction
  {
    id: 'fraction',
    test: (s) => s.includes('fraction') || s.includes('rational'),
    priority: 65,
    metadata: (lang) => ({
      title: lang === 'zh' ? '分数计算器' : 'Fraction Calculator',
      formula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
      category: lang === 'zh' ? '算术与代数' : 'Mathematics',
      desc: lang === 'zh'
        ? '分数四则混合运算、最简分数化简、带分数转换与通分步骤推导，支持高精度有理数运算。'
        : 'Fraction addition, subtraction, multiplication, division, and exact reduction with step-by-step guidance.',
      icon: '➗',
    }),
  },

  // 11. Pythagorean
  {
    id: 'pythagorean',
    test: (s) => s.includes('pythagor') || s.includes('hypotenuse'),
    priority: 65,
    metadata: (lang) => ({
      title: lang === 'zh' ? '勾股定理计算器' : 'Pythagorean Theorem Calculator',
      formula: 'a^2 + b^2 = c^2',
      category: lang === 'zh' ? '几何与图形' : 'Geometry',
      desc: lang === 'zh'
        ? '直角三角形求斜边或直角边，支持最简二次根式化简（如 2√5）、逐步几何证明与勾股数查询。'
        : 'Solve right triangle hypotenuse or legs with automatic radical simplification (e.g. 2√5) and triples table.',
      icon: '📐',
      quickSolverId: 'pythagorean',
    }),
  },

  // 12. Ohm's Law
  {
    id: 'ohms-law',
    test: (s) => s.includes('ohm') || s.includes('circuit') || (s.includes('electric') && s.includes('power')),
    priority: 65,
    metadata: (lang) => ({
      title: lang === 'zh' ? '欧姆定律与电功率计算器' : "Ohm's Law & Electric Power Calculator",
      formula: 'V = I \\cdot R,\\quad P = V \\cdot I',
      category: lang === 'zh' ? '物理与工程' : 'Physics',
      desc: lang === 'zh'
        ? '物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算。'
        : 'Compute voltage, current, electrical resistance, and dissipated power with automatic unit conversion.',
      icon: '⚡',
      quickSolverId: 'ohms_law',
    }),
  },

  // 13. MathBridge / LaTeX
  {
    id: 'mathbridge',
    test: (s) => s.includes('mathbridge') || s.includes('latex') || s.includes('mathml') || s.includes('omml'),
    priority: 65,
    metadata: (lang) => ({
      title: lang === 'zh' ? '数学公式排版工具 (MathBridge)' : 'MathBridge Formula Typography Tool',
      formula: '\\LaTeX \\rightarrow \\text{MathML} / \\text{Word}',
      category: lang === 'zh' ? '学术与排版' : 'Academic',
      desc: lang === 'zh'
        ? 'LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览与导出。'
        : 'Academic math formula editor and converter supporting LaTeX, Word OMML, MathML, and instant typography formatting.',
      icon: '📝',
    }),
  },

  // 14. Matrix
  {
    id: 'matrix',
    test: (s) => s.includes('matrix') || s.includes('determinant') || s.includes('eigen'),
    priority: 60,
    metadata: (lang) => ({
      title: lang === 'zh' ? '矩阵与线性代数计算器' : 'Matrix & Linear Algebra Calculator',
      formula: 'A^{-1} = \\frac{1}{\\det(A)}\\operatorname{adj}(A)',
      category: lang === 'zh' ? '高等代数' : 'Algebra',
      desc: lang === 'zh'
        ? '支持矩阵加减乘除、求逆矩阵、行列式求值、特征值与秩的分解步骤运算。'
        : 'Matrix inversion, determinant, multiplication, eigenvalues, and rank computation with step-by-step guidance.',
      icon: '▦',
    }),
  },

  // 15. Statistics & Probability
  {
    id: 'statistics',
    test: (s) => s.includes('stat') || s.includes('prob') || s.includes('variance') || s.includes('deviation'),
    priority: 60,
    metadata: (lang) => ({
      title: lang === 'zh' ? '统计学与标准差计算器' : 'Statistics & Standard Deviation Calculator',
      formula: '\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\mu)^2}',
      category: lang === 'zh' ? '概率与统计' : 'Statistics',
      desc: lang === 'zh'
        ? '平均数、方差、标准差、中位数及正态分布概率计算，支持多组数据批量统计。'
        : 'Mean, variance, standard deviation, median, and normal distribution statistical calculator.',
      icon: '📊',
    }),
  },

  // 16. Calculus
  {
    id: 'calculus',
    test: (s) => s.includes('derivative') || s.includes('integral') || s.includes('calculus') || s.includes('limit'),
    priority: 60,
    metadata: (lang) => ({
      title: lang === 'zh' ? '微积分导数与积分计算器' : 'Calculus Derivative & Integral Solver',
      formula: '\\int f(x)\\,dx,\\quad \\frac{df}{dx}',
      category: lang === 'zh' ? '高等微积分' : 'Calculus',
      desc: lang === 'zh'
        ? '函数求导、定积分与不定积分、极限求解及切线方程推导，展示微积分公式分步过程。'
        : 'Step-by-step derivative, indefinite/definite integral, and limit solver with calculus rules.',
      icon: '∫',
    }),
  },
];

/**
 * Math keyword bilingual dictionary for unknown dynamic subdomains
 */
const MATH_TERM_DICTIONARY: Record<string, { zh: string; en: string }> = {
  matrix: { zh: '矩阵', en: 'Matrix' },
  determinant: { zh: '行列式', en: 'Determinant' },
  derivative: { zh: '导数', en: 'Derivative' },
  integral: { zh: '积分', en: 'Integral' },
  calculus: { zh: '微积分', en: 'Calculus' },
  limit: { zh: '极限', en: 'Limit' },
  vector: { zh: '向量', en: 'Vector' },
  geometry: { zh: '几何', en: 'Geometry' },
  triangle: { zh: '三角形', en: 'Triangle' },
  circle: { zh: '圆', en: 'Circle' },
  sphere: { zh: '球体', en: 'Sphere' },
  cylinder: { zh: '圆柱体', en: 'Cylinder' },
  cone: { zh: '圆锥', en: 'Cone' },
  area: { zh: '面积', en: 'Area' },
  perimeter: { zh: '周长', en: 'Perimeter' },
  volume: { zh: '体积', en: 'Volume' },
  angle: { zh: '角度', en: 'Angle' },
  trigonometry: { zh: '三角函数', en: 'Trigonometry' },
  sine: { zh: '正弦', en: 'Sine' },
  cosine: { zh: '余弦', en: 'Cosine' },
  tangent: { zh: '正切', en: 'Tangent' },
  algebra: { zh: '代数', en: 'Algebra' },
  polynomial: { zh: '多项式', en: 'Polynomial' },
  root: { zh: '求根', en: 'Roots' },
  power: { zh: '乘方/电功率', en: 'Power' },
  exponent: { zh: '指数', en: 'Exponent' },
  logarithm: { zh: '对数', en: 'Logarithm' },
  percentage: { zh: '百分比', en: 'Percentage' },
  ratio: { zh: '比率', en: 'Ratio' },
  discount: { zh: '折扣', en: 'Discount' },
  interest: { zh: '利息', en: 'Interest' },
  compound: { zh: '复利', en: 'Compound' },
  mortgage: { zh: '房贷', en: 'Mortgage' },
  velocity: { zh: '速度', en: 'Velocity' },
  acceleration: { zh: '加速度', en: 'Acceleration' },
  force: { zh: '力学', en: 'Force' },
  gravity: { zh: '万有引力', en: 'Gravity' },
  pressure: { zh: '压强', en: 'Pressure' },
  temperature: { zh: '温度换算', en: 'Temperature' },
  energy: { zh: '能量/功', en: 'Energy' },
  frequency: { zh: '频率', en: 'Frequency' },
  wavelength: { zh: '波长', en: 'Wavelength' },
  probability: { zh: '概率', en: 'Probability' },
  statistics: { zh: '统计', en: 'Statistics' },
  mean: { zh: '平均数', en: 'Mean' },
  median: { zh: '中位数', en: 'Median' },
  variance: { zh: '方差', en: 'Variance' },
  deviation: { zh: '标准差', en: 'Standard Deviation' },
  permutation: { zh: '排列', en: 'Permutation' },
  combination: { zh: '组合', en: 'Combination' },
};

/**
 * Intelligent Dynamic Subdomain Knowledge Base & Semantic Resolver
 * Solves "新增网页后数据串了" once and for all:
 * 1. Exact slug lookup (Tier 1) - absolute zero collision
 * 2. Specificity-ranked pattern matching (Tier 2) - compound tokens always precede general tokens
 * 3. Smart Semantic Synthesizer (Tier 3) - natural bilingual math parsing, never generic dummy text
 */
export function resolveDynamicToolMetadata(
  site: WorkerSubsiteTool,
  lang: 'en' | 'zh'
): ResolvedToolMetadata {
  const rawSub = (site.subdomain || '').toLowerCase().trim();
  // Strip potential domain parts if passed as full hostname
  const slug = rawSub.replace(/\.formulacalckit\.com$/, '').replace(/^https?:\/\//, '').trim();

  // ----------------------------------------------------
  // TIER 1: Exact Registry Match (Highest Precision)
  // ----------------------------------------------------
  if (EXACT_TOOL_REGISTRY[slug]) {
    const item = EXACT_TOOL_REGISTRY[slug];
    return {
      title: lang === 'zh' ? item.titleZh : item.titleEn,
      formula: item.formula,
      category: lang === 'zh' ? item.categoryZh : item.categoryEn,
      desc: lang === 'zh' ? item.descZh : item.descEn,
      icon: item.icon,
      quickSolverId: item.quickSolverId,
      tags: item.tags,
    };
  }

  // ----------------------------------------------------
  // TIER 2: Specificity-Ranked Rule Matching
  // ----------------------------------------------------
  // Rules are evaluated in descending order of specificity (already sorted)
  for (const rule of SPECIFICITY_RULES) {
    if (rule.test(slug)) {
      return rule.metadata(lang);
    }
  }

  // ----------------------------------------------------
  // TIER 3: Intelligent Semantic Fallback for Future Subdomains
  // ----------------------------------------------------
  const rawTokens = slug.split(/[-_]+/).filter(Boolean);
  // Filter out generic filler words
  const cleanTokens = rawTokens.filter(
    (t) => !['calculator', 'solver', 'tool', 'tools', 'online', 'kit', 'app', 'calc'].includes(t)
  );

  const translatedZhTokens: string[] = [];
  const capitalizedEnTokens: string[] = [];

  for (const token of cleanTokens) {
    capitalizedEnTokens.push(token.charAt(0).toUpperCase() + token.slice(1));
    if (MATH_TERM_DICTIONARY[token]) {
      translatedZhTokens.push(MATH_TERM_DICTIONARY[token].zh);
    }
  }

  // Determine Category, Formula, and Icon based on semantic cues
  let inferredCategoryZh = '通用数学与科学';
  let inferredCategoryEn = 'Mathematics';
  let inferredFormula = 'f(x) = y';
  let inferredIcon = '🧮';

  if (slug.includes('geo') || slug.includes('triangle') || slug.includes('polygon') || slug.includes('circle') || slug.includes('area') || slug.includes('perimeter')) {
    inferredCategoryZh = '几何与图形';
    inferredCategoryEn = 'Geometry';
    inferredFormula = 'A = f(r, l, w)';
    inferredIcon = '📐';
  } else if (slug.includes('phys') || slug.includes('force') || slug.includes('speed') || slug.includes('motion') || slug.includes('energy') || slug.includes('watt') || slug.includes('volt')) {
    inferredCategoryZh = '物理与工程';
    inferredCategoryEn = 'Physics';
    inferredFormula = 'E = mc^2,\\quad F = ma';
    inferredIcon = '⚡';
  } else if (slug.includes('fin') || slug.includes('money') || slug.includes('tax') || slug.includes('loan') || slug.includes('interest') || slug.includes('profit') || slug.includes('price')) {
    inferredCategoryZh = '实用与金融';
    inferredCategoryEn = 'Finance';
    inferredFormula = 'FV = PV(1 + r)^t';
    inferredIcon = '💰';
  } else if (slug.includes('alg') || slug.includes('equation') || slug.includes('matrix') || slug.includes('poly') || slug.includes('factor')) {
    inferredCategoryZh = '代数与方程';
    inferredCategoryEn = 'Algebra';
    inferredFormula = 'P(x) = \\sum a_i x^i';
    inferredIcon = '🔢';
  } else if (slug.includes('stat') || slug.includes('prob') || slug.includes('mean') || slug.includes('variance') || slug.includes('deviation')) {
    inferredCategoryZh = '概率与统计';
    inferredCategoryEn = 'Statistics';
    inferredFormula = 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}';
    inferredIcon = '📊';
  }

  // Construct readable titles
  const enName = capitalizedEnTokens.length > 0 ? `${capitalizedEnTokens.join(' ')} Calculator` : `${slug} Calculator`;
  const zhKeywords = translatedZhTokens.length > 0 ? translatedZhTokens.join('') : cleanTokens.map((t) => t.toUpperCase()).join(' ');
  const zhName = `${zhKeywords}在线计算器`;

  // Filter out dummy/stub descriptions from worker (e.g. "Scientific Calculation Tool")
  const isStubDesc = !site.desc || site.desc.toLowerCase().includes('scientific calculation tool') || site.desc.length < 5;

  const descZh = isStubDesc
    ? `专业在线${zhKeywords}计算工具，支持参数即时输入、高精度数值运算与详细分步公式解析。`
    : site.desc;

  const descEn = isStubDesc
    ? `Professional online ${enName} supporting instant calculation, exact results, and step-by-step formula analysis.`
    : site.desc;

  return {
    title: lang === 'zh' ? zhName : enName,
    formula: inferredFormula,
    category: lang === 'zh' ? inferredCategoryZh : inferredCategoryEn,
    desc: lang === 'zh' ? descZh : descEn,
    icon: inferredIcon,
    tags: cleanTokens,
  };
}
