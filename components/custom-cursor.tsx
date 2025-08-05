'use client';

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;
    if (!cursor) return;

    const moveHandler = (e: MouseEvent) => {
      cursor.style.top = `${e.pageY - 10}px`;
      cursor.style.left = `${e.pageX - 10}px`;
    };

    const clickHandler = () => {
      cursor.classList.add("expand");
      setTimeout(() => cursor.classList.remove("expand"), 500);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return null;
}
