import React from "react";

type Props = { className?: string; title?: string };

/** Иконка «Выход» — наследует текущий цвет (currentColor) */
export default function IconLogout({ className = "w-4 h-4", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      {/* корпус */}
      <path d="M10 4a1 1 0 1 0 0 2h6v12h-6a1 1 0 1 0 0 2h7a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7Z"/>
      {/* стрелка наружу */}
      <path d="M13.7 12.7a1 1 0 0 1-1.4-1.4L14.59 9H4a1 1 0 1 1 0-2h10.59L12.3 5.7a1 1 0 1 1 1.4-1.4l3.99 3.99a1 1 0 0 1 0 1.42l-4 4Z"/>
    </svg>
  );
}
