import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Clinic Stock Tracker`
      : "Clinic Stock Tracker";
  }, [title]);
}