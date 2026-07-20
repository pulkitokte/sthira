// src/components/firstBreath/Awakening.jsx
// The Awakening: a brief silent rest, then the seed softens, cracks,
// sprouts, and unfurls two leaves, followed by one line of text and a
// tap-to-continue. Runs exactly once. Entirely separate from
// BreathingRitual/useBreathingRitual — the only thing connecting them
// is that FirstBreath.jsx mounts this one after that one finishes.

import { useEffect, useRef, useState } from "react";
import FirstBreathAnimationWrapper from "./FirstBreathAnimationWrapper";
import FirstBreathTransition from "./FirstBreathTransition";
import SproutIllustration from "./SproutIllustration";
import { useAwakening } from "../../hooks/useAwakening";
import { AWAKENING_MESSAGE_DELAY_MS } from "../../constants/firstBreath";

export default function Awakening({ onContinue }) {
  const { stage, isComplete } = useAwakening({ isActive: true });
  const [messageVisible, setMessageVisible] = useState(false);
  const regionRef = useRef(null);

  useEffect(() => {
    if (!isComplete) return undefined;
    const timer = setTimeout(
      () => setMessageVisible(true),
      AWAKENING_MESSAGE_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [isComplete]);

  useEffect(() => {
    if (messageVisible) regionRef.current?.focus();
  }, [messageVisible]);

  const handleActivate = () => {
    if (messageVisible) onContinue();
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && messageVisible) {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      ref={regionRef}
      role={messageVisible ? "button" : undefined}
      tabIndex={messageVisible ? 0 : -1}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={messageVisible ? "Continue" : undefined}
      aria-live="polite"
      className={`flex flex-col items-center gap-10 w-full min-h-[70vh] justify-center focus:outline-none ${
        messageVisible ? "cursor-pointer" : ""
      }`}
    >
      <FirstBreathAnimationWrapper className="h-20 w-20 flex items-center justify-center">
        <SproutIllustration stageId={stage.id} />
      </FirstBreathAnimationWrapper>

      <div className="min-h-[3.5rem] flex flex-col items-center justify-center gap-4">
        {messageVisible && (
          <FirstBreathTransition stepKey="awakening-message">
            <div className="flex flex-col items-center gap-4">
              <p className="font-display text-lg font-light text-ink leading-relaxed">
                Life begins quietly.
              </p>
              <span className="fb-tap-indicator text-stone opacity-40 text-sm font-display font-light">
                Tap to continue
              </span>
            </div>
          </FirstBreathTransition>
        )}
      </div>
    </div>
  );
}
