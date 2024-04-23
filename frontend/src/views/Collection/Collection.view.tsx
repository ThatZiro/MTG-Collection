import React from "react";
import {HeaderComponent} from "src/domain/Header";
import {MissingContentComponent} from "../../domain/MissingContent";
import "./Collection.style.scss"
import {AddCardsToCollectionModalComponent} from "../../domain/AddCardsToCollectionModal";

export const CollectionView: React.FC = () => {
  const [addCardsToCollectionModalIsOpen, setAddCardsToCollectionModalIsOpen] = React.useState(false);

  const openAddCardsModal = () => {
    setAddCardsToCollectionModalIsOpen(true);
  }
  const closeAddCardsModal = () => {
    setAddCardsToCollectionModalIsOpen(false);
  };

  return (
    <section className={"View Collection"}>
      <HeaderComponent title={"Collection"}/>
      <div className={"missing-content-container"}>
        <MissingContentComponent
          text={"Looks like your collection is empty, let’s add some cards."}
          ctaText={"Add Cards"}
          ctaAction={openAddCardsModal}
        />
      </div>

      {addCardsToCollectionModalIsOpen &&
        <AddCardsToCollectionModalComponent onClose={closeAddCardsModal} />
      }
    </section>
  )
}