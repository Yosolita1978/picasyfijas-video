# Picas y Fijas - Remotion Video

A promotional video for [Picas y Fijas](https://picasyfijas.com), created with React and Remotion.

## The Video

https://github.com/user-attachments/assets/picasyfijas.mp4

> If the video doesn't load above, you can find it in [`out/picasyfijas.mp4`](out/picasyfijas.mp4)

## What's in the video?

| Scene | Duration | Description |
|-------|----------|-------------|
| Logo | 1s | App icon bounces in with title |
| Guess | 2s | Shows secret code and typing animation |
| Bull/Fija | 2s | Explains correct digit + position |
| Cow/Pica | 2s | Explains correct digit, wrong position |
| CTA | 3s | Call to action with URL |

## Tech Stack

- [Remotion](https://remotion.dev) 4.0 - React-based video creation
- React 19
- TypeScript
- Tailwind CSS v4

## Commands

```bash
# Install dependencies
npm install

# Preview in browser
npm run dev

# Render to MP4
npx remotion render src/index.ts PicasFijasVideo out/picasyfijas.mp4
```

## Project Structure

```
src/
├── Root.tsx              # Composition config (1080x1920, 30fps, 10s)
├── PicasFijasVideo.tsx   # All 5 scenes
└── index.css             # Tailwind imports

out/
└── picasyfijas.mp4       # Rendered video
```

## Learn More

See [`PROCESS.md`](PROCESS.md) for a detailed breakdown of how this video was built.
