// src/utils/launchSession.js
// In-memory (not persisted) session flag for the launch experience.
// Same pattern as the in-memory scroll-position cache in
// useScrollRestoration.js — resets automatically on a full page reload,
// which is exactly the desired behavior: a fresh reload counts as a
// new "launch," so the splash is eligible to show again.

let splashCompleted = false;

export function hasCompletedSplashThisSession() {
  return splashCompleted;
}

export function markSplashCompletedThisSession() {
  splashCompleted = true;
}
