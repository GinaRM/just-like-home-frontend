import React from "react";
/* import products from "./products.json" */

function Amenities({product}){
    /* console.log("IAKDKLASDA"), */
    return(product.amenities.map(item => (
        <div key={item.id}>
            <img src={item.icon}/>
            <p>{item.title}</p>
        </div>
    )))
}

export default Amenities;