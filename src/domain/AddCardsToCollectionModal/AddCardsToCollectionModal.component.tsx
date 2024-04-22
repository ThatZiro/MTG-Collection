import React from "react";

import "./AddCardsToCollectionModal.style.scss"
import {Table} from "../../components/Tables/Table.component";
import tempcard from "@assets/tempcard.png";

const headers = {
  count: 2,
  card: 6,
  foil: 1,
  condition: 4,
  tag: 4,
  price: 2,
  remove: 1
};

const data = [
  { id: 1, count: 5, card: "Black Lotus", foil: "Yes", condition: "Mint", tag: "Rare", price: "$10,000" },
  { id: 2, count: 3, card: "Mox Pearl", foil: "No", condition: "Near Mint", tag: "Uncommon", price: "$2,000" }
  // More rows can be added here
];

const handleRemove = (id: number) => {
  console.log('Remove item with id:', id);
  // Implement deletion logic here
};

const hoveredCard = tempcard;

export const AddCardsToCollectionModalComponent: React.FC<{onClose:()=>void}> = ({onClose}) => {

  return (
    <div className={"AddCardsToCollection"}>
      <div className={"left-panel"}>
        <h2>Add Cards to Collection</h2>
        <div className="input">
          <label htmlFor="cardName">Card Name:</label>
          <input type="text" id="cardName" name="cardName"/>

          <div className="lower-inputs">
            <div className="foil">
              <label htmlFor="foil">Foil:</label>
              <input type="checkbox" id="foil" name="foil"/>
            </div>
            <div className="condition">
              <label htmlFor="condition">Condition:</label>
              <select id="condition" name="condition">
                <option value="Near Mint">Near Mint</option>
                <option value="Moderately Played">Moderately Played</option>
                <option value="Heavily Played">Heavily Played</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
            <div className="quantity">
              <label htmlFor="quantity">Qty:</label>
              <input type="number" id="quantity" name="quantity"/>
            </div>
            <div className="tag">
              <label htmlFor="tagCard">Tag Card:</label>
              <input type="text" id="tagCard" name="tagCard"/>
            </div>
          </div>
        </div>
        <div className={"selection"}>
          <div className={"list"}>
            <div className={"searchresults"}>
              <p className={"searchtext"}>Unknown Shores</p>
              <p className={"searchtext"}>Unknown Shores</p>
              <p className={"searchtext"}>Unknown Shores</p>
              <p className={"searchtext"}>Unknown Shores</p>
            </div>
          </div>
          <div className={"imgcontainer"}>
            {hoveredCard !== null ? (<img className={"image"} src={tempcard} alt={"search mtg card"}></img>) : null}
          </div>

        </div>
      </div>
      <div className={"right-panel"}>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
        <div>
          <Table headers={headers} data={data} removeHandler={handleRemove}/>
        </div>
        <div className={"buttons"}></div>
      </div>
      <div className={"overlay"}/>
    </div>
  )
}