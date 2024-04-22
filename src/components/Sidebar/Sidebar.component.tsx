import {CollectionIconComponent, DeckIconComponent, HomeIconComponent, LogoIconComponent} from "../Icons";
import React from "react";

import "./Sidebar.style.scss"
import {ThemeToggleComponent} from "../Buttons/ThemeToggle";

export const Sidebar: React.FC = () => {
  return (
    <div className={"Sidebar"}>
      <div className={"Sidebar-tabs"}>
        <LogoIconComponent/>
        <div className={"tab"}>
          <HomeIconComponent/>
        </div>
        <div className={"tab"}>
          <CollectionIconComponent/>
        </div>
        <div className={"tab"}>
          <DeckIconComponent/>
        </div>
      </div>
      <ThemeToggleComponent/>
    </div>
  )
}