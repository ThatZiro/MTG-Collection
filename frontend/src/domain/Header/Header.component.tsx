import React from "react";

import "./Header.style.scss"

export const HeaderComponent: React.FC<{title:string}> = ({title}) => {

  return (
    <div className={"Header"}>
      <h1>{title}</h1>
    </div>
  )
}