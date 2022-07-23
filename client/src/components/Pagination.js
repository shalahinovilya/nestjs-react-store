import React, {useContext} from 'react';
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {createPages} from "../utils/CreatePages";

const PaginationBasic = observer(() => {

    const {product} = useContext(Context)

    const pageCount = Math.ceil(product.totalRecords / product.limit)
    const pages = []
    product.setOffset(product.page * product.limit - product.limit)

    createPages(pages, product.page, pageCount)

    return (
        <div className="pagination-block">
            <Pagination size="lg">
                <Pagination.First onClick={e => product.setPage(1)}/>
                <Pagination.Prev onClick={e => product.setPage(pages[0] < product.page ? product.page - 1 : 1)}/>
                {pages.map(pageNum =>
                    (<Pagination.Item
                        onClick={e => {
                            pageNum !== product.page && product.setPage(pageNum)
                        }}
                        key={pageNum}
                        active={pageNum === product.page}
                    >
                        {pageNum}
                    </Pagination.Item>)
                )}
                <Pagination.Next onClick={e => product.setPage(pages[pages.length - 1] > product.page ?
                    product.page + 1 : pages[pages.length - 1])}/>
                <Pagination.Last onClick={e => product.setPage(pages[pages.length - 1])}/>
            </Pagination>
        </div>
    );
});

export default PaginationBasic;