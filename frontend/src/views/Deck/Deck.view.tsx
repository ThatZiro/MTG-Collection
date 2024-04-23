import React from "react";
import {HeaderComponent} from "src/domain/Header";

export const DeckView: React.FC = () => {
  return (
    <section className={"View"}>
      <HeaderComponent title={"Decks"}/>
    </section>
  )
}