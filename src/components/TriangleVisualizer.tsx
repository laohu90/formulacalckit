import React, { useState } from 'react';
import { Eye, HelpCircle } from 'lucide-react';
import { SolveResult, roundDisplay } from '../utils/pythagorean';

interface Props {
  data: SolveResult;
}

export const TriangleVisualizer: React.FC<Props> = ({ data }) => {
  const [showAltitude, setShowAltitude] = useState(true);
  const [showAngles, setShowAngles] = useState(true);

  const { a, b, c, target, unit, angleAlphaDeg, angleBetaDeg, heightC } = data;

  // Viewbox dimension
  const svgWidth = 380;
  const svgHeight = 270;
  const padding = 45;

  // Render triangle with right angle at bottom-left:
  // C is at (cx, cy)
  // A is at (cx, cy - h_a)
  // B is at (cx + w_b, cy)
  const maxW = svgWidth - padding * 2;
  const maxH = svgHeight - padding * 2;

  // Scale ratio based on lengths of a (height) and b (base)
  const ratio = Math.min(maxW / Math.max(b, 0.1), maxH / Math.max(a, 0.1));
  const renderA = Math.max(35, Math.min(maxH, a * ratio));
  const renderB = Math.max(45, Math.min(maxW, b * ratio));

  const cx = padding + 15;
  const cy = svgHeight - padding;

  const ax = cx;
  const ay = cy - renderA;

  const bx = cx + renderB;
  const by = cy;

  // Altitude foot from C to hypotenuse AB
  // Vector AB = (bx - ax, by - ay)
  // Projection of AC on AB
  const abX = bx - ax;
  const abY = by - ay;
  const abLen2 = abX * abX + abY * abY;
  const acX = cx - ax;
  const acY = cy - ay;
  const t = (acX * abX + acY * abY) / abLen2;
  const footX = ax + t * abX;
  const footY = ay + t * abY;

  // Right-angle marker at C
  const markerSize = Math.min(18, Math.min(renderA, renderB) * 0.25);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h3 className="font-bold text-slate-800 text-sm tracking-wide">
            动态几何图示 (Geometric Visualization)
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors select-none">
            <input
              type="checkbox"
              checked={showAltitude}
              onChange={(e) => setShowAltitude(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>显示高线 (h)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors select-none">
            <input
              type="checkbox"
              checked={showAngles}
              onChange={(e) => setShowAngles(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>显示角度</span>
          </label>
        </div>
      </div>

      {/* SVG Canvas with pure white background */}
      <div className="relative w-full aspect-[4/3] max-h-[300px] bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
        >
          {/* Triangle Fill & Stroke */}
          <polygon
            points={`${cx},${cy} ${bx},${by} ${ax},${ay}`}
            fill="rgba(59, 130, 246, 0.06)"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right Angle 90° box at C */}
          <path
            d={`M ${cx} ${cy - markerSize} L ${cx + markerSize} ${cy - markerSize} L ${cx + markerSize} ${cy}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <circle cx={cx + markerSize * 0.45} cy={cy - markerSize * 0.45} r="1.5" fill="#64748b" />

          {/* Optional: Altitude line from C to hypotenuse */}
          {showAltitude && (
            <>
              <line
                x1={cx}
                y1={cy}
                x2={footX}
                y2={footY}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={(cx + footX) / 2 - 8}
                y={(cy + footY) / 2 - 4}
                className="text-[11px] font-semibold fill-amber-700"
              >
                h={roundDisplay(heightC, 2)}
              </text>
            </>
          )}

          {/* Angle arcs */}
          {showAngles && (
            <>
              {/* Alpha at vertex A */}
              <text
                x={ax + 10}
                y={ay + 26}
                className="text-[11px] font-bold fill-indigo-600"
              >
                α={roundDisplay(angleAlphaDeg, 1)}°
              </text>

              {/* Beta at vertex B */}
              <text
                x={bx - 42}
                y={by - 8}
                className="text-[11px] font-bold fill-emerald-600"
              >
                β={roundDisplay(angleBetaDeg, 1)}°
              </text>
            </>
          )}

          {/* Vertex Labels */}
          <text x={ax - 16} y={ay - 6} className="text-xs font-bold fill-slate-700">A</text>
          <text x={bx + 8} y={by + 6} className="text-xs font-bold fill-slate-700">B</text>
          <text x={cx - 16} y={cy + 14} className="text-xs font-bold fill-slate-700">C (90°)</text>

          {/* Dimension Label on Leg a (Vertical Left) */}
          <g>
            <rect
              x={ax - 42}
              y={(ay + cy) / 2 - 12}
              width={target === 'a' ? 52 : 44}
              height="22"
              rx="6"
              fill={target === 'a' ? '#eff6ff' : '#ffffff'}
              stroke={target === 'a' ? '#3b82f6' : '#cbd5e1'}
              strokeWidth={target === 'a' ? '1.5' : '1'}
            />
            <text
              x={ax - (target === 'a' ? 16 : 20)}
              y={(ay + cy) / 2 + 3}
              textAnchor="middle"
              className={`text-[11px] font-bold ${target === 'a' ? 'fill-blue-700' : 'fill-slate-800'}`}
            >
              a={roundDisplay(a, 2)}
            </text>
          </g>

          {/* Dimension Label on Leg b (Horizontal Bottom) */}
          <g>
            <rect
              x={(cx + bx) / 2 - (target === 'b' ? 26 : 22)}
              y={cy + 12}
              width={target === 'b' ? 52 : 44}
              height="22"
              rx="6"
              fill={target === 'b' ? '#eff6ff' : '#ffffff'}
              stroke={target === 'b' ? '#3b82f6' : '#cbd5e1'}
              strokeWidth={target === 'b' ? '1.5' : '1'}
            />
            <text
              x={(cx + bx) / 2}
              y={cy + 27}
              textAnchor="middle"
              className={`text-[11px] font-bold ${target === 'b' ? 'fill-blue-700' : 'fill-slate-800'}`}
            >
              b={roundDisplay(b, 2)}
            </text>
          </g>

          {/* Dimension Label on Hypotenuse c (Slanted) */}
          <g>
            <rect
              x={(ax + bx) / 2 + 8}
              y={(ay + by) / 2 - 16}
              width={target === 'c' ? 58 : 48}
              height="22"
              rx="6"
              fill={target === 'c' ? '#eff6ff' : '#ffffff'}
              stroke={target === 'c' ? '#3b82f6' : '#cbd5e1'}
              strokeWidth={target === 'c' ? '1.5' : '1'}
            />
            <text
              x={(ax + bx) / 2 + (target === 'c' ? 37 : 32)}
              y={(ay + by) / 2 - 1}
              textAnchor="middle"
              className={`text-[11px] font-bold ${target === 'c' ? 'fill-blue-700' : 'fill-slate-800'}`}
            >
              c={roundDisplay(c, 2)}
            </text>
          </g>
        </svg>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
        <div className="bg-slate-50 py-1.5 px-2 rounded-lg">
          <span className="text-[10px] text-slate-400 block font-medium">直角边 a</span>
          <span className="text-xs font-bold text-slate-700">{roundDisplay(a, 2)}{unit}</span>
        </div>
        <div className="bg-slate-50 py-1.5 px-2 rounded-lg">
          <span className="text-[10px] text-slate-400 block font-medium">直角边 b</span>
          <span className="text-xs font-bold text-slate-700">{roundDisplay(b, 2)}{unit}</span>
        </div>
        <div className="bg-blue-50 py-1.5 px-2 rounded-lg border border-blue-100">
          <span className="text-[10px] text-blue-600 block font-medium">斜边 c (最长边)</span>
          <span className="text-xs font-bold text-blue-700">{roundDisplay(c, 2)}{unit}</span>
        </div>
      </div>
    </div>
  );
};
