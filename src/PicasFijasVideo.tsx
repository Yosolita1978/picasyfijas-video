import {
    AbsoluteFill,
    Img,
    staticFile,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
  } from "remotion";
  
  const Logo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
  
    const scale = spring({
      frame,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });
  
    const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <Img
          src={staticFile("icon-512.png")}
          style={{
            width: 300,
            height: 300,
            borderRadius: 40,
            transform: `scale(${scale})`,
          }}
        />
        <p
          style={{
            color: "#3B1F2B",
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            opacity: titleOpacity,
          }}
        >
          Picas y Fijas
        </p>
      </AbsoluteFill>
    );
  };
  
  const GuessScene: React.FC = () => {
    const frame = useCurrentFrame();
  
    const secretOpacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const guess = "1456";
    const visibleDigits = Math.floor(
      interpolate(frame, [20, 50], [0, 4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    );
  
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: secretOpacity,
          }}
        >
          <p style={{ color: "#3B1F2B", fontSize: 36, margin: 0 }}>Secret Code</p>
          <div style={{ display: "flex", gap: 20 }}>
            {"????".split("").map((char, i) => (
              <span
                key={i}
                style={{
                  color: "#38618C",
                  fontSize: 80,
                  fontWeight: 700,
                  width: 80,
                  textAlign: "center",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p
            style={{
              color: "#3B1F2B",
              fontSize: 36,
              margin: 0,
              opacity: secretOpacity,
            }}
          >
            Your Guess
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {guess.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  color: "#FE938C",
                  fontSize: 80,
                  fontWeight: 700,
                  width: 80,
                  textAlign: "center",
                  opacity: i < visibleDigits ? 1 : 0,
                }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    );
  };
  
  const BullExplanation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
  
    const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const highlightScale = spring({
      frame: frame - 15,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });
  
    const textOpacity = interpolate(frame, [30, 45], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const showSpanish = Math.floor(frame / 15) % 2 === 1 && frame > 45;
  
    const secret = "1234";
    const guess = "1456";
  
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 60,
          opacity: contentOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#3B1F2B", fontSize: 32, margin: 0 }}>Secret Code</p>
          <div style={{ display: "flex", gap: 16 }}>
            {secret.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  color: i === 0 ? "#EBEBD3" : "#38618C",
                  backgroundColor: i === 0 ? "#38618C" : "transparent",
                  fontSize: 72,
                  fontWeight: 700,
                  width: 80,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  transform: i === 0 ? `scale(${highlightScale})` : "scale(1)",
                }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#3B1F2B", fontSize: 32, margin: 0 }}>Your Guess</p>
          <div style={{ display: "flex", gap: 16 }}>
            {guess.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  color: i === 0 ? "#EBEBD3" : "#FE938C",
                  backgroundColor: i === 0 ? "#38618C" : "transparent",
                  fontSize: 72,
                  fontWeight: 700,
                  width: 80,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  transform: i === 0 ? `scale(${highlightScale})` : "scale(1)",
                }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: textOpacity,
          }}
        >
          <p
            style={{
              color: "#38618C",
              fontSize: 56,
              fontWeight: 700,
              margin: 0,
            }}
          >
            🐂 {showSpanish ? "1 Fija" : "1 Bull"}
          </p>
          <p
            style={{
              color: "#4281A4",
              fontSize: 28,
              margin: 0,
            }}
          >
            {showSpanish ? "Número y posición correcta" : "Right number & position"}
          </p>
        </div>
      </AbsoluteFill>
    );
  };
  
  const CowExplanation: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
  
    const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const highlightScale = spring({
      frame: frame - 15,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });
  
    const textOpacity = interpolate(frame, [30, 45], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const showSpanish = Math.floor(frame / 15) % 2 === 1 && frame > 45;
  
    const secret = "1234";
    const guess = "1456";
  
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 60,
          opacity: contentOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#3B1F2B", fontSize: 32, margin: 0 }}>Secret Code</p>
          <div style={{ display: "flex", gap: 16 }}>
            {secret.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  color: i === 3 ? "#EBEBD3" : "#38618C",
                  backgroundColor: i === 3 ? "#FE938C" : "transparent",
                  fontSize: 72,
                  fontWeight: 700,
                  width: 80,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  transform: i === 3 ? `scale(${highlightScale})` : "scale(1)",
                }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ color: "#3B1F2B", fontSize: 32, margin: 0 }}>Your Guess</p>
          <div style={{ display: "flex", gap: 16 }}>
            {guess.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  color: i === 1 ? "#EBEBD3" : "#FE938C",
                  backgroundColor: i === 1 ? "#FE938C" : "transparent",
                  fontSize: 72,
                  fontWeight: 700,
                  width: 80,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  transform: i === 1 ? `scale(${highlightScale})` : "scale(1)",
                }}
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: textOpacity,
          }}
        >
          <p
            style={{
              color: "#FE938C",
              fontSize: 56,
              fontWeight: 700,
              margin: 0,
            }}
          >
            🐄 {showSpanish ? "1 Pica" : "1 Cow"}
          </p>
          <p
            style={{
              color: "#4281A4",
              fontSize: 28,
              margin: 0,
            }}
          >
            {showSpanish ? "Número correcto, posición incorrecta" : "Right number, wrong position"}
          </p>
        </div>
      </AbsoluteFill>
    );
  };
  
  const CTA: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
  
    const logoScale = spring({
      frame,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });
  
    const textOpacity = interpolate(frame, [15, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  
    const urlScale = spring({
      frame: frame - 30,
      fps,
      config: {
        damping: 10,
        stiffness: 80,
      },
    });
  
    const showSpanish = Math.floor(frame / 20) % 2 === 1;
  
    return (
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <Img
          src={staticFile("icon-512.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 30,
            transform: `scale(${logoScale})`,
          }}
        />
  
        <p
          style={{
            color: "#3B1F2B",
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            opacity: textOpacity,
          }}
        >
          {showSpanish ? "¡Juega ahora!" : "Play now!"}
        </p>
  
        <p
          style={{
            color: "#38618C",
            fontSize: 52,
            fontWeight: 700,
            margin: 0,
            transform: `scale(${urlScale})`,
            backgroundColor: "#EBEBD3",
            padding: "16px 32px",
            borderRadius: 16,
            border: "4px solid #38618C",
          }}
        >
          picasyfijas.com
        </p>
      </AbsoluteFill>
    );
  };
  
  export const PicasFijasVideo: React.FC = () => {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#EBEBD3",
          fontFamily: "Space Mono, monospace",
        }}
      >
        <Sequence from={0} durationInFrames={30}>
          <Logo />
        </Sequence>
        <Sequence from={30} durationInFrames={60}>
          <GuessScene />
        </Sequence>
        <Sequence from={90} durationInFrames={60}>
          <BullExplanation />
        </Sequence>
        <Sequence from={150} durationInFrames={60}>
          <CowExplanation />
        </Sequence>
        <Sequence from={210} durationInFrames={90}>
          <CTA />
        </Sequence>
      </AbsoluteFill>
    );
  };