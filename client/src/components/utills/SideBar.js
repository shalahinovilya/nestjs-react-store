import React, {useContext} from 'react';
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import '../../static/SideBar.css'


const SideBar = observer(() => {

    const {product} = useContext(Context)

    return (
        <div className="sidebar">
            <div style={{marginBottom: 20, fontSize: 25}}>
                <strong>Categories</strong>
            </div>

            <ListGroup>
                <ListGroup.Item
                    style={{borderTop: '0px', borderLeft: '0px', borderRight: '0px'}}
                    className="category-list border-top-0  border-right-0  border-left-0"
                    onClick={e => product.setSelectedCategory({})}
                    active={!Object.keys(product.selectedCategory).length}
                    disabled={!Object.keys(product.selectedCategory).length}
                    action
                >
                    All</ListGroup.Item>
                {product.categories.length && product.categories.map((cat) =>
                    (<ListGroup.Item
                        style={{borderTop: '0px', borderLeft: '0px', borderRight: '0px'}}
                        className="category-list"
                        action
                        onClick={() => {
                            product.setPage(1)
                            product.setSelectedCategory(cat)
                        }}
                        active={product.selectedCategory.id === cat.id}
                        disabled={product.selectedCategory.id === cat.id}
                        key={cat.id}
                    >
                        {cat.value}
                    </ListGroup.Item>)
                )}

            </ListGroup>
        </div>
    );
});

export default SideBar;