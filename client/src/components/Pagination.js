import React, {useContext, useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";
import {CreatePagination} from "../utils/PaginationParams";
import {getProducts, getTotalProductsNum} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const PaginationBasic = observer(() => {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(null)
    const {products} = useContext(Context)
    getTotalProductsNum().then((data) => setTotalRecords(data))
    const {
        pages,
        pageLimit,
        firstIndex,
    } = CreatePagination({currentPage: currentPage, totalRecords: totalRecords, pageLimit: products.getLimit() })


    useEffect(() => {
        getProducts(pageLimit, firstIndex).then(data => {
            products.setProducts(data)
        })
    }, [currentPage])

    return (
        <div>
            <Pagination size="lg" className="pagination-block" >
                <Pagination.First onClick={e => setCurrentPage(1)} />
                <Pagination.Prev onClick={e => setCurrentPage(pages[0] < currentPage ? currentPage - 1 : 1 )} />
                {pages.map(pageNum =>
                     (<Pagination.Item
                         onClick={e => {
                            pageNum !== currentPage && setCurrentPage(+e.target.text)
                        }}
                        key={pageNum}
                        active={pageNum === currentPage}
                    >
                        {pageNum}
                    </Pagination.Item>)
                )}
                <Pagination.Next onClick={e => setCurrentPage(pages[pages.length - 1] > currentPage ?
                    currentPage + 1 : pages[pages.length - 1] )} />
                <Pagination.Last onClick={e => setCurrentPage(pages[pages.length - 1])}/>
            </Pagination>
        </div>
    );
});

export default PaginationBasic;