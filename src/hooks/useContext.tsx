import React, { useState, useEffect, useContext } from 'react'

const themes = {
  light: {
    color: "#333",
    background: "#fff"
  },
  dark: {
    color: "#fff",
    background: "#333"
  }
}

const ThemeContext = React.createContext(themes.light);

const Toolbar = () => {
  console.log('Toolbar')
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  console.log('ThemedButton')
  return (
    <div style={{ background: theme.background, color: theme.color }}>
      I am styled by theme context!
    </div>
  );
}

const UseContext = () => {

  const [theme, setTheme] = useState(themes.dark)

  const handleToggle = () => {
    // 传入的对象，和返回的对象是一个对象
    if (theme === themes.dark) {
      setTheme(themes.light)
    } else {
      setTheme(themes.dark)
    }
  }

  return (
    <>
      <h1>UseContext</h1>

      <button onClick={handleToggle}>toggle</button>

      <ThemeContext.Provider value={theme}>
        <Toolbar />
      </ThemeContext.Provider>
    </>
  )
}

export default UseContext
