import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, updateUsername } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || '');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSave = () => {
        updateUsername(username);
        setIsEditing(false);
    };

    return (
        <nav className="bg-gray-800 dark:bg-white p-4 text-white flex justify-between items-center">
            <div className="text-xl dark:text-black">My App</div>
            <div className="relative">

            

                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="flex items-center dark:text-gray-600"
                >
                    {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            onBlur={handleSave}
                            className="bg-transparent dark:text-gray-400 text-white border-b dark:text-gray border-white focus:outline-none"
                        />
                    ) : (
                        user?.username
                    )}
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 dark-text-gray-500 bg-white text-black rounded shadow-lg">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="block w-full  text-left px-4 py-2 hover:bg-gray-200"
                        >
                            {isEditing ? 'Save' : 'Edit Username'}
                        </button>
                        <button
                            onClick={logout}
                            className="block w-full dark:text-gray-500 text-left px-4 py-2 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
