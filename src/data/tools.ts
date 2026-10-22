import { ToolItem } from '../types';

export const INITIAL_TOOLS: ToolItem[] = [
  // 1. Completing the Square
  {
    id: 'completing-the-square-calculator',
    nameEn: 'Completing the Square Calculator',
    nameZh: '配方法一元二次方程计算器',
    category: 'algebra',
    formula: 'a(x - h)² + k = 0',
    descriptionEn:
      'Comprehensive step-by-step Completing the Square calculator, quadratic equation solver, vertex form converter, and geometric algebra tile visualization.',
    descriptionZh:
      '一元二次方程配方法分步详解器，将一般式秒转顶点式，提供5步标准代数配方推导与几何面积块图示。',
    subdomainUrl: 'https://completing-the-square-calculator.formulacalckit.com/',
    iconName: 'FunctionSquare',
    tags: [
      'Completing the square',
      'Vertex form',
      'Quadratic',
      'Parabola',
      '配方法',
      '顶点式',
      '一元二次方程',
      '二次函数',
      '抛物线顶点',
      'algebra',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'completing-the-square-calculator.formulacalckit.com',
  },

  // 2. GCD & LCM Calculator
  {
    id: 'gcd-calculator',
    nameEn: 'Greatest Common Divisor (GCD) & LCM Calculator',
    nameZh: '最大公约数与最小公倍数计算器 (GCD/LCM)',
    category: 'academic',
    formula: '\\gcd(a, b), \\operatorname{lcm}(a, b)',
    descriptionEn:
      'Calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM) with Euclidean algorithm, classic ladder division, and prime factorization.',
    descriptionZh:
      '在线最大公约数(GCD)与最小公倍数(LCM)计算器，支持短除法、辗转相除法、质因数分解与更相减损法完整步骤演示。',
    subdomainUrl: 'https://gcd-calculator.formulacalckit.com/',
    iconName: 'Calculator',
    tags: [
      'GCD',
      'LCM',
      'Euclidean algorithm',
      'Prime Factorization',
      'Ladder Division',
      '最大公约数',
      '最小公倍数',
      '辗转相除法',
      '短除法',
      '质因数分解',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'gcd-calculator.formulacalckit.com',
  },

  // 3. Density Calculator
  {
    id: 'density-calculator',
    nameEn: 'Density Calculator (ρ = m/V)',
    nameZh: '密度计算公式工具 (ρ = m/V)',
    category: 'physics',
    formula: '\\rho = \\frac{m}{V}',
    descriptionEn:
      'High-precision density calculator supporting mass, volume, and density solving with built-in substance table and standard SI unit conversion.',
    descriptionZh:
      '高精度密度科学在线计算器，支持质量、体积与密度三者互求，提供内置常用物质密度表、国际单位换算与浮力解析。',
    subdomainUrl: 'https://density-calculator.formulacalckit.com/',
    iconName: 'Activity',
    tags: [
      'Density',
      'Mass',
      'Volume',
      'rho=m/V',
      'Buoyancy',
      '密度计算器',
      '质量',
      '体积',
      '浮力',
      '物理',
      'physics',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'density-calculator.formulacalckit.com',
  },

  // 4. Fraction Calculator
  {
    id: 'fraction-calculator',
    nameEn: 'Fraction Calculator (Add, Subtract, Multiply, Divide)',
    nameZh: '分数计算器 (四则混合运算与最简分数约分)',
    category: 'algebra',
    formula: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}',
    descriptionEn:
      'Fraction addition, subtraction, multiplication, division, mixed numbers conversion, and exact reduction with step-by-step guidance.',
    descriptionZh:
      '分数四则混合运算、最简分数约分化简、假分数与带分数转换及通分步骤推导，支持高精度有理数运算。',
    subdomainUrl: 'https://fraction-calculator.formulacalckit.com/',
    iconName: 'Calculator',
    tags: [
      'Fraction',
      'Simplification',
      'Mixed Numbers',
      'Common Denominator',
      '分数计算器',
      '约分',
      '通分',
      '带分数',
      '最简分数',
      '有理数',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'fraction-calculator.formulacalckit.com',
  },

  // 5. Linear Function & Line Equation
  {
    id: 'linear-function-calculator',
    nameEn: 'Linear Function & Line Equation Calculator',
    nameZh: '一次函数解析式生成器 (两点求直线方程)',
    category: 'algebra',
    formula: 'y = kx + b',
    descriptionEn:
      'Find line equation from two points (x1, y1) and (x2, y2) with slope k, intercept b, standard form Ax+By+C=0, and interactive 2D graph.',
    descriptionZh:
      '输入两个已知坐标点秒出斜率k、截距b、解析式y=kx+b与一般式，支持分数精度与动态坐标图像。',
    subdomainUrl: 'https://linear-function-calculator.formulacalckit.com/',
    iconName: 'TrendingUp',
    tags: [
      'Linear Function',
      'Line Equation',
      'Slope',
      'Intercept',
      'y=kx+b',
      '一次函数',
      '直线方程',
      '斜率',
      '截距',
      '两点求直线',
      '初中代数',
      'algebra',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'linear-function-calculator.formulacalckit.com',
  },

  // 6. Linear System Solver (2x2)
  {
    id: 'linear-system-solver',
    nameEn: 'Linear System Solver (2x2)',
    nameZh: '二元一次方程组求解器 (2x2 方程组)',
    category: 'algebra',
    formula: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
    descriptionEn:
      'Step-by-step 2x2 linear system solver with substitution & elimination methods, exact fractions, 2D graph intersection, and practice quizzes.',
    descriptionZh:
      '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简、2D函数图象交点可视化与无解/无穷解判定。',
    subdomainUrl: 'https://linear-system-solver.formulacalckit.com/',
    iconName: 'FunctionSquare',
    tags: [
      'Linear System',
      'Simultaneous Equations',
      'Substitution',
      'Elimination',
      '2x2 System',
      '二元一次方程组',
      '消元法',
      '代入法',
      '加减消元',
      '方程组求解',
      '初中代数',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'linear-system-solver.formulacalckit.com',
  },

  // 7. MathBridge Formula Editor
  {
    id: 'mathbridge',
    nameEn: 'MathBridge Formula Typography Tool',
    nameZh: '数学公式排版工具 (MathBridge LaTeX)',
    category: 'academic',
    formula: '\\LaTeX \\rightarrow \\text{MathML} / \\text{Word}',
    descriptionEn:
      'Academic math formula editor and converter supporting LaTeX, Word OMML, MathML, and instant typography formatting.',
    descriptionZh:
      'LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览与一键导出。',
    subdomainUrl: 'https://mathbridge.formulacalckit.com/',
    iconName: 'FileText',
    tags: [
      'LaTeX',
      'MathML',
      'Word OMML',
      '公式排版',
      '公式编辑',
      '公式转换',
      '论文公式',
      '排版',
      '数学公式',
      'typesetting',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'mathbridge.formulacalckit.com',
  },

  // 8. Ohm's Law & Electric Power
  {
    id: 'ohms-law-calculator',
    nameEn: "Ohm's Law & Electric Power Calculator",
    nameZh: '欧姆定律与电功率计算器',
    category: 'physics',
    formula: 'V = I \\cdot R,\\quad P = V \\cdot I',
    descriptionEn:
      'Compute voltage, current, electrical resistance, and dissipated power with automatic unit conversion (mA, kΩ, mW).',
    descriptionZh:
      '物理电路核心定律：根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算与常用电路推导。',
    subdomainUrl: 'https://ohms-law-calculator.formulacalckit.com/',
    quickSolverId: 'ohms_law',
    iconName: 'Zap',
    tags: [
      'Voltage',
      'Current',
      'Resistance',
      'Power',
      'V=IR',
      'P=VI',
      '欧姆定律',
      '电压',
      '电流',
      '电阻',
      '功率',
      '电功率',
      '电路',
      'physics',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'ohms-law-calculator.formulacalckit.com',
  },

  // 9. Pythagorean Theorem
  {
    id: 'pythagorean-calculator',
    nameEn: 'Pythagorean Theorem Calculator',
    nameZh: '勾股定理计算器 (直角三角形斜边求解)',
    category: 'geometry',
    formula: 'a² + b² = c²',
    descriptionEn:
      'Calculate missing hypotenuse or legs with exact radical simplification, step-by-step mathematical proofs, and triples table.',
    descriptionZh:
      '求直角三角形任意边长，支持最简二次根号化简（如 2√5）、逐步几何证明与勾股数查询。',
    subdomainUrl: 'https://pythagorean-calculator.formulacalckit.com/',
    quickSolverId: 'pythagorean',
    iconName: 'Triangle',
    tags: [
      'Right Triangle',
      'Hypotenuse',
      'Radicals',
      'Triples',
      'a2+b2=c2',
      '勾股定理',
      '直角三角形',
      '斜边',
      '直角边',
      '根号化简',
      '勾股数',
      'pythagoras',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'pythagorean-calculator.formulacalckit.com',
  },

  // 10. Quadratic Discriminant Calculator
  {
    id: 'quadratic-discriminant-calculator',
    nameEn: 'Quadratic Discriminant Calculator (Delta Δ)',
    nameZh: '一元二次方程判别式计算器 (Δ 判别式)',
    category: 'algebra',
    formula: '\\Delta = b^2 - 4ac',
    descriptionEn:
      'Calculate quadratic discriminant (Δ = b² - 4ac) to determine root nature (two distinct real, double, or complex conjugate roots) with parabola vertex analysis.',
    descriptionZh:
      '快速求解判别式 Δ = b² - 4ac，精确判断实根、双重实根或共轭虚根性质，提供抛物线图象开口与顶点坐标分析。',
    subdomainUrl: 'https://quadratic-discriminant-calculator.formulacalckit.com/',
    iconName: 'FunctionSquare',
    tags: [
      'Discriminant',
      'Delta',
      'Roots Nature',
      'b2-4ac',
      'Parabola',
      '判别式',
      'Δ=b²-4ac',
      '根的判别式',
      '虚根',
      '实根',
      '二次方程',
      'algebra',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'quadratic-discriminant-calculator.formulacalckit.com',
  },

  // 11. Quadratic Equation / Vieta's Formulas
  {
    id: 'quadratic-equation-solver',
    nameEn: "Vieta's Formulas & Quadratic Equation Calculator",
    nameZh: '韦达定理与二次方程分步计算器',
    category: 'algebra',
    formula: 'x_1 + x_2 = -\\frac{b}{a},\\quad x_1 x_2 = \\frac{c}{a}',
    descriptionEn:
      "Online Vieta's formulas and quadratic equation calculator. Features roots-to-equation derivation, symmetric expressions, and step-by-step factoring.",
    descriptionZh:
      '在线韦达定理与根与系数关系推导，支持已知两根反推二次方程、对称式求值（x₁²+x₂²）及十字相乘分步求解。',
    subdomainUrl: 'https://quadratic-equation-solver.formulacalckit.com/',
    iconName: 'FunctionSquare',
    tags: [
      'Vieta',
      'Roots Relation',
      'Symmetric Expressions',
      'Factoring',
      '韦达定理',
      '根与系数的关系',
      '对称式',
      '反推方程',
      '十字相乘',
      '因式分解',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'quadratic-equation-solver.formulacalckit.com',
  },

  // 12. Standard Quadratic Solver
  {
    id: 'quadratic-solver',
    nameEn: 'Quadratic Equation Solver',
    nameZh: '一元二次方程极速求解器',
    category: 'algebra',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    descriptionEn:
      'Find real and complex roots, discriminant Δ, vertex coordinates, and step-by-step factoring or quadratic formula solutions.',
    descriptionZh:
      '快速解一元二次方程，输出实根与复数根、判别式 Δ、顶点坐标及十字相乘/配方过程与求根公式解析。',
    subdomainUrl: 'https://quadratic-solver.formulacalckit.com/',
    quickSolverId: 'quadratic',
    iconName: 'FunctionSquare',
    tags: [
      'Roots',
      'Discriminant',
      'Parabola',
      'Factoring',
      'ax2+bx+c=0',
      '一元二次方程',
      '二次方程',
      '求根公式',
      '判别式',
      '十字相乘',
      '配方法',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'quadratic-solver.formulacalckit.com',
  },

  // 13. Sector Area & Arc Length
  {
    id: 'sector-calculator',
    nameEn: 'Sector Area & Arc Length Calculator',
    nameZh: '扇形面积与弧长计算器',
    category: 'geometry',
    formula: 'S = \\frac{n}{360}\\pi r^2 = \\frac{1}{2}lr',
    descriptionEn:
      'Calculate sector area, arc length, central angle, and perimeter with step-by-step derivations in degrees and radians.',
    descriptionZh:
      '求扇形面积、弧长、圆心角及周长，支持角度制与弧度制互逆推导、圆锥侧面展开图与中考几何考点。',
    subdomainUrl: 'https://sector-calculator.formulacalckit.com/',
    iconName: 'Circle',
    tags: [
      'Sector Area',
      'Arc Length',
      'Central Angle',
      'Perimeter',
      '扇形面积',
      '弧长计算器',
      '圆心角',
      '扇形公式',
      '圆锥侧面积',
      '初中几何',
      'geometry',
    ],
    isVerifiedSubdomain: true,
    dnsRecordName: 'sector-calculator.formulacalckit.com',
  },

  // 14. Circle & Sphere Geometry
  {
    id: 'circle-sphere-calc',
    nameEn: 'Circle & Sphere Calculator',
    nameZh: '圆与球体几何计算器',
    category: 'geometry',
    formula: 'A = \\pi r^2,\\quad V = \\frac{4}{3}\\pi r^3',
    descriptionEn:
      'Solve circle area, circumference, diameter, and 3D sphere surface area and volume from any single metric.',
    descriptionZh:
      '输入半径、直径或面积任意一个值，立即精确求解圆周长、圆面积、球表面积与球体体积。',
    quickSolverId: 'circle',
    iconName: 'Circle',
    tags: [
      'Radius',
      'Circumference',
      'Sphere',
      'Pi',
      'Area',
      'Volume',
      '圆',
      '球体',
      '圆面积',
      '圆周长',
      '球体积',
      '球表面积',
    ],
    isVerifiedSubdomain: false,
  },

  // 15. Trigonometry Solver
  {
    id: 'trigonometry-solver',
    nameEn: 'Trigonometric Functions & Ratios',
    nameZh: '三角函数与直角边比值计算器',
    category: 'trigonometry',
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1',
    descriptionEn:
      'Compute sine, cosine, tangent, cotangent, secant, cosecant, and inverse trig functions in both degrees and radians.',
    descriptionZh:
      '计算正弦、余弦、正切、余切及反三角函数值，支持角度（Degree）与弧度（Radian）双向切换。',
    quickSolverId: 'trigonometry',
    iconName: 'Compass',
    tags: [
      'Sine',
      'Cosine',
      'Tangent',
      'Radians',
      'Degrees',
      '三角函数',
      '正弦',
      '余弦',
      '正切',
      '弧度',
      '角度',
    ],
    isVerifiedSubdomain: false,
  },

  // 16. Percentage & Growth
  {
    id: 'percentage-calculator',
    nameEn: 'Percentage & Growth Calculator',
    nameZh: '百分比与变化率计算器',
    category: 'finance',
    formula: '\\Delta\\% = \\frac{V_2 - V_1}{V_1} \\times 100\\%',
    descriptionEn:
      'Calculate percentage increase/decrease, margin, discount, and proportional ratios for business and academic use.',
    descriptionZh:
      '精准计算增长率、折扣后价格、利润率与基数占比，适用于日常财务与学术运算。',
    quickSolverId: 'percentage',
    iconName: 'Percent',
    tags: [
      'Discount',
      'Growth Rate',
      'Margin',
      'Ratio',
      'Percentage',
      '百分比',
      '增长率',
      '变化率',
      '折扣',
      '利润率',
    ],
    isVerifiedSubdomain: false,
  },

  // 17. Heron's Formula
  {
    id: 'herons-formula',
    nameEn: "Heron's Triangle Area Calculator",
    nameZh: '海伦公式任意三角形面积',
    category: 'geometry',
    formula: 'A = \\sqrt{s(s-a)(s-b)(s-c)}',
    descriptionEn:
      'Calculate the exact area of any triangle knowing only the lengths of its three sides, with triangle inequality validation.',
    descriptionZh:
      '只需已知三角形三条边长，无需测量高，自动校验两边之和大于第三边并输出精确面积。',
    iconName: 'Maximize2',
    tags: [
      'Triangle Area',
      'Semiperimeter',
      'Non-Right Triangle',
      'Heron',
      '海伦公式',
      '任意三角形面积',
      '三角形三边求面积',
    ],
    isVerifiedSubdomain: false,
  },

  // 18. Compound Interest
  {
    id: 'compound-interest',
    nameEn: 'Compound Interest Calculator',
    nameZh: '复利收益与终值计算器',
    category: 'finance',
    formula: 'A = P(1 + r/n)ⁿᵗ',
    descriptionEn:
      'Forecast long-term investment growth, compounding frequencies (daily, monthly, annually), and interest accumulated over time.',
    descriptionZh:
      '计算本金按固定利率经过周期复利后的终值与累计净利息，直观展示复利增长曲线。',
    iconName: 'TrendingUp',
    tags: [
      'Investment',
      'Annual Rate',
      'Principal',
      'Compound Growth',
      'Interest',
      '复利',
      '利息',
      '本金',
      '年利率',
      '投资收益',
    ],
    isVerifiedSubdomain: false,
  },

  // 19. Kinematics Motion
  {
    id: 'kinematics-motion',
    nameEn: 'Uniform Acceleration Kinematics',
    nameZh: '匀变速直线运动物理方程',
    category: 'physics',
    formula: 'v = v_0 + at,\\quad s = v_0 t + \\frac{1}{2}at^2',
    descriptionEn:
      'Solve initial velocity, final velocity, acceleration, displacement, and time with standard SI unit checks.',
    descriptionZh:
      '经典力学公式：计算初速度、末速度、加速度、位移与耗时，自带标准国际单位解析。',
    iconName: 'Activity',
    tags: [
      'Velocity',
      'Acceleration',
      'Displacement',
      'Newtonian Physics',
      '匀变速直线运动',
      '初速度',
      '末速度',
      '加速度',
      '位移',
    ],
    isVerifiedSubdomain: false,
  },
];
