import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Button, Col, Form, Row} from "react-bootstrap";
import {findPricingErrors} from "../../utils/product/ValidatePricingData";

const PriceSorting = observer(() => {

    const {product} = useContext(Context)

    const [minPrice, setMinPrice] = useState(product.selectedPricing.minPrice)
    const [maxPrice, setMaxPrice] = useState(product.selectedPricing.maxPrice)

    const pricingHandler = () => {
        if (findPricingErrors(product.selectedPricing.minPrice, product.selectedPricing.maxPrice)) {
            product.setSelectedPricing({minPrice, maxPrice})
        }
    }

    return (
        <>
            <div style={{marginBottom: 20, fontSize: 25}}>
                <strong>Price</strong>
            </div>
            <div>
                <Form validated={true}>
                    <Row style={{flexDirection: 'row'}}>

                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicMinPrice">
                                <Form.Control
                                    value={minPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                    type="number"
                                    min={5}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        -
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicMaxPrice">
                                <Form.Control
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(e.target.value)}
                                    type="number"
                                    min={10}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div style={{textAlign: 'center'}}>
                        <Button
                            onClick={pricingHandler}
                        >
                            OK
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );

});

export default PriceSorting;