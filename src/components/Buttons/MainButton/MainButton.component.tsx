import React from "react";

import "./MainButton.style.scss"

export const MainButtonComponent: React.FC<{ctaText:string, ctaAction:()=>void}> = ({ ctaText, ctaAction}) => {

  return (
    <button className={"MainButton"} onClick={ctaAction}>
      <p className={"container"}><span className={"span"}>{ctaText}</span></p>
    </button>
  )
}