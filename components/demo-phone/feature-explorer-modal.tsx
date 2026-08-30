"use client";

import { Modal } from "@/components/ui/modal";
import { InteractivePhone, type DemoTarget } from "./interactive-phone";

export function FeatureExplorerModal({
  open,
  onClose,
  title,
  detail,
  target,
}: {
  open: boolean;
  onClose: () => void;
  title: string | null;
  detail: string | null;
  target: DemoTarget;
}) {
  return (
    <Modal open={open} onClose={onClose} label={title ?? "Explore Mivo"}>
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep">Exploring</p>
        <p className="mt-1 text-lg font-semibold text-ink">{title}</p>
        {detail && <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-body">{detail}</p>}
      </div>
      {open && <InteractivePhone key={JSON.stringify(target)} initialTarget={target} />}
    </Modal>
  );
}
