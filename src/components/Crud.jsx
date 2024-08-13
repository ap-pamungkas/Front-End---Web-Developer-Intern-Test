import React, { useState, useEffect } from 'react';

const Crud = () => {
    const [items, setItems] = useState(() => {
        return JSON.parse(localStorage.getItem('items')) || [];
    });
    const [newItem, setNewItem] = useState('');
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(localStorage.getItem('currentPage')) || 1;
    });
    const itemsPerPage = 5;

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('currentPage', currentPage);
    }, [items, currentPage]);

    const addItem = () => {
        if (newItem.trim() === '') return;
        setItems(prevItems => [...prevItems, newItem]);
        setNewItem('');
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);

        // Adjust current page if necessary
        const totalPages = Math.ceil(updatedItems.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    };

    // Apply filter to all items
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(filter.toLowerCase())
    );

    // Calculate total pages based on filtered items
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Get paginated items based on the filtered list
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">CRUD Operations</h1>

            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                    className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter items"
                    className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
            </div>

            <button
                onClick={addItem}
                className="bg-blue-500 w-[5rem] text-white p-2 rounded-md mb-4 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Add
            </button>

            <ul className="list-disc list-inside mb-6">
                {paginatedItems.map((item, index) => (
                    <li
                        key={index}
                        className="flex justify-between dark:text-white items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md mb-2"
                    >
                        {item}
                        <button
                            onClick={() => deleteItem(index)}
                            className="text-white bg-red-500 p-2 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Crud;
