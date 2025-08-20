"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RightClickDisable = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      // Right click block
      const disableRightClick = (e: MouseEvent) => e.preventDefault();

      // F12, Ctrl+Shift+I, Ctrl+U block
      const blockKeys = (e: KeyboardEvent) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
          (e.ctrlKey && e.key.toLowerCase() === "u")
        ) {
          e.preventDefault();
          toast.success("Inspecting is disabled!", {
            icon: "⚠️",
            style: {
              borderRadius: "12px",
              background: "#F59E0B",
              color: "#fff",
              fontWeight: "600",
            },
          });
        }
      };

      document.addEventListener("contextmenu", disableRightClick);
      document.addEventListener("keydown", blockKeys);

      return () => {
        document.removeEventListener("contextmenu", disableRightClick);
        document.removeEventListener("keydown", blockKeys);
      };
    }
  }, []);

  return null;
};

export default RightClickDisable;
