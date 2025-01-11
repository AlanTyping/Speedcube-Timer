import React from 'react';
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import { MemoizedComponent } from "./components/timer/Timer";
import { Header } from './components/header';

function App() {
  const [{theme}] = useContext(ThemeContext);
  return (
    <div className="App" style={{
      backgroundColor: theme.backgroundColor,
      color: theme.color,
      }}>
      <Header />
      <MemoizedComponent />
    </div>
  );
}

export default App;




