import React, {useEffect, useState} from "react";
import "./AddCardsToCollectionModal.style.scss"
import {Table} from "../../components/Tables/Table.component";
import {SEARCH_CARD} from "../../infrastructure/graphql/mutations/queries";
import {useLazyQuery} from "@apollo/client";
import {LocalStorage} from "../../infrastructure/db/localstorage";
import {ActionButtonComponent} from "../../components/Buttons/ActionButton";

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
  name: 6,
  foil: 1,
  condition: 4,
  tag: 4,
  price: 2,
  remove: 1
};

interface CardDetail {
  id: string;
  name: string;
  foil: string;
  condition: string;
  count: string;
  tag: string;
  price: string;
}

export const AddCardsToCollectionModalComponent: React.FC<{onClose:()=>void}> = ({onClose}) => {
  const [getSearchCard, { data: searchCardData }] = useLazyQuery<SearchCardData, { input: string }>(SEARCH_CARD);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [collection, setCollection] = useState<CardDetail[]>(() => {
    const storedCollection = localStorageManager.load('addCollection');
    return storedCollection ? (storedCollection as CardDetail[]) : [];
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
      const foil = (document.getElementById("foil") as HTMLInputElement).checked ? "Y" : "N";
      const condition = (document.getElementById("condition") as HTMLSelectElement).value;
      const count = (document.getElementById("quantity") as HTMLInputElement).value;
      const tag = (document.getElementById("tagCard") as HTMLInputElement).value;

      let price;
      if(foil === "Y") {
        price = parsed_prices?.usd_foil ?? 'unknown'; // will use 'unknown' if usd_foil is null or undefined
      } else {
        price = parsed_prices?.usd ?? 'unknown'; // will use 'unknown' if usd is null or undefined
      }

      // Constructing the card object with all details
      const cardDetails = {
        id,
        name,
        foil,
        condition,
        count,
        tag,
        price
      };

      // Always add card to the collection, regardless of duplicates
      const updatedCollection = [...collection, cardDetails];
      localStorageManager.save('addCollection', updatedCollection);
      console.log(`Added ${selectedCard.name} to local storage.`);
      setCollection(updatedCollection);
    }
  };

  const handleRemoveCard = (index: number) => {
    const updatedCollection = [...collection];
    updatedCollection.splice(index, 1);
    localStorageManager.save('addCollection', updatedCollection);
    setCollection(updatedCollection);
  };

  const getCount = () => {
    let count = 0
    for (const element of collection) {
      count += parseInt(element.count);
    }
    return count;
  }
  const getCost = ():string => {
    let cost = 0
    let hasUnknown = false;

    for (const element of collection) {
      if(element.price != "unknown"){
        const price = parseFloat(element.price);
        const count = parseInt(element.count)
        cost += count * price;
      } else {
        hasUnknown = true;
      }
    }



    const costStr = (parseFloat(String(cost)) || 0).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return hasUnknown ? `$${costStr}*` : `$${costStr}`;
  }

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
        <div className={"header"}>
          <div className={"details"}>
            <p className={"total"}>{`Count : ${getCount()}`}</p>
            <p className={"total"}>{`Cost : ${getCost()}`}</p>
          </div>
          <ActionButtonComponent ctaAction={onClose} ctaText={"X"} theme={"danger"}/>
        </div>
        <div>
        <Table headers={headers} data={collection as any} removeHandler={handleRemoveCard} height={500}/>
        </div>
        <div className={"buttons"}>
          <ActionButtonComponent ctaText={"Add To Collection"} ctaAction={()=> {console.log("Add To Collection Pressed")}} theme={"main"}/>
          <ActionButtonComponent ctaText={"Clear Collection"} ctaAction={()=> {console.log("Clear Collection Pressed")}} theme={"danger"}/>
        </div>
      </div>
      <div className={"overlay"}/>
    </div>
  )
}