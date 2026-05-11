import { useRef } from "react";

export const useSmoothMarker = () => {
  const frame = useRef(null);
  const prev = useRef(null);

  const move = (setState, newPos) => {
    if (!prev.current) {
      prev.current = newPos;
      setState(newPos);
      return;
    }

    cancelAnimationFrame(frame.current);

    const start = prev.current;
    const end = newPos;
    let t = 0;

    const animate = () => {
      t += 0.05;

      const lat = start[0] + (end[0] - start[0]) * t;
      const lng = start[1] + (end[1] - start[1]) * t;

      setState([lat, lng]);

      if (t < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        prev.current = end;
      }
    };

    animate();
  };

  return move;
};