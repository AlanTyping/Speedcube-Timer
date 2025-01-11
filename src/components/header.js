import React from 'react';
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";
import lightMode from '../img/lightMode.png';
import darkMode from '../img/darkMode.png';

export function Header() {
  const [{isDark}, toggleTheme] = useContext(ThemeContext);
  return (
    <div className={`Header ${isDark ? 'dark-header' : 'light-header'}`}>
      <div className="header-div" onClick={toggleTheme}>
        {isDark ? <img src={lightMode} alt={lightMode}/> : <img src={darkMode} alt={darkMode}/>}
      </div>
    </div>
  );
}
