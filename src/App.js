import './App.css';
import Todo from './components/Todo';
import ReactSwitch from 'react-switch';
import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [theme,setTheme] = useState("dark");
  const toggleTheme = () =>{
    setTheme((curr)=>(curr==="dark" ? "light" : "dark"));
  }
  return (
    <>
      <ThemeContext.Provider value={{theme,toggleTheme}}>
          <div className='App' id={theme}>
          <div className='switch'>
          <ReactSwitch onChange={toggleTheme} checked={theme==="dark"}/>
          </div>
          <Todo />
          </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
