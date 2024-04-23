import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import '@styles/main.scss';
import {Sidebar} from "../domain/Sidebar";
import {ThemeProvider} from "../context/ThemeContext";
import {useState} from "react";
import {HomeView} from "@views/Home";
import {CollectionView} from "@views/Collection";
import {DeckView} from "@views/Deck";

// Setup Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // replace with your GraphQL server URI
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <MainComponent/>
      </ThemeProvider>
    </ApolloProvider>
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