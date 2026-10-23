import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { ThemeName, themes } from "@/colors";

const DEFAULT_THEME = {colors: themes.blue.schemes.dark, themeName: 'blue' as ThemeName, changeTheme: (name: ThemeName) => {}}
const ThemeContext = createContext(DEFAULT_THEME)

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('blue')

    const changeTheme = (name: ThemeName) => {
        setThemeName(name)
    }

    return(
        <ThemeContext.Provider value={{ colors: themes[themeName].schemes.dark, themeName, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export { ThemeContext, ThemeContextProvider }
export const useTheme = () => useContext(ThemeContext)