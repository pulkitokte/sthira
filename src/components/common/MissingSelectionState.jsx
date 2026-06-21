import PageContainer from "../layout/PageContainer";

export default function MissingSelectionState({
  icon: Icon,
  heading,
  description,
  buttonLabel,
  onButtonClick,
}) {
  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/15">
          <Icon size={24} className="text-moss" strokeWidth={1.8} />
        </span>
      )}
      <h1 className="font-display text-xl font-semibold text-ink">{heading}</h1>
      <p className="max-w-xs leading-relaxed text-stone">{description}</p>
      <button
        onClick={onButtonClick}
        className="rounded-full bg-moss px-6 py-3 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
      >
        {buttonLabel}
      </button>
    </PageContainer>
  );
}
