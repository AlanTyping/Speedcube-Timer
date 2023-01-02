import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

export function Header() {
  const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
  return (
    <div className={`Header ${isDark ? 'dark-header' : 'light-header'}`}>
      <div className="header-div" onClick={toggleTheme}>Change Theme</div>
    </div>
  );
}
