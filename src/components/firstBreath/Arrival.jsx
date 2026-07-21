// src/components/firstBreath/Arrival.jsx
// Arrival: a brief pause with the finished sprout visible, then a slow
// crossfade into the real Sthira logo, followed by the "STHIRA / Steady.
// Grounded. Present." message and a Begin button.
//
// Batch 80: removed a redundant prefersReducedMotion branch in the
// opacity calculations — both branches evaluated to the same value in
// every case, since the actual reduced-motion behavior for this
// crossfade is already fully handled by the global CSS rule (which
// collapses .fb-crossfade-layer's transition duration under
// prefers-reduced-motion). Removed the now-unused
// usePrefersReducedMotion import/call along with it. Also: Button now
// correctly forwards the ref passed below, so focus properly moves to
// the Begin button once it appears.

import { useEffect, useRef, useState } from "react";
import SthiraLogo from "../common/SthiraLogo";
import Button from "../common/Button";
import FirstBreathAnimationWrapper from "./FirstBreathAnimationWrapper";
import FirstBreathTransition from "./FirstBreathTransition";
import SproutIllustration from "./SproutIllustration";
import { useArrival } from "../../hooks/useArrival";
import { ARRIVAL_MESSAGE_DELAY_MS } from "../../constants/firstBreath";

export default function Arrival({ onComplete }) {
  const { stage, isComplete } = useArrival({ isActive: true });
  const [messageVisible, setMessageVisible] = useState(false);
  const beginRef = useRef(null);

  const isTransforming = stage.id === "transforming" || isComplete;

  useEffect(() => {
    if (!isComplete) return undefined;
    const timer = setTimeout(
      () => setMessageVisible(true),
      ARRIVAL_MESSAGE_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [isComplete]);

  useEffect(() => {
    if (messageVisible) beginRef.current?.focus();
  }, [messageVisible]);

  const sproutOpacity = isTransforming ? 0 : 1;
  const logoOpacity = isTransforming ? 1 : 0;

  return (
    <div className="flex flex-col items-center gap-10 w-full min-h-[70vh] justify-center">
      <FirstBreathAnimationWrapper className="relative h-20 w-20 flex items-center justify-center">
        <div
          className="fb-crossfade-layer absolute inset-0 flex items-center justify-center"
          style={{ opacity: sproutOpacity }}
        >
          <SproutIllustration stageId="leaves" />
        </div>
        <div
          className="fb-crossfade-layer absolute inset-0 flex items-center justify-center"
          style={{ opacity: logoOpacity }}
        >
          <SthiraLogo size={56} iconSize={26} />
        </div>
      </FirstBreathAnimationWrapper>

      <div className="min-h-[4.5rem] flex flex-col items-center justify-center gap-6">
        {messageVisible && (
          <FirstBreathTransition stepKey="arrival-message">
            <div className="flex flex-col items-center gap-8">
              <div className="space-y-2">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink">
                  Sthira
                </p>
                <p className="text-sm text-stone font-light leading-relaxed">
                  Steady. Grounded. Present.
                </p>
              </div>

              <Button ref={beginRef} variant="primary" onClick={onComplete}>
                Begin
              </Button>
            </div>
          </FirstBreathTransition>
        )}
      </div>
    </div>
  );
}
