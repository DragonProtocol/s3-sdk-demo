import loadGif from "./loading.gif";
export default function Loading({ size = 20 }) {
  return <img width={size} src={loadGif} alt="" />;
}
