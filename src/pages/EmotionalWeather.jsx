import { Pencil } from "lucide-react";
import {
  useEmotionalWeather,
  WEATHER_VIEW,
} from "../hooks/useEmotionalWeather";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import FeatureHeader from "../components/layout/FeatureHeader";
import Button from "../components/common/Button";
import WeatherPicker from "../components/weather/WeatherPicker";
import WeatherEntryCard from "../components/weather/WeatherEntryCard";
import EmotionalLandscape from "../components/weather/EmotionalLandscape";
import WeatherReflection from "../components/weather/WeatherReflection";
import { getWeatherById } from "../data/emotionalWeatherData";
import { formatWeatherTime } from "../utils/emotionalWeather";

function WeatherTabs({ view, onToday, onTimeline }) {
  const tabs = [
    { id: WEATHER_VIEW.TODAY, label: "Today", onClick: onToday },
    { id: WEATHER_VIEW.TIMELINE, label: "History", onClick: onTimeline },
  ];

  return (
    <div
      className="flex rounded-2xl p-1 gap-1"
      style={{ background: "rgba(185,175,160,0.1)" }}
    >
      {tabs.map((tab) => {
        const isActive = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={tab.onClick}
            className="flex-1 py-2 rounded-xl font-display text-xs font-medium transition-all duration-200 focus:outline-none min-h-[36px]"
            style={{
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "#3a4a3e" : "#8a8070",
              boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function TodayDisplay({ entry, onEdit }) {
  const weather = getWeatherById(entry.weather);

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: weather.gradient,
        border: `1px solid ${weather.borderColor}`,
      }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
              Today's sky
            </p>
            <p className="text-xs text-stone font-light">
              {formatWeatherTime(entry.timestamp)}
              {entry.editedAt && (
                <span className="ml-1.5 opacity-60">· edited</span>
              )}
            </p>
          </div>
          <button
            onClick={onEdit}
            className="p-2 rounded-xl transition-all hover:opacity-70 min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: weather.textColor }}
            aria-label="Edit today's weather"
          >
            <Pencil size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-5xl leading-none">{weather.emoji}</span>
          <div>
            <p
              className="font-display text-2xl font-light"
              style={{ color: weather.textColor }}
            >
              {weather.label}
            </p>
            <p className="text-sm text-stone font-light mt-0.5">
              {weather.description}
            </p>
          </div>
        </div>

        {entry.note && entry.note.trim().length > 0 && (
          <div
            className="rounded-2xl px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.4)",
              border: `1px solid ${weather.borderColor}`,
            }}
          >
            <p className="text-sm text-ink font-light leading-relaxed italic">
              "{entry.note}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckInForm({
  selectedWeather,
  setSelectedWeather,
  note,
  setNote,
  onSave,
  onCancel,
  canSave,
  isEditing,
}) {
  return (
    <div className="space-y-7">
      {!isEditing && (
        <div className="space-y-1">
          <p
            className="font-display font-light text-ink leading-snug"
            style={{ fontSize: "1.1rem" }}
          >
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <p className="text-sm text-stone font-light">
            What is the weather inside you today?
          </p>
        </div>
      )}

      <WeatherPicker selected={selectedWeather} onChange={setSelectedWeather} />

      <div className="space-y-2">
        <label
          htmlFor="weather-note"
          className="block font-display text-sm font-medium text-ink"
        >
          A short note
          <span className="text-stone font-light ml-1 text-xs">(optional)</span>
        </label>
        <textarea
          id="weather-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What is this weather about? Even one word is enough."
          rows={3}
          className="w-full rounded-2xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink font-light leading-relaxed placeholder:text-stone placeholder:opacity-50 resize-none focus:border-sage focus:outline-none transition-colors"
          style={{ fontFamily: "inherit" }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          fullWidth
          disabled={!canSave}
          onClick={onSave}
        >
          {isEditing ? "Update today's sky" : "Save today's sky"}
        </Button>
        {isEditing && (
          <Button variant="ghost" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

function WeatherEmptyState({ onBegin }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-6 px-6">
      <div
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(200,210,230,0.2) 0%, rgba(185,190,210,0.12) 100%)",
          border: "1.5px solid rgba(185,190,220,0.25)",
        }}
      >
        <span className="text-4xl">🌤️</span>
      </div>

      <div className="space-y-2 max-w-xs">
        <p className="font-display text-lg font-light text-ink tracking-tight">
          Notice the sky within.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          Weather changes. Noticing it — without judging it — is a quiet act of
          self-awareness.
        </p>
      </div>

      <Button variant="primary" onClick={onBegin} className="px-8">
        Check in for today
      </Button>
    </div>
  );
}

export default function EmotionalWeather() {
  const ew = useEmotionalWeather();
  useDocumentTitle("Emotional Weather");

  const {
    grouped,
    recentIds,
    reflection,
    todayEntry,
    hasTodayEntry,
    isEmpty,
    view,
    isEditing,
    canSave,
    selectedWeather,
    setSelectedWeather,
    note,
    setNote,
    setView,
    beginEdit,
    cancelEdit,
    saveEntry,
  } = ew;

  const showForm = isEditing || (!hasTodayEntry && view === WEATHER_VIEW.TODAY);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #f8f6f2 0%, #f4f2ee 50%, #f8f6f2 100%)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            top: "-8%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(200,210,230,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            bottom: "15%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader title="Emotional Weather" />

      {!isEmpty && (
        <div
          className="sticky z-10 px-4 pb-4"
          style={{
            top: "var(--feature-header-height)",
            background: "rgba(248,246,242,0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(185,175,160,0.12)",
          }}
        >
          <div className="max-w-lg mx-auto">
            <WeatherTabs
              view={view}
              onToday={() => setView(WEATHER_VIEW.TODAY)}
              onTimeline={() => setView(WEATHER_VIEW.TIMELINE)}
            />
          </div>
        </div>
      )}

      <div className="relative max-w-lg mx-auto px-4 py-8 space-y-6 pb-20">
        {view === WEATHER_VIEW.TODAY && (
          <>
            {isEmpty && !isEditing && <WeatherEmptyState onBegin={beginEdit} />}

            {showForm && (
              <CheckInForm
                selectedWeather={selectedWeather}
                setSelectedWeather={setSelectedWeather}
                note={note}
                setNote={setNote}
                onSave={saveEntry}
                onCancel={cancelEdit}
                canSave={canSave}
                isEditing={isEditing}
              />
            )}

            {hasTodayEntry && !isEditing && (
              <TodayDisplay entry={todayEntry} onEdit={beginEdit} />
            )}

            {!isEmpty && !isEditing && (
              <EmotionalLandscape recentIds={recentIds} />
            )}

            {!isEmpty && !isEditing && reflection && (
              <WeatherReflection message={reflection} />
            )}
          </>
        )}

        {view === WEATHER_VIEW.TIMELINE && (
          <div className="space-y-8">
            {grouped.map(({ monthKey, label, entries }) => (
              <div key={monthKey} className="space-y-3">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone px-1">
                  {label}
                </p>
                <div className="flex flex-col gap-2.5">
                  {entries.map((entry) => (
                    <WeatherEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
            <div className="pb-4" />
          </div>
        )}
      </div>
    </div>
  );
}
