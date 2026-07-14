// src/pages/CompanionSpace.jsx
// Gentle Companion — today's message, refresh, favorites.
// Warm, paper-like, editorial. No AI. No chat. Fully deterministic.

import { Heart } from "lucide-react";
import { useCompanion } from "../hooks/useCompanion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import FeatureHeader from "../components/layout/FeatureHeader";
import CompanionCard from "../components/companion/CompanionCard";

export default function CompanionSpace() {
  const {
    currentMessage,
    categoryLabel,
    currentIsFavorited,
    favoriteMessages,
    favoritesCount,
    refreshMessage,
    handleToggleFavorite,
    isFav,
  } = useCompanion();

  useDocumentTitle("Gentle Companion");

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      {/* Ambient orb */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 360,
            height: 360,
            top: "-8%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            bottom: "18%",
            left: "-6%",
            background:
              "radial-gradient(circle, rgba(134,159,138,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader title="Gentle Companion" />

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="relative max-w-lg mx-auto px-4 py-8 space-y-10 pb-20">
        {/* Subheading */}
        <p className="text-sm text-stone font-light leading-relaxed">
          A quiet place for small reminders. Nothing here is required of you.
        </p>

        {/* Today's message */}
        <section className="space-y-3">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70 px-1">
            Today's message
          </p>
          <CompanionCard
            message={currentMessage}
            categoryLabel={categoryLabel}
            isFavorited={currentIsFavorited}
            onToggleFavorite={handleToggleFavorite}
            onRefresh={refreshMessage}
            size="full"
          />
        </section>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: "rgba(185,175,160,0.18)" }}
        />

        {/* Favorites section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Heart
              size={13}
              strokeWidth={1.5}
              className="text-stone opacity-50"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
              Saved messages
              {favoritesCount > 0 && (
                <span className="ml-1.5 font-light normal-case tracking-normal opacity-60">
                  · {favoritesCount}
                </span>
              )}
            </p>
          </div>

          {favoritesCount === 0 ? (
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "rgba(185,175,160,0.06)",
                border: "1px dashed rgba(185,175,160,0.25)",
              }}
            >
              <p className="text-sm text-stone font-light leading-relaxed">
                Tap the heart on any message to save it here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favoriteMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(250,246,240,1) 100%)",
                    border: "1px solid rgba(185,175,160,0.22)",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  <p className="font-display font-light text-ink text-sm leading-[1.75]">
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone font-light opacity-50 capitalize">
                      {msg.category.replace("-", " ")}
                    </span>
                    <button
                      onClick={() => handleToggleFavorite(msg)}
                      className="p-1.5 rounded-xl transition-all"
                      style={{ color: "#c07860" }}
                      aria-label="Remove from saved"
                    >
                      <Heart size={14} strokeWidth={1.5} fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-stone font-light italic opacity-40 pt-2">
          Messages are offered gently, without expectation.
        </p>
      </div>
    </div>
  );
}
