# Creating a Video with Remotion: Picasfijas

## Project Overview

- **Goal**: Create a vertical video explaining/showcasing the Picasfijas game
- **Format**: 1080x1920 (vertical - ideal for TikTok, Instagram Reels, YouTube Shorts)
- **Duration**: 10 seconds (300 frames at 30 FPS)
- **Tech Stack**: Remotion 4.0.407, React 19, TypeScript, Tailwind CSS v4

---

## Step 1: Project Setup

### Creating the Project

```bash
npx create-video@latest picasyfijas-video
```

This scaffolds a new Remotion project with:
- TypeScript configuration
- ESLint with Remotion-specific rules
- Basic composition structure

### Project Structure

```
picasyfijas-video/
├── src/
│   ├── index.ts            # Entry point - registers root component
│   ├── Root.tsx            # Defines compositions (video specs)
│   ├── PicasFijasVideo.tsx # All 5 scenes live here
│   └── index.css           # Tailwind imports
├── public/
│   └── icon-512.png        # App icon asset
├── remotion.config.ts      # Remotion configuration
└── package.json            # Dependencies and scripts
```

### Key Commands

```bash
npm run dev      # Start Remotion Studio (preview & edit)
npm run build    # Bundle for rendering
npx remotion render src/index.ts PicasFijasVideo out/video.mp4  # Render video
```

---

## Step 2: Configuring the Composition

In `Root.tsx`, I defined the video specifications:

```tsx
<Composition
  id="PicasFijasVideo"
  component={PicasFijasVideo}
  durationInFrames={300}    // 10 seconds
  fps={30}                  // 30 frames per second
  width={1080}              // Vertical format
  height={1920}
/>
```

**Why these choices?**
- **Vertical format (1080x1920)**: Optimized for mobile-first platforms
- **30 FPS**: Standard for web video, good balance of smoothness and file size
- **10 seconds**: Short-form content performs better on social media

---

## Step 3: Adding Tailwind CSS

Remotion 4.0 supports Tailwind v4 out of the box:

1. Added `@remotion/tailwind-v4` package
2. Configured in `remotion.config.ts`:

```ts
Config.overrideWebpackConfig((config) => {
  return enableTailwind(config);
});
```

3. Imported in `index.css`:
```css
@import "tailwindcss";
```

---

## Step 4: Building the Video Content

All scenes live in `src/PicasFijasVideo.tsx`. The video uses a cream background (`#EBEBD3`) and Space Mono font throughout.

### Video Timeline

| Scene | Frames | Duration | Description |
|-------|--------|----------|-------------|
| Logo | 0-30 | 1s | App intro with bouncing logo |
| GuessScene | 30-90 | 2s | Shows secret code and typing guess |
| BullExplanation | 90-150 | 2s | Explains "Fija/Bull" concept |
| CowExplanation | 150-210 | 2s | Explains "Pica/Cow" concept |
| CTA | 210-300 | 3s | Call to action with URL |

### Scene 1: Logo (frames 0-30)

Introduces the game with the app icon and title.

```tsx
const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bounces in with spring physics
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Title fades in after logo appears (frames 15-30)
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img src={staticFile("icon-512.png")} style={{ transform: `scale(${scale})` }} />
      <p style={{ opacity: titleOpacity }}>Picas y Fijas</p>
    </AbsoluteFill>
  );
};
```

**Techniques used:**
- `spring()` for natural bounce animation on logo
- `interpolate()` for fade-in on title text
- `staticFile()` to load image from `/public` folder

### Scene 2: GuessScene (frames 30-90)

Shows the game mechanic: a secret code and a player's guess being typed.

```tsx
const GuessScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Secret code fades in
  const secretOpacity = interpolate(frame, [0, 15], [0, 1], { /* clamp */ });

  // Guess digits appear one by one (typewriter effect)
  const guess = "1456";
  const visibleDigits = Math.floor(
    interpolate(frame, [20, 50], [0, 4], { /* clamp */ })
  );

  return (
    <AbsoluteFill>
      {/* Secret: ???? */}
      {/* Guess: digits appear based on visibleDigits */}
      {guess.split("").map((digit, i) => (
        <span style={{ opacity: i < visibleDigits ? 1 : 0 }}>{digit}</span>
      ))}
    </AbsoluteFill>
  );
};
```

**Techniques used:**
- Typewriter effect using `interpolate()` + `Math.floor()` to reveal digits progressively
- Mapping over string characters for digit display

### Scene 3: BullExplanation (frames 90-150)

Explains what a "Bull" (Fija) means: correct digit in correct position.

```tsx
const BullExplanation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Highlight animation starts after 15 frames
  const highlightScale = spring({
    frame: frame - 15,  // Delayed start
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Toggle between English/Spanish every 0.5 seconds
  const showSpanish = Math.floor(frame / 15) % 2 === 1 && frame > 45;

  const secret = "1234";
  const guess = "1456";

  return (
    <AbsoluteFill>
      {/* Highlights position 0 (the "1") in both secret and guess */}
      {secret.split("").map((digit, i) => (
        <span style={{
          backgroundColor: i === 0 ? "#38618C" : "transparent",
          transform: i === 0 ? `scale(${highlightScale})` : "scale(1)",
        }}>{digit}</span>
      ))}
      <p>🐂 {showSpanish ? "1 Fija" : "1 Bull"}</p>
    </AbsoluteFill>
  );
};
```

**Techniques used:**
- Delayed spring animation with `frame - 15`
- Language toggle using modulo for bilingual content
- Conditional styling to highlight matching digits

### Scene 4: CowExplanation (frames 150-210)

Explains what a "Cow" (Pica) means: correct digit in wrong position.

Same structure as BullExplanation, but:
- Highlights position 3 in secret (the "4")
- Highlights position 1 in guess (the "4")
- Shows "🐄 1 Pica / 1 Cow"

**Key insight:** The "4" exists in both numbers but in different positions.

### Scene 5: CTA (frames 210-300)

Call to action encouraging viewers to play the game.

```tsx
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { /* clamp */ });

  // URL button bounces in with delay
  const urlScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Toggle language every ~0.67 seconds
  const showSpanish = Math.floor(frame / 20) % 2 === 1;

  return (
    <AbsoluteFill>
      <Img src={staticFile("icon-512.png")} style={{ transform: `scale(${logoScale})` }} />
      <p>{showSpanish ? "¡Juega ahora!" : "Play now!"}</p>
      <p style={{ transform: `scale(${urlScale})` }}>picasyfijas.com</p>
    </AbsoluteFill>
  );
};
```

**Techniques used:**
- Staggered animations (logo → text → URL button)
- Bilingual text toggle
- Button-style URL with border and background

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cream | `#EBEBD3` | Background |
| Dark Brown | `#3B1F2B` | Primary text |
| Blue | `#38618C` | Bulls/Fijas highlight, secondary elements |
| Coral | `#FE938C` | Cows/Picas highlight, guess digits |
| Light Blue | `#4281A4` | Subtitle text |

### Assets

- `public/icon-512.png` - App icon (300x300 display, 200x200 in CTA)

---

## Step 5: Key Remotion Concepts Used

### useCurrentFrame() & useVideoConfig()

Gets the current frame and video settings:

```tsx
const frame = useCurrentFrame();      // Current frame number (starts at 0)
const { fps } = useVideoConfig();     // Frame rate (30 in this project)
```

### Sequence

Organizes video into timed sections. Each scene resets its internal frame count to 0:

```tsx
<Sequence from={0} durationInFrames={30}>
  <Logo />           {/* frames 0-30, Logo sees frame 0-29 */}
</Sequence>
<Sequence from={30} durationInFrames={60}>
  <GuessScene />     {/* frames 30-90, GuessScene sees frame 0-59 */}
</Sequence>
```

### interpolate()

Maps frame numbers to animation values (linear):

```tsx
// Fade in from frame 15 to 30
const opacity = interpolate(frame, [15, 30], [0, 1], {
  extrapolateLeft: "clamp",   // Don't go below 0
  extrapolateRight: "clamp",  // Don't go above 1
});

// Typewriter effect: reveal 4 digits over 30 frames
const visibleDigits = Math.floor(interpolate(frame, [20, 50], [0, 4], { /* clamp */ }));
```

### spring()

Physics-based bounce animations (more natural than linear):

```tsx
const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,      // How quickly it settles (higher = less bounce)
    stiffness: 100,   // How snappy the animation is
  },
});
```

**Delayed spring** - subtract frames to start later:

```tsx
const urlScale = spring({
  frame: frame - 30,  // Starts 30 frames (1 second) after scene begins
  fps,
  config: { damping: 10, stiffness: 80 },
});
```

### AbsoluteFill

Full-screen container with absolute positioning:

```tsx
<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
  {/* Content centered on screen */}
</AbsoluteFill>
```

### staticFile()

References files from the `/public` folder:

```tsx
<Img src={staticFile("icon-512.png")} />
```

---

## Step 6: Rendering the Final Video

```bash
# Preview in browser
npm run dev

# Render to MP4
npx remotion render src/index.ts PicasFijasVideo out/video.mp4

# Render with specific codec
npx remotion render src/index.ts PicasFijasVideo out/video.mp4 --codec h264
```

---

## Lessons Learned

1. **Sequences reset frame count**: Inside a `<Sequence>`, `useCurrentFrame()` returns 0 at the start of that sequence, not the global frame number. This makes each scene self-contained.

2. **Delayed animations with subtraction**: To start an animation later in a scene, subtract frames: `spring({ frame: frame - 30, ... })`. If the result is negative, spring handles it gracefully.

3. **Clamp prevents overshoot**: Always use `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` in `interpolate()` to prevent values going beyond your intended range.

4. **Spring config matters**: `damping` controls bounce (lower = more bouncy), `stiffness` controls speed. For UI elements: `damping: 10-15, stiffness: 80-120`.

5. **Bilingual toggle with modulo**: Simple language switching using `Math.floor(frame / 15) % 2 === 1` creates a flipping effect between two languages.

---

## Resources

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Examples](https://www.remotion.dev/docs/examples)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Work Log

### 2026-01-21

- Created initial Remotion project
- Configured vertical video format (1080x1920)
- Added Tailwind CSS v4 integration
- Set up 10-second duration at 30 FPS
- Created 5 scenes in `PicasFijasVideo.tsx`:
  - **Logo**: Bouncing app icon with fade-in title
  - **GuessScene**: Typewriter effect for entering guess digits
  - **BullExplanation**: Highlights matching digit+position with bilingual text
  - **CowExplanation**: Highlights matching digit in wrong position
  - **CTA**: Staggered call-to-action with URL button
- Used spring animations for natural bounce effects
- Implemented bilingual toggle (English/Spanish) for accessibility
