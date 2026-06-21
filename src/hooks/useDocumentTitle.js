import { useEffect } from "react";

const BASE_TITLE = "Sthira";

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${BASE_TITLE} • ${pageTitle}` : BASE_TITLE;
  }, [pageTitle]);
}
