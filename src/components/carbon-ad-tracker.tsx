"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CARBON_AD_HIDDEN_KEY } from "@/lib/carbon-ad";

const CATEGORY_PATH_PREFIX = "/blocks/categories/";

export function CarbonAdTracker() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const prev = prevPathname.current;
    prevPathname.current = pathname;

    if (
      prev.startsWith(CATEGORY_PATH_PREFIX) &&
      !pathname.startsWith(CATEGORY_PATH_PREFIX)
    ) {
      sessionStorage.removeItem(CARBON_AD_HIDDEN_KEY);
    }
  }, [pathname]);

  return null;
}
