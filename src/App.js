// import Header from "./components/header";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import { Header } from './components/header'
import { Cronometro } from './components/another/another';
import { Timer } from './components/timer/Timer';

function App() {
  const [{theme}] = useContext(ThemeContext);
  return (
    <div className="App" style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
      <Header />
      <Timer />
    </div>
  );
}

export default App;




