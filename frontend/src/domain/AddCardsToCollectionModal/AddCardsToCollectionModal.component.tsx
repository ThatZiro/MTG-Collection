import React, {useEffect, useState} from "react";

import "./AddCardsToCollectionModal.style.scss"
import {Table} from "../../components/Tables/Table.component";


import {SEARCH_CARD} from "../../infrastructure/graphql/mutations/queries";
import {useLazyQuery} from "@apollo/client";
import {LocalStorage} from "../../infrastructure/db/localstorage";

const localStorageManager = new LocalStorage();
interface SearchResult {
  id: string;
  name: string;
  image_uris: string;
  prices: string;
}
interface SearchCardData {
  searchCards: SearchResult[];
}

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

export const AddCardsToCollectionModalComponent: React.FC<{onClose:()=>void}> = ({onClose}) => {
  const [getSearchCard, { data: searchCardData }] = useLazyQuery<SearchCardData, { input: string }>(SEARCH_CARD);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [collection, setCollection] = useState<string[]>(() => {
    const storedCollection = localStorageManager.load('addCollection');
    return storedCollection ? storedCollection : [];
  });
  const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await getSearchCard({
        variables: {
          input: event.target.value
        }
      });
      if (searchCardData) {
        console.log(searchCardData);
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };

  useEffect(() => {
    if (searchCardData && searchCardData.searchCards) {
      setSearchResults(searchCardData.searchCards);
    }
  }, [searchCardData]);

  const hoverCard = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const hoverImageUri = event.currentTarget.getAttribute("data-hoverimage");
    setHoveredCard(hoverImageUri);
  }

  const selectCard = (id: string) => {
    const selectedCard = searchResults.find((card) => card.id === id);
    if (selectedCard) {
      // Extracting additional details
      const { name, prices } = selectedCard;
      const parsed_prices = JSON.parse(prices);


      // Other details from input fields
      const foil = (document.getElementById("foil") as HTMLInputElement).checked ? "Yes" : "No";
      const condition = (document.getElementById("condition") as HTMLSelectElement).value;
      const quantity = (document.getElementById("quantity") as HTMLInputElement).value;
      const tag = (document.getElementById("tagCard") as HTMLInputElement).value;

      let price_usd;
      if(foil === "Yes") {
        price_usd = parsed_prices?.usd_foil ?? 'unknown'; // will use 'unknown' if usd_foil is null or undefined
      } else {
        price_usd = parsed_prices?.usd ?? 'unknown'; // will use 'unknown' if usd is null or undefined
      }

      // Constructing the card object with all details
      const cardDetails = {
        id,
        name,
        foil,
        condition,
        quantity,
        tag,
        price_usd
      };

      // Always add card to the collection, regardless of duplicates
      const updatedCollection = [...collection, cardDetails];
      localStorageManager.save('addCollection', updatedCollection);
      console.log(`Added ${selectedCard.name} to local storage.`);
      setCollection(updatedCollection);
    }
  };

  return (
    <div className={"AddCardsToCollection"}>
      <div className={"left-panel"}>
        <h2>Add Cards to Collection</h2>
        <div className="input">
          <label htmlFor="cardName">Card Name:</label>
          <input type="text" id="cardName" name="cardName" onChange={handleChange}/>

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
              {searchResults.map(({id, name, image_uris}) => {
                // Ensure the name does not exceed 100 characters
                const displayName = name.length > 35 ? `${name.substring(0, 35)}...` : name;
                const parsed_image_uris = JSON.parse(image_uris);
                const hoverImageUri = parsed_image_uris?.normal;
                return (
                  <p
                    key={id}
                    className={"searchtext"}
                    data-hoverimage={hoverImageUri}
                    onMouseOver={hoverCard}
                    onClick={() => selectCard(id)}
                  >{displayName}</p>
                );
              })}
            </div>
          </div>
          <div className={"imgcontainer"}>
            {hoveredCard !== null ? (<img className={"image"} src={hoveredCard} alt={"search mtg card"}></img>) : null}
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