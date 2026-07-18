import FeatureHeader from "../components/layout/FeatureHeader";
import { useSanctuary, SANCTUARY_SECTION } from "../hooks/useSanctuary";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import SanctuaryWelcomeCard from "../components/sanctuary/SanctuaryWelcomeCard";
import AmbienceSelector from "../components/sanctuary/AmbienceSelector";
import QuietCorner from "../components/sanctuary/QuietCorner";
import GroundingRitual from "../components/sanctuary/GroundingRitual";

function Divider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(185,175,160,0.18)" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "rgba(185,175,160,0.3)" }}
      />
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(185,175,160,0.18)" }}
      />
    </div>
  );
}

export default function DigitalSanctuary() {
  const sanctuary = useSanctuary();
  useDocumentTitle("Digital Sanctuary");

  const {
    section,
    message,
    ambience,
    exercise,
    groundingStep,
    groundingComplete,
    currentGroundingStep,
    refreshMessage,
    selectAmbience,
    refreshExercise,
    startGrounding,
    nextGroundingStep,
    finishGrounding,
  } = sanctuary;

  const isGrounding = section === SANCTUARY_SECTION.GROUNDING;

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(180deg, #f8f6f2 0%, #f4f1ec 40%, #f7f4f0 100%)",
      }}
    >
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "-10%",
            right: "-15%",
            background:
              "radial-gradient(circle, rgba(134,159,138,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            bottom: "10%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(185,160,120,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader
        title={isGrounding ? "Grounding" : "Digital Sanctuary"}
        onBack={isGrounding ? finishGrounding : undefined}
        showSettings={!isGrounding}
        rightAction={
          !isGrounding ? (
            <p className="text-xs text-stone font-light italic opacity-50 pr-1">
              private &amp; quiet
            </p>
          ) : null
        }
      />

      <div className="relative max-w-lg mx-auto px-4 py-10 space-y-10 pb-20">
        {isGrounding && (
          <GroundingRitual
            currentStep={currentGroundingStep}
            stepIndex={groundingStep}
            isComplete={groundingComplete}
            onNext={nextGroundingStep}
            onFinish={finishGrounding}
          />
        )}

        {!isGrounding && (
          <>
            <section>
              <SanctuaryWelcomeCard
                message={message}
                onRefresh={refreshMessage}
              />
            </section>

            <Divider />

            <section>
              <AmbienceSelector selected={ambience} onSelect={selectAmbience} />
            </section>

            <Divider />

            <section>
              <QuietCorner exercise={exercise} onRefresh={refreshExercise} />
            </section>

            <Divider />

            <section className="space-y-4">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone">
                Grounding Ritual
              </p>
              <div
                className="rounded-3xl p-6 space-y-4"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(134,159,138,0.07) 0%, rgba(185,175,160,0.08) 100%)",
                  border: "1px solid rgba(134,159,138,0.15)",
                }}
              >
                <div className="space-y-2">
                  <p
                    className="font-display font-light text-ink"
                    style={{ fontSize: "1rem" }}
                  >
                    5 · 4 · 3 · 2 · 1
                  </p>
                  <p className="text-sm text-stone font-light leading-relaxed">
                    A simple sensory exercise to bring you fully into this
                    moment. Takes two to five minutes. No pressure.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["See 5", "Feel 4", "Hear 3", "Smell 2", "Taste 1"].map(
                    (s) => (
                      <span
                        key={s}
                        className="text-xs font-light px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(134,159,138,0.1)",
                          border: "1px solid rgba(134,159,138,0.2)",
                          color: "#5a7060",
                        }}
                      >
                        {s}
                      </span>
                    ),
                  )}
                </div>

                <button
                  onClick={startGrounding}
                  className="w-full py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-all duration-200 active:scale-[0.98] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px]"
                  style={{ background: "var(--accent-soft)" }}
                >
                  Start grounding
                </button>
              </div>
            </section>

            <p className="text-center text-xs text-stone font-light italic opacity-40 pt-4">
              This space is yours. No data leaves this device.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
