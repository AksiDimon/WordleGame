import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
  blockBackdrop?: boolean;
};

export default function Modal({ open, onClose, children, labelledBy, describedBy, blockBackdrop = true, }: Props) {

 useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    if (blockBackdrop) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (blockBackdrop) document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, blockBackdrop]);

  if (!open) return null;


  const containerPointer = blockBackdrop ? "pointer-events-auto" : "pointer-events-none";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`fixed inset-0 z-50 grid place-items-center ${containerPointer}`}
      onClick={blockBackdrop ? onClose : undefined}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      <div
        className="relative max-w-[420px] w-[92%] rounded-2xl border shadow-2xl overflow-hidden pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}