import React, {useState, useEffect} from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import {setTheme} from './themes';
import './toggle.css';
export function Toggle() {

  const [togClass, setTogClass] = useState(() => false);
  let theme = localStorage.getItem('theme');

  function handleOnClick() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        setTogClass('light')
    } else {
        setTheme('theme-dark');
        setTogClass('dark')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTogClass('dark')
    } else if (localStorage.getItem('theme') === 'theme-light') {
        setTogClass('light')
    }
}, [theme])




  return (
    <DarkModeToggle
      onChange={handleOnClick}
      checked={togClass === "dark"}
      size={70}
    />
  );
};
