import { Composition } from "remotion";
import { PicasFijasVideo } from "./PicasFijasVideo";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PicasFijasVideo"
        component={PicasFijasVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};