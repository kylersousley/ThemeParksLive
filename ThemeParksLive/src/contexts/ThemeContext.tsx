import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { ThemeName, themes } from "@/colors";

const DEFAULT_THEME = {colors: themes.blue.schemes.dark, themeName: 'blue', changeTheme: (name: ThemeName) => {}}
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




// import AsyncStorage from "@react-native-async-storage/async-storage";

// const THEME_KEY = "theme";

// const THEMES = {
//   purple: { theme: '#6A1B9A', mainTextColor: 'black', textIconColor: 'white', themeBackgroundColor: '#F2F2F2' },
//   blue:   { theme: 'darkblue', mainTextColor: 'black', textIconColor: 'white', themeBackgroundColor: '#F2F2F2' },
//   red:    { theme: 'darkred',  mainTextColor: 'black', textIconColor: 'white', themeBackgroundColor: '#F2F2F2' },
//   white:  { theme: 'white',    mainTextColor: 'black', textIconColor: 'black', themeBackgroundColor: '#F2F2F2' },
//   dark:   { theme: '#181818',  mainTextColor: 'white', textIconColor: 'white', themeBackgroundColor: '#121212' },
// };


// const ThemeContextProvider = ({children}) => {
//     const [themeName, setThemeName] = useState("purple")

//     useEffect(() => {
//         AsyncStorage.getItem(THEME_KEY).then((saved) => {
//         if (saved && saved in THEMES) setThemeName(saved);
//         });
//     }, []);  

//     const changeTheme = (name) => {
//         setThemeName(name);
//         AsyncStorage.setItem(THEME_KEY, name)
//     }

//     const [theme, setTheme] = useState(DEFAULT_THEME)
//     const [mainTextColor, setMainTextColor] = useState(DEFAULT_MAIN_TEXT_COLOR)
//     const [textIconColor, setTextIconColor] = useState(DEFAULT_TEXT_ICON_COLOR)
//     const [themeBackgroundColor, setThemeBackgroundColor] = useState(DEFAULT_BACKGROUND_COLOR)
//     return(
//         <ThemeContext.Provider value={{ ...THEMES[themeName], changeTheme}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }


// export { ThemeContext, ThemeContextProvider }