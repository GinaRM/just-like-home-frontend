import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./product-template.css";
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

function ProductHeader({category, title, path}){
    return (
        <div className="product-header">
            <div className="product-header_info">
                <p>{category}</p>
                <h2>{title}</h2>
            </div>
            <Link to={path} >
                <FontAwesomeIcon icon={faChevronLeft}/>
            </Link>
            
        </div>
    )
}

export default ProductHeader;