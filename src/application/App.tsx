import '@styles/main.scss';
import {Sidebar} from "../components/Sidebar";
import {ThemeProvider} from "../context/ThemeContext";

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
  return (
    <div className={`app`}>
      <Sidebar/>
    </div>
  )
}

export default App
