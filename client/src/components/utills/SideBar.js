import React from 'react';
import '../../static/SideBar.css'
import CategorySorting from "./CategorySorting";
import PriceSorting from "./PriceSorting";


const SideBar = () => {

    return (
        <div className="sidebar">
        <CategorySorting/>
        <PriceSorting/>
        </div>

    );
};

export default SideBar;