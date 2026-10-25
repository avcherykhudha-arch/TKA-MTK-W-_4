import React from 'react';
import { VisualData } from '../types/quiz';

interface VisualDiagramProps {
  visualData: VisualData;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ visualData }) => {
  if (visualData.type === 'none') return null;

  return (
    <div className="my-6 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
      {visualData.type === 'table' && visualData.tableData && (
        <div className="overflow-x-auto">
          {visualData.tableData.caption && (
            <p className="text-sm font-semibold text-slate-700 mb-3 text-center tracking-wide">
              {visualData.tableData.caption}
            </p>
          )}
          <table className="w-full text-left text-sm sm:text-base border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                {visualData.tableData.headers.map((h, i) => (
                  <th key={i} className="p-3 border border-slate-200 font-bold text-center">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visualData.tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 border border-slate-200 text-center font-medium text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-2 text-center italic">
            *Sumber data dan batasan disajikan untuk analisis TKA
          </p>
        </div>
      )}

      {visualData.type === 'svg' && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xl mx-auto flex justify-center py-2">
            {renderSvg(visualData.svgType)}
          </div>
          <span className="text-xs text-slate-500 mt-2 text-center italic">
            {visualData.altText} (Ilustrasi skematis dan proporsional untuk analisis)
          </span>
        </div>
      )}
    </div>
  );
};

function renderSvg(type?: string) {
  switch (type) {
    // SOAL 1: Tabel skema cicilan vs diskon (sudah table, fallback SVG)
    case 'financial_compound':
      return (
        <svg viewBox="0 0 500 240" className="w-full h-auto max-h-64">
          <rect width="500" height="240" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          <path d="M 50 190 L 450 190" stroke="#64748B" strokeWidth="2" />
          <path d="M 50 190 L 50 30" stroke="#64748B" strokeWidth="2" />
          <text x="440" y="215" fill="#475569" fontSize="13" fontWeight="bold">Waktu (Bulan)</text>
          <text x="20" y="30" fill="#475569" fontSize="13" fontWeight="bold">Biaya Total (Juta Rp)</text>
          {/* Skema A: Tunai bertahap */}
          <path d="M 50 150 Q 250 140 450 130" stroke="#C8102E" strokeWidth="3" fill="none" strokeDasharray="4 4" />
          <text x="360" y="120" fill="#C8102E" fontSize="12" fontWeight="bold">Skema A (Diskon Tunai)</text>
          {/* Skema B: Cicilan berbunga */}
          <path d="M 50 170 Q 250 110 450 60" stroke="#1E293B" strokeWidth="3" fill="none" />
          <text x="360" y="52" fill="#1E293B" fontSize="12" fontWeight="bold">Skema B (Cicilan)</text>
        </svg>
      );

    // SOAL 3: Grafik persentase bertahap (kumulatif perubahan)
    case 'percentage_chart':
      return (
        <svg viewBox="0 0 500 240" className="w-full h-auto max-h-64">
          <rect width="500" height="240" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Grid lines */}
          <line x1="60" y1="40" x2="460" y2="40" stroke="#F1F5F9" />
          <line x1="60" y1="90" x2="460" y2="90" stroke="#F1F5F9" />
          <line x1="60" y1="140" x2="460" y2="140" stroke="#CBD5E1" strokeDasharray="3 3" />
          <line x1="60" y1="190" x2="460" y2="190" stroke="#F1F5F9" />
          {/* Zero baseline (100% or 0% net) */}
          <line x1="60" y1="140" x2="460" y2="140" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="25" y="145" fontSize="12" fill="#64748B">0%</text>
          <text x="15" y="95" fontSize="12" fill="#64748B">+20%</text>
          <text x="15" y="45" fontSize="12" fill="#64748B">+40%</text>
          <text x="15" y="195" fontSize="12" fill="#64748B">-20%</text>
          {/* Steps */}
          {/* Tahap 1: Naik 25% (y: 140 - 25*2.5 = 77.5) */}
          <line x1="60" y1="140" x2="160" y2="78" stroke="#C8102E" strokeWidth="3" />
          <circle cx="160" cy="78" r="5" fill="#C8102E" />
          <text x="135" y="68" fontSize="12" fontWeight="bold" fill="#C8102E">+25%</text>
          {/* Tahap 2: Turun 20% dari nilai baru */}
          <line x1="160" y1="78" x2="280" y2="140" stroke="#C8102E" strokeWidth="3" />
          <circle cx="280" cy="140" r="5" fill="#C8102E" />
          <text x="255" y="160" fontSize="12" fontWeight="bold" fill="#C8102E">-20%</text>
          {/* Tahap 3: Naik 10% */}
          <line x1="280" y1="140" x2="400" y2="115" stroke="#C8102E" strokeWidth="3" />
          <circle cx="400" cy="115" r="5" fill="#C8102E" />
          <text x="380" y="105" fontSize="12" fontWeight="bold" fill="#C8102E">+10%</text>
          {/* Labels on x */}
          <text x="50" y="215" fontSize="12" fill="#475569">Awal (T0)</text>
          <text x="145" y="215" fontSize="12" fill="#475569">Tahap I</text>
          <text x="265" y="215" fontSize="12" fill="#475569">Tahap II</text>
          <text x="385" y="215" fontSize="12" fill="#475569">Tahap III</text>
        </svg>
      );

    // SOAL 4: Pengemasan barang silinder vs balok
    case 'geometric_pack':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-60">
          <rect width="460" height="220" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Wadah Silinder Berisi Bola / Silinder */}
          <ellipse cx="120" cy="70" rx="60" ry="22" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
          <path d="M 60 70 L 60 160 A 60 22 0 0 0 180 160 L 180 70" fill="none" stroke="#475569" strokeWidth="2" />
          <ellipse cx="120" cy="160" rx="60" ry="22" fill="#F1F5F9" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="120" y1="70" x2="180" y2="70" stroke="#C8102E" strokeWidth="1.5" />
          <text x="135" y="65" fill="#C8102E" fontSize="12" fontWeight="bold">r = 2x</text>
          <line x1="195" y1="70" x2="195" y2="160" stroke="#475569" strokeWidth="1.5" />
          <text x="202" y="120" fill="#475569" fontSize="12">t = 3x</text>

          {/* Kotak Balok Perbandingan */}
          <polygon points="280,160 360,160 410,120 330,120" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
          <polygon points="280,160 280,80 360,80 360,160" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
          <polygon points="360,160 410,120 410,40 360,80" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <polygon points="280,80 360,80 410,40 330,40" fill="#F1F5F9" stroke="#475569" strokeWidth="2" />
          <text x="300" y="180" fill="#475569" fontSize="12">p = 3x</text>
          <text x="390" y="150" fill="#475569" fontSize="12">l = 2x</text>
          <text x="250" y="120" fill="#475569" fontSize="12">t = 2x</text>
        </svg>
      );

    // SOAL 8: Daerah Kendala Program Linear
    case 'linear_programming':
      return (
        <svg viewBox="0 0 460 260" className="w-full h-auto max-h-64">
          <rect width="460" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Axes */}
          <line x1="50" y1="220" x2="420" y2="220" stroke="#334155" strokeWidth="2" />
          <line x1="50" y1="220" x2="50" y2="30" stroke="#334155" strokeWidth="2" />
          <text x="410" y="240" fill="#334155" fontSize="13" fontWeight="bold">x</text>
          <text x="25" y="40" fill="#334155" fontSize="13" fontWeight="bold">y</text>

          {/* Feasible Region Polygon */}
          <polygon points="50,220 50,110 190,140 280,220" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          
          {/* Constraint Line 1: x + 2y <= 160 */}
          <line x1="40" y1="105" x2="350" y2="230" stroke="#2563EB" strokeWidth="2" />
          <text x="310" y="215" fill="#2563EB" fontSize="11">g₁: 2x + 3y ≤ 180</text>

          {/* Constraint Line 2: 3x + y <= 150 */}
          <line x1="160" y1="50" x2="310" y2="245" stroke="#059669" strokeWidth="2" />
          <text x="200" y="70" fill="#059669" fontSize="11">g₂: x + y ≤ 80</text>

          {/* Region Label */}
          <text x="120" y="175" fill="#991B1B" fontSize="14" fontWeight="bold">Daerah DHP</text>
          
          {/* Vertices without showing values */}
          <circle cx="50" cy="220" r="4" fill="#1E293B" /><text x="55" y="215" fontSize="11">O(0,0)</text>
          <circle cx="50" cy="110" r="4" fill="#1E293B" /><text x="55" y="115" fontSize="11">A</text>
          <circle cx="190" cy="140" r="4" fill="#1E293B" /><text x="195" y="135" fontSize="11">B (Titik Potong)</text>
          <circle cx="280" cy="220" r="4" fill="#1E293B" /><text x="280" y="215" fontSize="11">C</text>
        </svg>
      );

    // SOAL 9: Grafik Fungsi Rasional
    case 'rational_function':
      return (
        <svg viewBox="0 0 460 260" className="w-full h-auto max-h-64">
          <rect width="460" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Axes */}
          <line x1="40" y1="140" x2="420" y2="140" stroke="#64748B" strokeWidth="1.5" />
          <line x1="220" y1="20" x2="220" y2="240" stroke="#64748B" strokeWidth="1.5" />
          <text x="410" y="130" fill="#64748B" fontSize="12">x</text>
          <text x="230" y="35" fill="#64748B" fontSize="12">y</text>

          {/* Vertical Asymptote x = 2 (at x=270) */}
          <line x1="270" y1="20" x2="270" y2="240" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="275" y="50" fill="#DC2626" fontSize="11" fontWeight="bold">Asimtot x = 2</text>

          {/* Horizontal Asymptote y = 3 (at y=90) */}
          <line x1="40" y1="90" x2="420" y2="90" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="60" y="82" fill="#2563EB" fontSize="11" fontWeight="bold">Asimtot y = 3</text>

          {/* Curve branch 1: x < 2 */}
          <path d="M 60 100 Q 180 105 250 230" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          {/* Curve branch 2: x > 2 */}
          <path d="M 290 30 Q 330 75 420 82" fill="none" stroke="#1E293B" strokeWidth="2.5" />

          {/* Intercepts */}
          <circle cx="220" cy="115" r="4" fill="#B91C1C" />
          <text x="180" y="118" fontSize="11" fill="#B91C1C">(0, 1.5)</text>
          <circle cx="160" cy="140" r="4" fill="#B91C1C" />
          <text x="140" y="160" fontSize="11" fill="#B91C1C">(-1, 0)</text>
        </svg>
      );

    // SOAL 10: Diagram Alur Komposisi & Invers
    case 'composite_flow':
      return (
        <svg viewBox="0 0 480 180" className="w-full h-auto max-h-48">
          <rect width="480" height="180" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Step 1: Input x */}
          <circle cx="60" cy="90" r="28" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
          <text x="56" y="95" fontSize="15" fontWeight="bold" fill="#1E293B">x</text>
          <text x="35" y="135" fontSize="11" fill="#64748B">Bahan Baku</text>

          {/* Arrow 1 */}
          <line x1="90" y1="90" x2="140" y2="90" stroke="#C8102E" strokeWidth="2" markerEnd="url(#arrow)" />
          
          {/* Box Mesin 1: f(x) = 2x + 5 */}
          <rect x="140" y="60" width="100" height="60" rx="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="165" y="85" fontSize="13" fontWeight="bold" fill="#991B1B">Mesin I</text>
          <text x="160" y="105" fontSize="12" fill="#991B1B">f(x) = 2x + 5</text>

          {/* Arrow 2 */}
          <line x1="240" y1="90" x2="290" y2="90" stroke="#C8102E" strokeWidth="2" />
          <text x="250" y="80" fontSize="11" fill="#64748B">u = f(x)</text>

          {/* Box Mesin 2: g(u) = 3u - 4 */}
          <rect x="290" y="60" width="100" height="60" rx="8" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
          <text x="315" y="85" fontSize="13" fontWeight="bold" fill="#3730A3">Mesin II</text>
          <text x="310" y="105" fontSize="12" fill="#3730A3">g(u) = 3u - 4</text>

          {/* Arrow 3 */}
          <line x1="390" y1="90" x2="430" y2="90" stroke="#C8102E" strokeWidth="2" />

          {/* Output y */}
          <circle cx="450" cy="90" r="22" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
          <text x="446" y="95" fontSize="14" fontWeight="bold" fill="#1E293B">y</text>
          <text x="425" y="130" fontSize="11" fill="#64748B">Produk Jadi</text>
        </svg>
      );

    // SOAL 11: Grafik Parabola Fungsi Kuadrat
    case 'quadratic_parabola':
      return (
        <svg viewBox="0 0 460 250" className="w-full h-auto max-h-60">
          <rect width="460" height="250" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="40" y1="180" x2="420" y2="180" stroke="#64748B" strokeWidth="1.5" />
          <line x1="160" y1="20" x2="160" y2="230" stroke="#64748B" strokeWidth="1.5" />
          <text x="410" y="170" fill="#64748B" fontSize="12">x</text>
          <text x="170" y="35" fill="#64748B" fontSize="12">y</text>

          {/* Parabola opening upward y = x^2 - 4x - 5 */}
          <path d="M 80 50 Q 240 310 400 50" fill="none" stroke="#C8102E" strokeWidth="2.5" />
          
          {/* Axis of symmetry x = 2 */}
          <line x1="240" y1="30" x2="240" y2="220" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="245" y="45" fill="#64748B" fontSize="11">Sumbu Simetri x = p</text>

          {/* Critical points with labels only, without showing calculated answer */}
          <circle cx="160" cy="180" r="3.5" fill="#334155" /><text x="145" y="195" fontSize="11">(0,0)</text>
          <circle cx="110" cy="180" r="4" fill="#1E293B" /><text x="100" y="170" fontSize="11">x₁</text>
          <circle cx="370" cy="180" r="4" fill="#1E293B" /><text x="365" y="170" fontSize="11">x₂</text>
          <circle cx="160" cy="210" r="4" fill="#1E293B" /><text x="168" y="215" fontSize="11">(0, c)</text>
          <circle cx="240" cy="225" r="4" fill="#DC2626" /><text x="248" y="235" fontSize="11" fontWeight="bold">Titik Puncak P</text>
        </svg>
      );

    // SOAL 13: Kesebangunan & Pythagoras pada bayangan gedung
    case 'similar_triangles':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Ground */}
          <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="2" />
          
          {/* Tiang kecil (Tinggi 2 m, bayangan 3 m) */}
          <line x1="180" y1="180" x2="180" y2="120" stroke="#059669" strokeWidth="3" />
          <text x="155" y="150" fontSize="12" fontWeight="bold" fill="#059669">Tiang (2 m)</text>
          
          {/* Gedung Besar (Tinggi T m) */}
          <rect x="340" y="40" width="30" height="140" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
          <text x="375" y="110" fontSize="12" fontWeight="bold" fill="#1E293B">Gedung (H)</text>

          {/* Sinar Matahari Sejajar */}
          <line x1="60" y1="180" x2="180" y2="120" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="60" y1="180" x2="340" y2="40" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
          
          {/* Jarak di tanah */}
          <line x1="60" y1="195" x2="180" y2="195" stroke="#64748B" strokeWidth="1" />
          <text x="105" y="210" fontSize="11" fill="#64748B">3 m</text>

          <line x1="180" y1="195" x2="340" y2="195" stroke="#64748B" strokeWidth="1" />
          <text x="245" y="210" fontSize="11" fill="#64748B">18 m</text>
          
          {/* Sudut Sinar */}
          <path d="M 80 180 A 20 20 0 0 0 75 172" fill="none" stroke="#EAB308" strokeWidth="2" />
          <text x="85" y="175" fontSize="11" fill="#B45309">θ</text>
        </svg>
      );

    // SOAL 14: Denah Taman Kombinasi Persegi Panjang & Setengah Lingkaran
    case 'park_plan':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Main rectangle ABCD */}
          <rect x="130" y="50" width="200" height="120" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          {/* Semicircle on right edge */}
          <path d="M 330 50 A 60 60 0 0 1 330 170 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          {/* Semicircle pool on left edge */}
          <path d="M 130 170 A 60 60 0 0 1 130 50 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />

          {/* Labels */}
          <text x="120" y="45" fontSize="12" fontWeight="bold">A</text>
          <text x="335" y="45" fontSize="12" fontWeight="bold">B</text>
          <text x="335" y="185" fontSize="12" fontWeight="bold">C</text>
          <text x="120" y="185" fontSize="12" fontWeight="bold">D</text>

          <text x="210" y="115" fontSize="12" fill="#065F46" fontWeight="bold">Area Rumput</text>
          <text x="345" y="115" fontSize="11" fill="#92400E">Taman Bunga</text>
          <text x="65" y="115" fontSize="11" fill="#075985">Kolam Ikan</text>

          {/* Dimensions */}
          <line x1="130" y1="30" x2="330" y2="30" stroke="#475569" strokeWidth="1" />
          <text x="215" y="25" fontSize="11" fill="#475569">28 meter</text>
          <line x1="410" y1="50" x2="410" y2="170" stroke="#475569" strokeWidth="1" />
          <text x="415" y="115" fontSize="11" fill="#475569">14 m</text>
        </svg>
      );

    // SOAL 15: Penampang Konstruksi Rangka Baja
    case 'truss_elevation':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Truss Framework */}
          <polygon points="60,170 230,50 400,170" fill="none" stroke="#1E293B" strokeWidth="3" />
          <line x1="60" y1="170" x2="400" y2="170" stroke="#1E293B" strokeWidth="3" />
          {/* King post */}
          <line x1="230" y1="50" x2="230" y2="170" stroke="#C8102E" strokeWidth="2.5" />
          {/* Web members */}
          <line x1="145" y1="110" x2="230" y2="170" stroke="#2563EB" strokeWidth="2" />
          <line x1="315" y1="110" x2="230" y2="170" stroke="#2563EB" strokeWidth="2" />
          <line x1="145" y1="110" x2="145" y2="170" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="315" y1="110" x2="315" y2="170" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Node Labels */}
          <text x="45" y="180" fontSize="13" fontWeight="bold">A</text>
          <text x="225" y="40" fontSize="13" fontWeight="bold">C</text>
          <text x="410" y="180" fontSize="13" fontWeight="bold">B</text>
          <text x="225" y="190" fontSize="13" fontWeight="bold">D</text>
          <text x="130" y="105" fontSize="12" fontWeight="bold">E</text>
          <text x="325" y="105" fontSize="12" fontWeight="bold">F</text>

          {/* Span annotations */}
          <text x="130" y="185" fontSize="11" fill="#475569">6 m</text>
          <text x="300" y="185" fontSize="11" fill="#475569">6 m</text>
          <text x="238" y="110" fontSize="11" fill="#C8102E" fontWeight="bold">t = 4.5 m</text>
        </svg>
      );

    // SOAL 16: Tangki Gabungan Tabung dan Kerucut
    case 'spatial_prism':
      return (
        <svg viewBox="0 0 460 250" className="w-full h-auto max-h-60">
          <rect width="460" height="250" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Cylinder Top Ellipse */}
          <ellipse cx="230" cy="50" rx="90" ry="25" fill="#E2E8F0" stroke="#334155" strokeWidth="2" />
          {/* Cylinder Body */}
          <line x1="140" y1="50" x2="140" y2="150" stroke="#334155" strokeWidth="2" />
          <line x1="320" y1="50" x2="320" y2="150" stroke="#334155" strokeWidth="2" />
          <ellipse cx="230" cy="150" rx="90" ry="25" fill="#CBD5E1" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
          {/* Bottom Conical Hopper */}
          <line x1="140" y1="150" x2="230" y2="230" stroke="#334155" strokeWidth="2" />
          <line x1="320" y1="150" x2="230" y2="230" stroke="#334155" strokeWidth="2" />
          
          {/* Dimensions */}
          <line x1="230" y1="50" x2="320" y2="50" stroke="#DC2626" strokeWidth="2" />
          <text x="260" y="44" fontSize="11" fill="#DC2626" fontWeight="bold">r = 3 m</text>

          <line x1="120" y1="50" x2="120" y2="150" stroke="#475569" strokeWidth="1.5" />
          <text x="75" y="105" fontSize="11" fill="#475569">t_tabung = 8 m</text>

          <line x1="120" y1="150" x2="120" y2="230" stroke="#475569" strokeWidth="1.5" />
          <text x="70" y="195" fontSize="11" fill="#475569">t_kerucut = 4 m</text>
        </svg>
      );

    // SOAL 17: Jarak Spasial Kubus ABCD.EFGH
    case 'cube_distance':
      return (
        <svg viewBox="0 0 460 250" className="w-full h-auto max-h-60">
          <rect width="460" height="250" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Front Face ABFE */}
          <rect x="120" y="110" width="120" height="120" fill="none" stroke="#1E293B" strokeWidth="2" />
          {/* Back Face DCGH */}
          <rect x="200" y="50" width="120" height="120" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Connecting edges */}
          <line x1="120" y1="110" x2="200" y2="50" stroke="#1E293B" strokeWidth="2" />
          <line x1="240" y1="110" x2="320" y2="50" stroke="#1E293B" strokeWidth="2" />
          <line x1="240" y1="230" x2="320" y2="170" stroke="#1E293B" strokeWidth="2" />
          <line x1="120" y1="230" x2="200" y2="170" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Point P at center of CG */}
          <circle cx="320" cy="110" r="4.5" fill="#DC2626" />
          <text x="330" y="115" fontSize="12" fontWeight="bold" fill="#DC2626">P (tengah CG)</text>

          {/* Plane BDHF / diagonal line segment */}
          <line x1="240" y1="230" x2="200" y2="50" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="120" y1="110" x2="320" y2="110" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />

          {/* Vertex Labels */}
          <text x="105" y="240" fontSize="12" fontWeight="bold">A</text>
          <text x="245" y="240" fontSize="12" fontWeight="bold">B</text>
          <text x="325" y="180" fontSize="12" fontWeight="bold">C</text>
          <text x="185" y="180" fontSize="12" fontWeight="bold">D</text>
          <text x="105" y="110" fontSize="12" fontWeight="bold">E</text>
          <text x="245" y="105" fontSize="12" fontWeight="bold">F</text>
          <text x="325" y="45" fontSize="12" fontWeight="bold">G</text>
          <text x="185" y="45" fontSize="12" fontWeight="bold">H</text>

          <text x="150" y="245" fontSize="11" fill="#64748B">rusuk = 6 cm</text>
        </svg>
      );

    // SOAL 18: Transformasi Geometri Titik & Segitiga
    case 'coordinate_transform':
      return (
        <svg viewBox="0 0 460 250" className="w-full h-auto max-h-60">
          <rect width="460" height="250" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Coordinate grid */}
          <line x1="40" y1="125" x2="420" y2="125" stroke="#475569" strokeWidth="1.5" />
          <line x1="230" y1="20" x2="230" y2="230" stroke="#475569" strokeWidth="1.5" />
          <text x="415" y="120" fontSize="12">x</text>
          <text x="235" y="35" fontSize="12">y</text>

          {/* Original Triangle T */}
          <polygon points="250,95 290,95 270,55" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="265" y="85" fontSize="11" fontWeight="bold" fill="#1E40AF">T₀</text>

          {/* Transformed Triangle 1 (Refleksi y = x) */}
          <line x1="125" y1="230" x2="335" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <text x="310" y="40" fontSize="11" fill="#64748B">Garis y = x</text>

          <polygon points="260,105 260,65 300,85" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="268" y="90" fontSize="11" fontWeight="bold" fill="#991B1B">T₁</text>

          {/* Final Rotated / Dilated Triangle */}
          <polygon points="200,155 200,195 160,175" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <text x="180" y="180" fontSize="11" fontWeight="bold" fill="#B45309">T₂</text>
        </svg>
      );

    // SOAL 19: Pengukuran Ketinggian Gedung dari Dua Titik
    case 'elevation_angle':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Ground */}
          <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="2" />
          
          {/* Building */}
          <rect x="360" y="40" width="40" height="140" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
          <text x="370" y="30" fontSize="12" fontWeight="bold" fill="#1E293B">Puncak T</text>
          <line x1="360" y1="40" x2="360" y2="180" stroke="#C8102E" strokeWidth="2" />
          <text x="345" y="110" fontSize="12" fontWeight="bold" fill="#C8102E">t</text>

          {/* Point A */}
          <circle cx="80" cy="180" r="4" fill="#1E293B" />
          <text x="75" y="200" fontSize="12" fontWeight="bold">Titik A</text>
          {/* Line of sight A to Top */}
          <line x1="80" y1="180" x2="360" y2="40" stroke="#2563EB" strokeWidth="2" strokeDasharray="3 3" />
          <text x="110" y="172" fontSize="11" fill="#2563EB" fontWeight="bold">30°</text>

          {/* Point B */}
          <circle cx="200" cy="180" r="4" fill="#1E293B" />
          <text x="195" y="200" fontSize="12" fontWeight="bold">Titik B</text>
          {/* Line of sight B to Top */}
          <line x1="200" y1="180" x2="360" y2="40" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
          <text x="225" y="172" fontSize="11" fill="#059669" fontWeight="bold">60°</text>

          {/* Distance A-B = 50 m */}
          <line x1="80" y1="215" x2="200" y2="215" stroke="#64748B" strokeWidth="1" />
          <text x="125" y="212" fontSize="11" fill="#475569">50 meter</text>
        </svg>
      );

    // SOAL 20: Lingkaran Satuan & Koordinat Kuadran
    case 'trig_unit_circle':
      return (
        <svg viewBox="0 0 460 250" className="w-full h-auto max-h-60">
          <rect width="460" height="250" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="40" y1="125" x2="420" y2="125" stroke="#64748B" strokeWidth="1.5" />
          <line x1="230" y1="20" x2="230" y2="230" stroke="#64748B" strokeWidth="1.5" />

          {/* Circle */}
          <circle cx="230" cy="125" r="90" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
          
          {/* Point P in Kuadran II */}
          <line x1="230" y1="125" x2="160" y2="68" stroke="#C8102E" strokeWidth="2.5" />
          <circle cx="160" cy="68" r="5" fill="#C8102E" />
          <text x="110" y="60" fontSize="12" fontWeight="bold" fill="#C8102E">P(-3/5, 4/5)</text>

          {/* Angle theta arc */}
          <path d="M 270 125 A 40 40 0 0 0 195 90" fill="none" stroke="#D97706" strokeWidth="2" />
          <text x="215" y="100" fontSize="12" fontWeight="bold" fill="#D97706">θ</text>

          <text x="90" y="40" fontSize="12" fill="#64748B">Kuadran II (90° &lt; θ &lt; 180°)</text>
        </svg>
      );

    // SOAL 21: Segitiga Siku-Siku Perbandingan Rasio
    case 'right_triangle_ratios':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Right Triangle */}
          <polygon points="100,180 340,180 340,60" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
          {/* Right angle marker */}
          <rect x="320" y="160" width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="1.5" />

          {/* Vertices */}
          <text x="80" y="190" fontSize="13" fontWeight="bold">K</text>
          <text x="350" y="190" fontSize="13" fontWeight="bold">L</text>
          <text x="350" y="55" fontSize="13" fontWeight="bold">M</text>

          {/* Labels */}
          <text x="210" y="200" fontSize="12" fill="#475569">Sisi Alas KL = 12</text>
          <text x="355" y="125" fontSize="12" fill="#475569">Sisi Tegak LM = 5</text>
          <text x="190" y="110" fontSize="12" fill="#2563EB" fontWeight="bold">KM = ?</text>

          {/* Angle alpha at K */}
          <path d="M 140 180 A 40 40 0 0 0 134 162" fill="none" stroke="#C8102E" strokeWidth="2" />
          <text x="145" y="172" fontSize="13" fontWeight="bold" fill="#C8102E">α</text>
        </svg>
      );

    // SOAL 23: Desain Konstruksi Atap Jalur Miring
    case 'roof_truss':
      return (
        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-56">
          <rect width="460" height="220" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Ground */}
          <line x1="40" y1="180" x2="420" y2="180" stroke="#334155" strokeWidth="2" />
          
          {/* Ramp / Roof Slope */}
          <polygon points="80,180 360,180 360,70" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <text x="70" y="195" fontSize="12" fontWeight="bold">P</text>
          <text x="365" y="195" fontSize="12" fontWeight="bold">Q</text>
          <text x="365" y="65" fontSize="12" fontWeight="bold">R</text>

          <text x="200" y="110" fontSize="12" fill="#DC2626" fontWeight="bold">Panjang Jalur L</text>
          <text x="375" y="130" fontSize="12" fill="#475569">Tinggi H</text>
          <text x="210" y="200" fontSize="12" fill="#475569">Jarak Horisontal D</text>

          {/* Angle beta */}
          <path d="M 120 180 A 40 40 0 0 0 114 163" fill="none" stroke="#1E293B" strokeWidth="2" />
          <text x="125" y="173" fontSize="12" fontWeight="bold">β</text>
        </svg>
      );

    // SOAL 26: Perbandingan Dua Box Plot Distribusi
    case 'box_plot_compare':
      return (
        <svg viewBox="0 0 480 230" className="w-full h-auto max-h-56">
          <rect width="480" height="230" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          {/* Axis */}
          <line x1="60" y1="190" x2="440" y2="190" stroke="#64748B" strokeWidth="1.5" />
          {[40, 50, 60, 70, 80, 90, 100].map((val, idx) => {
            const x = 70 + idx * 55;
            return (
              <g key={val}>
                <line x1={x} y1="190" x2={x} y2="197" stroke="#64748B" strokeWidth="1.5" />
                <text x={x - 8} y="212" fontSize="11" fill="#64748B">{val}</text>
              </g>
            );
          })}

          {/* Boxplot Kelas A */}
          <text x="60" y="65" fontSize="12" fontWeight="bold" fill="#C8102E">Kelas XII-A</text>
          <line x1="125" y1="75" x2="400" y2="75" stroke="#C8102E" strokeWidth="1.5" />
          <line x1="125" y1="65" x2="125" y2="85" stroke="#C8102E" strokeWidth="2" />
          <line x1="400" y1="65" x2="400" y2="85" stroke="#C8102E" strokeWidth="2" />
          <rect x="235" y="55" width="110" height="40" fill="#FEE2E2" stroke="#C8102E" strokeWidth="2" />
          <line x1="290" y1="55" x2="290" y2="95" stroke="#7F1D1D" strokeWidth="2.5" />

          {/* Boxplot Kelas B */}
          <text x="60" y="130" fontSize="12" fontWeight="bold" fill="#2563EB">Kelas XII-B</text>
          <line x1="180" y1="140" x2="380" y2="140" stroke="#2563EB" strokeWidth="1.5" />
          <line x1="180" y1="130" x2="180" y2="150" stroke="#2563EB" strokeWidth="2" />
          <line x1="380" y1="130" x2="380" y2="150" stroke="#2563EB" strokeWidth="2" />
          <rect x="210" y="120" width="135" height="40" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <line x1="260" y1="120" x2="260" y2="160" stroke="#1E40AF" strokeWidth="2.5" />
        </svg>
      );

    // SOAL 27: Grafik Sumbu Terpotong (Misleading Graph)
    case 'misleading_axis_chart':
      return (
        <svg viewBox="0 0 460 240" className="w-full h-auto max-h-60">
          <rect width="460" height="240" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="70" y1="190" x2="420" y2="190" stroke="#475569" strokeWidth="1.5" />
          <line x1="70" y1="40" x2="70" y2="190" stroke="#475569" strokeWidth="1.5" />

          {/* Jagged symbol on Y axis indicating truncation at 80 */}
          <path d="M 66 175 L 74 170 L 66 165 L 74 160" fill="none" stroke="#DC2626" strokeWidth="2" />
          <text x="25" y="188" fontSize="11" fill="#DC2626" fontWeight="bold">80 jt</text>
          <text x="25" y="130" fontSize="11" fill="#64748B">90 jt</text>
          <text x="20" y="65" fontSize="11" fill="#64748B">100 jt</text>

          {/* Bars */}
          <rect x="110" y="150" width="60" height="40" fill="#94A3B8" />
          <text x="125" y="145" fontSize="11" fontWeight="bold">82</text>
          <text x="115" y="210" fontSize="11">2023</text>

          <rect x="210" y="125" width="60" height="65" fill="#64748B" />
          <text x="225" y="120" fontSize="11" fontWeight="bold">86</text>
          <text x="215" y="210" fontSize="11">2024</text>

          <rect x="310" y="65" width="60" height="125" fill="#C8102E" />
          <text x="325" y="60" fontSize="11" fontWeight="bold" fill="#C8102E">94</text>
          <text x="315" y="210" fontSize="11">2025</text>

          <text x="160" y="25" fontSize="12" fontWeight="bold" fill="#1E293B">Grafik Penjualan Unit (Skala Sumbu Y Mulai 80)</text>
        </svg>
      );

    // SOAL 29: Diagram Pohon Peluang Bertahap
    case 'probability_tree':
      return (
        <svg viewBox="0 0 460 230" className="w-full h-auto max-h-56">
          <rect width="460" height="230" rx="12" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Root */}
          <circle cx="50" cy="115" r="5" fill="#1E293B" />
          <text x="30" y="100" fontSize="11" fill="#64748B">Awal</text>

          {/* Branch 1: Lolos Ujian 1 (p = 0.7) */}
          <line x1="50" y1="115" x2="180" y2="65" stroke="#059669" strokeWidth="2.5" />
          <text x="95" y="80" fontSize="11" fill="#059669" fontWeight="bold">0.7 (Lolos I)</text>

          {/* Branch 2: Gagal Ujian 1 (p = 0.3) */}
          <line x1="50" y1="115" x2="180" y2="165" stroke="#DC2626" strokeWidth="2.5" />
          <text x="90" y="155" fontSize="11" fill="#DC2626" fontWeight="bold">0.3 (Gagal I)</text>

          {/* Node 1 */}
          <circle cx="180" cy="65" r="4" fill="#059669" />
          {/* Subbranch 1a */}
          <line x1="180" y1="65" x2="340" y2="40" stroke="#059669" strokeWidth="2" />
          <text x="235" y="45" fontSize="11" fill="#059669">0.8 (Lolos II)</text>
          {/* Subbranch 1b */}
          <line x1="180" y1="65" x2="340" y2="90" stroke="#D97706" strokeWidth="2" />
          <text x="235" y="90" fontSize="11" fill="#D97706">0.2 (Gagal II)</text>

          {/* Node 2 */}
          <circle cx="180" cy="165" r="4" fill="#DC2626" />
          {/* Subbranch 2a */}
          <line x1="180" y1="165" x2="340" y2="140" stroke="#D97706" strokeWidth="2" />
          <text x="235" y="145" fontSize="11" fill="#D97706">0.4 (Remedial Lolos)</text>
          {/* Subbranch 2b */}
          <line x1="180" y1="165" x2="340" y2="190" stroke="#DC2626" strokeWidth="2" />
          <text x="235" y="195" fontSize="11" fill="#DC2626">0.6 (Gagal Total)</text>
        </svg>
      );

    default:
      return null;
  }
}
