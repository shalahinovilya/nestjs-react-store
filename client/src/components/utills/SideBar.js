import React, {memo} from 'react';
import '../../static/SideBar.css'
import CategorySorting from "./CategorySorting";
import PriceSorting from "./PriceSorting";


const SideBar = memo(() => {

    return (
        <div className="sidebar">
        <CategorySorting/>
        <PriceSorting/>
        </div>

    );
});

export default SideBar;