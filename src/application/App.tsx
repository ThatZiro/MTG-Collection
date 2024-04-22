import '@styles/main.scss';
import {Sidebar} from "../domain/Sidebar";
import {ThemeProvider} from "../context/ThemeContext";
import {useState} from "react";
import {HomeView} from "@views/Home";
import {CollectionView} from "@views/Collection";
import {DeckView} from "@views/Deck";

function App() {

  return (
    <>
      <ThemeProvider>
        <MainComponent/>
      </ThemeProvider>
    </>
  )
}

const MainComponent = () => {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className={`app`}>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'collection' && <CollectionView />}
      {activeTab === 'deck' && <DeckView />}
    </div>
  )
}

export default App
