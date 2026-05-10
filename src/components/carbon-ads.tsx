"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type HTMLAttributes, useEffect, useRef, useState } from "react";
import { CARBON_AD_HIDDEN_KEY, refreshCarbonAd } from "@/lib/carbon-ad";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function CarbonAd({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(true);
  const mounted = useRef(false);
  const reference = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(sessionStorage.getItem(CARBON_AD_HIDDEN_KEY) !== "true");
  }, []);

  useEffect(() => {
    if (!(reference.current && isVisible)) return;

    reference.current.innerHTML = "";
    const s = document.createElement("script");
    s.id = "_carbonads_js";
    s.src =
      "//cdn.carbonads.com/carbon.js?serve=CW7ILKQL&placement=wwwshadcnui-blockscom";
    reference.current.appendChild(s);

    if (mounted.current) {
      refreshCarbonAd();
    }

    mounted.current = true;
  }, [pathname]);

  if (process.env.NODE_ENV === "development") return null;

  return (
    <div className={cn("z-10", className, { hidden: !isVisible })}>
      <div ref={reference} {...props} />
      <Button
        className="absolute top-1.5 right-1.5 z-10"
        onClick={() => {
          sessionStorage.setItem(CARBON_AD_HIDDEN_KEY, "true");
          setIsVisible(false);
        }}
        size="icon-sm"
        variant="secondary"
      >
        <X />
      </Button>
    </div>
  );
}
