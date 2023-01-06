import { createContext, useEffect, useState } from "react";
import dark from '../img/dark.png';
import light from '../img/light.jpg';

const themes = {
    dark: {
        backgroundImage: `url(${dark})`,
        backgroundColor: 'black',
        color: 'white'
    },
    light: {
        backgroundImage: `url(${light})`,
        backgroundColor: 'white',
        color: 'black'
    }
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? themes.dark : themes.light;
    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        setIsDark(!isDark);
    };
    
    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === 'true';
        setIsDark(isDark)
    }, [])
 
    return (
        <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}