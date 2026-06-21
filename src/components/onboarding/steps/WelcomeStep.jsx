import SthiraLogo from "../../common/SthiraLogo";

export default function WelcomeStep({ data, updateField }) {
  return (
    <div className="flex flex-1 flex-col">
      <SthiraLogo size={64} iconSize={28} />
      <h1 className="mt-6 font-display text-[26px] font-semibold leading-snug text-ink">
        Let's set up your space
      </h1>
      <p className="mt-2 leading-relaxed text-stone">
        A few quick questions to shape Sthira around how you study and move.
        Nothing here is graded — just for you.
      </p>

      <label className="mt-8 block">
        <span className="mb-2 block font-display text-sm font-medium text-ink">
          What should we call you?
        </span>
        <input
          type="text"
          value={data.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          placeholder="Your first name"
          autoFocus
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 font-sans text-ink placeholder:text-stone/60 focus:border-moss focus:outline-none"
        />
      </label>
    </div>
  );
}
