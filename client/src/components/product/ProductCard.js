import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";


const ProductCard = observer(({product}) => {

    return (
        <Card style={{width: '17rem'}}>
            <Card.Body>
                <Card.Img height={200} variant="top" src={process.env.REACT_APP_GET_IMG + '/' + product.img}/>
                <Card.Title>{product.title.length > 10 ? `${product.title.substring(0, 10)}...` : product.title}</Card.Title>
                <Card.Text>
                    {product.description.length > 30 ? `${product.description.substring(0, 30)}...` : product.description}
                </Card.Text>
                <Card.Text><strong>{product.price}$</strong></Card.Text>
                <Link key={product.id} to={`/product/${product.id}`} className='btn btn-info'>Show</Link>
            </Card.Body>
        </Card>
    );
});

export default ProductCard;