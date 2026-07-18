// src/hooks/useSafeBack.js
// Shared "go back safely" navigation helper.
//
// Batch 74: extracted from logic that previously existed only inline in
// LettersToSelf.jsx. Plain navigate(-1) silently does nothing if the
// current page is the first entry in the browser's session history
// (e.g. opened via a bookmark, PWA shortcut, or direct/deep link rather
// than by navigating from within the app) — this was the exact root
// cause of a previously-diagnosed "back button does nothing" bug.
// location.key === "default" reliably signals "no prior history in
// this session," so this hook falls back to a safe destination
// (Home, unless a different fallbackPath is passed) in that case.

import { useNavigate, useLocation } from "react-router-dom";
import { PATHS } from "../constants/navigation";

export function useSafeBack(fallbackPath = PATHS.HOME) {
  const navigate = useNavigate();
  const location = useLocation();

  return function safeBack() {
    if (location.key === "default") {
      navigate(fallbackPath);
    } else {
      navigate(-1);
    }
  };
}
