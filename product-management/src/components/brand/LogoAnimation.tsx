import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const LogoAnimation = () => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = interpolate(
    frame % 120,
    [0, 60, 120],
    [1, 1.1, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-transparent flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ transform: `scale(${pulse})` }}
      >
        <defs>
          <linearGradient id="inventraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="100%" stopColor="#ff3a8c" />
          </linearGradient>
          <filter id="glowBlur">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Main cube structure */}
        <g filter="url(#glowBlur)">
          {/* Front face */}
          <path
            d="M30 40 L70 40 L70 80 L30 80 Z"
            fill="none"
            stroke="url(#inventraGrad)"
            strokeWidth="3"
            strokeDasharray="240"
            strokeDashoffset={240 - progress * 240}
          />
          {/* Top face */}
          <path
            d="M30 40 L50 20 L90 20 L70 40 Z"
            fill="none"
            stroke="url(#inventraGrad)"
            strokeWidth="3"
            strokeDasharray="240"
            strokeDashoffset={240 - progress * 240}
          />
          {/* Side face */}
          <path
            d="M70 40 L90 20 L90 60 L70 80 Z"
            fill="none"
            stroke="url(#inventraGrad)"
            strokeWidth="3"
            strokeDasharray="240"
            strokeDashoffset={240 - progress * 240}
          />
        </g>

        {/* Animated inventory dots */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            r="2"
            fill="url(#inventraGrad)"
            cx={interpolate(
              (frame + i * 20) % 60,
              [0, 60],
              [35 + i * 10, 65 - i * 10]
            )}
            cy={interpolate(
              (frame + i * 20) % 60,
              [0, 30, 60],
              [45, 75, 45]
            )}
            style={{
              opacity: interpolate(
                (frame + i * 20) % 60,
                [0, 30, 60],
                [0, 1, 0]
              )
            }}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
