import React from "react";
import {HeaderComponent} from "src/domain/Header";

export const HomeView: React.FC = () => {
  return (
    <section className={"View"}>
      <HeaderComponent title={"Home"}/>
    </section>
  )
}