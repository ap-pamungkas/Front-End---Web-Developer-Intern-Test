import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
       
         <div className='absolute top-[90%] right-5 '>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className=" p-2 rounded-xl"
            >
                <option value="system">Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            
            
        </div>
       
   
        
    );
};

export default ThemeToggle;
