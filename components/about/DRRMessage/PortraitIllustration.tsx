"use client";

export function PortraitIllustration() {
  return (
    <svg viewBox="0 0 420 520" className="h-full w-full" role="img" aria-label="Stylized portrait illustration">
      <defs>
        <linearGradient id="portrait-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f0e3" />
          <stop offset="50%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#f2e8d7" />
        </linearGradient>
        <linearGradient id="portrait-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3d9c7" />
          <stop offset="100%" stopColor="#dfb79a" />
        </linearGradient>
        <linearGradient id="portrait-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1f2b" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="520" rx="34" fill="url(#portrait-bg)" />
      <circle cx="332" cy="78" r="56" fill="rgba(0,87,255,0.08)" />
      <circle cx="88" cy="94" r="22" fill="rgba(0,87,255,0.07)" />
      <path d="M108 420C126 372 164 336 210 324C260 310 314 332 338 378L354 412H94Z" fill="url(#portrait-suit)" />
      <path d="M154 272C160 240 180 214 210 204C246 192 282 202 300 228C314 248 316 276 308 304C298 340 274 366 240 376C204 386 172 376 152 348C138 328 148 296 154 272Z" fill="url(#portrait-skin)" />
      <path d="M165 260C172 236 188 220 210 214C232 208 256 214 270 230C280 242 282 260 278 280C270 322 248 350 220 356C192 362 172 344 162 322C154 304 158 280 165 260Z" fill="#f2cfb4" opacity="0.85" />
      <path d="M170 248C178 238 194 232 212 232C230 232 246 238 256 248C246 236 236 228 210 224C186 220 174 230 170 248Z" fill="#8b5e48" opacity="0.7" />
      <path d="M182 264C194 258 204 256 210 256C218 256 228 258 240 264" stroke="#6a4a37" strokeWidth="7" strokeLinecap="round" />
      <path d="M188 286C196 294 204 298 210 298C218 298 228 294 236 286" stroke="#6a4a37" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
      <path d="M148 330C164 312 184 302 210 300C238 298 262 306 278 322" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="14" strokeLinecap="round" />
      <path d="M160 338C176 328 192 322 210 322C228 322 244 328 260 338" fill="none" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
      <path d="M124 438C148 406 174 388 210 386C248 384 282 400 306 436" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="18" strokeLinecap="round" />
      <path d="M116 168C132 142 160 124 198 118C242 112 286 122 312 146" fill="none" stroke="rgba(0,87,255,0.18)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="126" cy="126" r="3" fill="#0057ff" />
      <circle cx="292" cy="120" r="3" fill="#0057ff" />
      <circle cx="96" cy="458" r="2.5" fill="#0057ff" opacity="0.45" />
      <circle cx="332" cy="438" r="2.5" fill="#0057ff" opacity="0.45" />
    </svg>
  );
}
