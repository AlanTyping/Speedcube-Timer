import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import { Timer } from './components/timer/Timer';
import { Header } from './components/header';

function App() {
  const [{theme}] = useContext(ThemeContext);
  return (
    <div className="App" style={{
      backgroundColor: theme.backgroundColor,
      color: theme.color,
      }}>
      <Header />
      <Timer />
    </div>
  );
}

export default App;




