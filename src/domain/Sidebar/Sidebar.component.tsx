import {CollectionIconComponent, DeckIconComponent, HomeIconComponent, LogoIconComponent} from "../../components/Icons";
import React from "react";

import "./Sidebar.style.scss"
import {ThemeToggleComponent} from "../../components/Buttons/ThemeToggle";

export const Sidebar: React.FC<{ setActiveTab:(tab:string) => void, activeTab: string}> = ({setActiveTab, activeTab}) => {

  return (
    <div className={"Sidebar"}>
      <div className={"Sidebar-tabs"}>
        <LogoIconComponent/>
        <div className={`tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <HomeIconComponent/>
        </div>
        <div className={`tab ${activeTab === 'collection' ? 'active' : ''}`} onClick={() => setActiveTab('collection')}>
          <CollectionIconComponent/>
        </div>
        <div className={`tab ${activeTab === 'deck' ? 'active' : ''}`} onClick={() => setActiveTab('deck')}>
          <DeckIconComponent/>
        </div>
      </div>
      <ThemeToggleComponent/>
    </div>
  )
}