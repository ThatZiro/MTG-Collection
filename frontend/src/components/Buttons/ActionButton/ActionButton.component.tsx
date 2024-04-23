import React from "react";

import "./ActionButton.style.scss"

export const ActionButtonComponent: React.FC<{ctaText:string, ctaAction:()=>void, theme: 'main' | 'danger'}> = ({ ctaText, ctaAction, theme }) => {
  const color = theme === 'main' ? 'var(--button-color)' : 'var(--button-color-danger)';

  return (
    <button
      className={"ActionButton"}
      onClick={ctaAction}
      style={{  "--color": color} as React.CSSProperties}
    >
      {ctaText}
    </button>
  )
}