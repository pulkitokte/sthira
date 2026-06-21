import { Bell } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Reminders() {
  useDocumentTitle("Reminders");

  return (
    <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
      <Bell size={40} className="text-clay" strokeWidth={1.6} />
      <h1 className="font-display text-xl font-semibold text-moss">
        Gentle nudges
      </h1>
      <p className="max-w-xs leading-relaxed text-stone">
        Choose when Sthira reminds you to move, stretch, or drink water.
        Reminder settings are coming soon.
      </p>
    </PageContainer>
  );
}
