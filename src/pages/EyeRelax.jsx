import { Eye } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";

export default function EyeRelax() {
  return (
    <PageContainer className="flex flex-col items-center justify-center gap-4 text-center">
      <Eye size={40} className="text-dew" strokeWidth={1.6} />
      <h1 className="font-display text-xl font-semibold text-moss">
        Give your eyes a break
      </h1>
      <p className="max-w-xs leading-relaxed text-stone">
        Short, guided eye-relief routines will live here soon — simple ways to
        ease the strain of a screen-filled day.
      </p>
    </PageContainer>
  );
}
