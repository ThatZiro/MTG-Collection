import React from "react";

import "./MissingContent.style.scss"
import {MainButtonComponent} from "../../components/Buttons/MainButton";

export const MissingContentComponent: React.FC<{text:string, ctaText:string, ctaAction:()=>void}> = ({text, ctaText, ctaAction}) => {

  return (
    <div className={"MissingContent"}>
      <h3>{text}</h3>
      <MainButtonComponent ctaAction={ctaAction} ctaText={ctaText}/>
    </div>
  )
}