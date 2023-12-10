import React, { useEffect } from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ModeToggle = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleToggle = () => {
    const newDarkModeValue = !darkMode;
    setDarkMode(newDarkModeValue);
    localStorage.setItem('darkMode', newDarkModeValue ? 'true' : 'false');
    if (newDarkModeValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  function setInitialTheme() {
    const prefersDark = localStorage.theme === 'dark' || 
                        (!('theme' in localStorage) && 
                         window.matchMedia('(prefers-color-scheme: dark)').matches);
  
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  

  useEffect(() => {
    setInitialTheme();
  }, []);

  return (
    <div onClick={handleToggle} className={"cursor-pointer"}>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  )
};

export default ModeToggle;
