import { ToolItem } from '../types';

export const INITIAL_TOOLS: ToolItem[] = [
  // 1. Unified Quadratic Suite
  {
    id: 'quadratic-solver',
    nameEn: 'Quadratic Equation & Parabola Studio',
    nameZh: '一元二次方程与抛物线全功能套件',
    category: 'algebra',
    formula: 'ax² + bx + c = 0',
    descriptionEn:
      'Unified quadratic algebra engine combining exact quadratic formula roots, completing the square (vertex form), discriminant root analysis (Δ = b² - 4ac), and Vieta’s formulas with step-by-step proofs.',
    descriptionZh:
      '一元二次方程全功能套件：集成求根公式、配方法（顶点式转换）、判别式 Δ 分析及韦达定理对称式求值，支持最简二次根式化简与分步推导。',
    subdomainUrl: 'https://quadratic-solver.formulacalckit.com/',
    quickSolverId: 'quadratic',
    iconName: 'FunctionSquare',
    tags: ['Quadratic', 'Vertex Form', 'Discriminant', 'Vieta'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'quadratic-solver.formulacalckit.com',
    standardReference: 'ISO 80000-2:2019 (Item 2-9.7 Algebraic equations)',
  },

  // 2. Pythagorean Theorem
  {
    id: 'pythagorean-calculator',
    nameEn: 'Pythagorean Theorem & Hypotenuse Solver',
    nameZh: '勾股定理计算器 (直角三角形斜边求解)',
    category: 'geometry',
    formula: 'a² + b² = c²',
    descriptionEn:
      'Calculate missing hypotenuse or legs with exact radical reduction (e.g. 2√5), step-by-step geometric proofs, and Pythagorean triples lookup.',
    descriptionZh:
      '求解直角三角形任意边长，支持最简二次根式化简（如 2√5）、几何分步证明与常用勾股数快速查询。',
    subdomainUrl: 'https://pythagorean-calculator.formulacalckit.com/',
    quickSolverId: 'pythagorean',
    iconName: 'Triangle',
    tags: ['Pythagorean', 'Right Triangle', 'Hypotenuse', 'Radicals'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'pythagorean-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-2:2019 (Item 2-13.1 Euclidean Metric)',
  },

  // 3. Density & Buoyancy
  {
    id: 'density-calculator',
    nameEn: 'Density & Buoyancy Calculator (ρ = m/V)',
    nameZh: '密度计算公式与阿基米德浮力工具 (ρ = m/V)',
    category: 'physics',
    formula: '\\rho = \\frac{m}{V},\\quad F_b = \\rho g V',
    descriptionEn:
      'High-precision density calculator supporting mass, volume, and density solving with built-in substance reference table and Tanaka water density thermal models.',
    descriptionZh:
      '高精度密度科学在线计算器，支持质量、体积与密度三者互求，提供内置物质参考标准表（NIST/CRC）与浮力仿真。',
    subdomainUrl: 'https://density-calculator.formulacalckit.com/',
    quickSolverId: 'density',
    iconName: 'Activity',
    tags: ['Density', 'Buoyancy', 'Mass', 'Volume'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'density-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-4:2019 · NIST SP 811 · Tanaka 2001 Water Model',
  },

  // 4. GCD & LCM
  {
    id: 'gcd-calculator',
    nameEn: 'Greatest Common Divisor (GCD) & LCM Calculator',
    nameZh: '最大公约数与最小公倍数计算器 (GCD/LCM)',
    category: 'academic',
    formula: '\\gcd(a, b), \\operatorname{lcm}(a, b)',
    descriptionEn:
      'Calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM) with Euclidean division algorithm, prime factorization, and ladder division.',
    descriptionZh:
      '在线最大公约数(GCD)与最小公倍数(LCM)计算器，支持短除法、辗转相除法、质因数分解与更相减损法完整步骤演示。',
    subdomainUrl: 'https://gcd-calculator.formulacalckit.com/',
    quickSolverId: 'gcd_lcm',
    iconName: 'Calculator',
    tags: ['GCD', 'LCM', 'Euclidean Algorithm', 'Factorization'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'gcd-calculator.formulacalckit.com',
    standardReference: 'Euclidean Division · Fundamental Theorem of Arithmetic',
  },

  // 5. Fraction Calculator
  {
    id: 'fraction-calculator',
    nameEn: 'Fraction Calculator & Simplifier',
    nameZh: '分数计算器 (四则混合运算与最简分数约分)',
    category: 'algebra',
    formula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
    descriptionEn:
      'Exact fraction addition, subtraction, multiplication, division, mixed numbers conversion, and lowest-term reduction with step-by-step guidance.',
    descriptionZh:
      '分数四则混合运算、最简分数约分化简、假分数与带分数转换及通分步骤推导，提供精确有理数结果。',
    subdomainUrl: 'https://fraction-calculator.formulacalckit.com/',
    quickSolverId: 'gcd_lcm',
    iconName: 'Calculator',
    tags: ['Fraction', 'Simplification', 'Mixed Numbers'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'fraction-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-2:2019 · Field of Rational Numbers ℚ',
  },

  // 6. Linear Function
  {
    id: 'linear-function-calculator',
    nameEn: 'Linear Function & Line Equation Calculator',
    nameZh: '一次函数解析式生成器 (两点求直线方程)',
    category: 'algebra',
    formula: 'y = kx + b,\\quad Ax + By + C = 0',
    descriptionEn:
      'Find line equation from two points (x₁, y₁) and (x₂, y₂) with slope k, intercept b, standard form, and interactive coordinate plane visualization.',
    descriptionZh:
      '输入两个已知坐标点秒出斜率 k、截距 b、解析式 y=kx+b 与一般式，支持分数精度与动态坐标图像。',
    subdomainUrl: 'https://linear-function-calculator.formulacalckit.com/',
    iconName: 'TrendingUp',
    tags: ['Linear Function', 'Slope', 'Intercept', '2D Graph'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'linear-function-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-2:2019 (Item 2-9.2 Functions of real variables)',
  },

  // 7. Linear System Solver
  {
    id: 'linear-system-solver',
    nameEn: 'Linear System Solver (2x2)',
    nameZh: '二元一次方程组求解器 (2x2 方程组)',
    category: 'algebra',
    formula: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    descriptionEn:
      'Step-by-step 2x2 linear system solver with substitution & elimination methods, Cramer’s rule determinants, and graphical 2D intersection.',
    descriptionZh:
      '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简、克莱姆法则与图象交点可视化。',
    subdomainUrl: 'https://linear-system-solver.formulacalckit.com/',
    quickSolverId: 'linear_system',
    iconName: 'FunctionSquare',
    tags: ['Linear System', 'Elimination', 'Substitution', 'Cramer'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'linear-system-solver.formulacalckit.com',
    standardReference: 'ISO 80000-2:2019 · Determinants and Linear Systems',
  },

  // 8. Ohm's Law
  {
    id: 'ohms-law-calculator',
    nameEn: "Ohm's Law & Circuit Power Calculator",
    nameZh: '欧姆定律与电功率计算器',
    category: 'physics',
    formula: 'V = I \\cdot R,\\quad P = V \\cdot I = I^2R',
    descriptionEn:
      'Compute voltage, current, electrical resistance, and dissipated power with automatic SI unit conversion (mA, kΩ, mW, W).',
    descriptionZh:
      '物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持国际标准单位换算。',
    subdomainUrl: 'https://ohms-law-calculator.formulacalckit.com/',
    quickSolverId: 'ohms_law',
    iconName: 'Zap',
    tags: ['Ohms Law', 'Voltage', 'Current', 'Power'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'ohms-law-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-6:2022 · IEC 60050 International Electrotechnical',
  },

  // 9. Sector Area & Arc Length
  {
    id: 'sector-calculator',
    nameEn: 'Sector Area & Arc Length Calculator',
    nameZh: '扇形面积与弧长计算器',
    category: 'geometry',
    formula: 'S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr',
    descriptionEn:
      'Calculate sector area, arc length, central angle, and perimeter with step-by-step derivations in both degrees and radians.',
    descriptionZh:
      '求扇形面积、弧长、圆心角及周长，支持角度制与弧度制互逆推导、圆锥侧面展开图与几何考点。',
    subdomainUrl: 'https://sector-calculator.formulacalckit.com/',
    quickSolverId: 'circle',
    iconName: 'Circle',
    tags: ['Sector Area', 'Arc Length', 'Central Angle', 'Radians'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'sector-calculator.formulacalckit.com',
    standardReference: 'ISO 80000-3:2019 · Euclidean Planar Geometry',
  },

  // 10. Circle & Sphere Geometry
  {
    id: 'circle-sphere-calc',
    nameEn: 'Circle & Sphere 3D Geometry Calculator',
    nameZh: '圆与球体几何计算器 (周长、面积、体积)',
    category: 'geometry',
    formula: 'A = \\pi r^2,\\quad V = \\frac{4}{3}\\pi r^3',
    descriptionEn:
      'Solve circle area, circumference, diameter, and 3D spherical surface area and volume from any single known dimensional metric.',
    descriptionZh:
      '输入半径、直径或面积任意一个值，立即精确求解圆周长、圆面积、球表面积与球体体积。',
    quickSolverId: 'circle',
    iconName: 'Circle',
    tags: ['Circle', 'Sphere', 'Volume', 'Surface Area'],
    isVerifiedSubdomain: false,
    standardReference: 'ISO 80000-3:2019 · Space and Time: Geometry',
  },

  // 11. Trigonometry Solver
  {
    id: 'trigonometry-solver',
    nameEn: 'Trigonometric Functions & Ratio Solver',
    nameZh: '三角函数与直角边比值计算器',
    category: 'trigonometry',
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1',
    descriptionEn:
      'Compute sine, cosine, tangent, cotangent, secant, and inverse functions with degree (DEG) and radian (RAD) dual modes.',
    descriptionZh:
      '计算正弦、余弦、正切、余切及反三角函数值，支持角度（Degree）与弧度（Radian）双向切换。',
    quickSolverId: 'trigonometry',
    iconName: 'Compass',
    tags: ['Trigonometry', 'Sine', 'Cosine', 'Tangent'],
    isVerifiedSubdomain: false,
    standardReference: 'ISO 80000-2:2019 (Item 2-13.3 Circular Functions)',
  },

  // 12. MathBridge LaTeX Tool
  {
    id: 'mathbridge',
    nameEn: 'MathBridge Academic Formula Typography Studio',
    nameZh: '数学公式排版工具 (MathBridge LaTeX Studio)',
    category: 'academic',
    formula: '\\LaTeX \\rightarrow \\text{MathML} / \\text{Word OMML}',
    descriptionEn:
      'Academic math formula editor and converter supporting LaTeX, Word OMML, MathML, and instant typography formatting.',
    descriptionZh:
      'LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览与一键导出。',
    subdomainUrl: 'https://mathbridge.formulacalckit.com/',
    quickSolverId: 'mathbridge',
    iconName: 'FileText',
    tags: ['LaTeX', 'MathML', 'Word OMML', 'Typography'],
    isVerifiedSubdomain: true,
    dnsRecordName: 'mathbridge.formulacalckit.com',
    standardReference: 'W3C MathML 3.0 · ISO/IEC 29500 (Office Open XML)',
  },

  // 13. Percentage & Growth
  {
    id: 'percentage-calculator',
    nameEn: 'Percentage, Growth Rate & Margin Calculator',
    nameZh: '百分比、增长率与利润率计算器',
    category: 'finance',
    formula: '\\Delta\\% = \\frac{V_2 - V_1}{V_1} \\times 100\\%',
    descriptionEn:
      'Calculate percentage increase/decrease, margin, discount price, and proportional ratios for business and academic use.',
    descriptionZh:
      '精准计算增长率、折扣后价格、利润率与基数占比，适用于日常财务与学术运算。',
    quickSolverId: 'percentage',
    iconName: 'Percent',
    tags: ['Percentage', 'Growth Rate', 'Margin', 'Discount'],
    isVerifiedSubdomain: false,
    standardReference: 'ISO 80000-1:2022 · Dimensionless quantities',
  },

  // 14. Heron's Formula
  {
    id: 'herons-formula',
    nameEn: "Heron's Triangle Area Calculator",
    nameZh: '海伦公式任意三角形面积计算器',
    category: 'geometry',
    formula: 'A = \\sqrt{s(s-a)(s-b)(s-c)}',
    descriptionEn:
      'Calculate the exact area of any triangle knowing only the lengths of its three sides, with automatic triangle inequality validation.',
    descriptionZh:
      '只需已知三角形三条边长，无需测量高，自动校验两边之和大于第三边并输出精确面积。',
    quickSolverId: 'pythagorean',
    iconName: 'Maximize2',
    tags: ['Herons Formula', 'Triangle Area', 'Semiperimeter'],
    isVerifiedSubdomain: false,
    standardReference: 'Heron of Alexandria Metrica · Euclidean Geometry',
  },

  // 15. Compound Interest
  {
    id: 'compound-interest',
    nameEn: 'Compound Interest & Capital Growth Calculator',
    nameZh: '复利收益与终值计算器',
    category: 'finance',
    formula: 'A = P(1 + r/n)^{nt}',
    descriptionEn:
      'Forecast long-term capital growth, compounding frequencies (daily, monthly, annually), and accumulated interest over time.',
    descriptionZh:
      '计算本金按固定利率经过周期复利后的终值与累计净利息，直观展示指数复利增长曲线。',
    iconName: 'TrendingUp',
    tags: ['Compound Interest', 'Investment', 'Principal', 'Growth'],
    isVerifiedSubdomain: false,
    standardReference: 'Financial Metrology · Exponential Capital Dynamics',
  },

  // 16. Kinematics Motion
  {
    id: 'kinematics-motion',
    nameEn: 'Uniform Acceleration Kinematics Solver',
    nameZh: '匀变速直线运动物理方程求解器',
    category: 'physics',
    formula: 'v = v_0 + at,\\quad s = v_0 t + \\frac{1}{2}at^2',
    descriptionEn:
      'Solve initial velocity, final velocity, acceleration, displacement, and time with standard SI unit checks and dimensional consistency.',
    descriptionZh:
      '经典力学公式：计算初速度、末速度、加速度、位移与耗时，自带标准国际单位解析。',
    quickSolverId: 'kinematics',
    iconName: 'Activity',
    tags: ['Kinematics', 'Acceleration', 'Velocity', 'Displacement'],
    isVerifiedSubdomain: false,
    standardReference: 'ISO 80000-3:2019 · Newtonian Mechanics',
  },
];
