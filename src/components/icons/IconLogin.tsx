import React from "react";

type Props = { className?: string; title?: string };

/** Иконка «Войти» — молния/пуск, наследует currentColor */
export default function IconLogin({ className = "w-4 h-4", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>
    </svg>
  );
}
