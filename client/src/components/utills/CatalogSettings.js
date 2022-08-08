import React, {useContext} from 'react';
import {Button, Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import '../../static/CatalogSettings.css'


const CatalogSettings = observer(() => {

    const {product} = useContext(Context)

    const resetButton = () => {
        product.setSelectedCategory({})
        product.setSelectedSortOrder('')
    }

    return (
        <div className="setting-block">
            <div className="selected-product-count">Selected <strong>{product.totalRecords}</strong> products</div>
            <Button variant="outline-dark" className="rounded-pill" onClick={resetButton}>Reset</Button>
            <div className="select-order">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Object.keys(product.sortOrderVars).map((key) =>
                            (<Dropdown.Item
                                onClick={e => product.setSelectedSortOrder(key)}
                                active={product.selectedSortOrder === key}
                            >
                                {key}
                            </Dropdown.Item>)
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
});

export default CatalogSettings;