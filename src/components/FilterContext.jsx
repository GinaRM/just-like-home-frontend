import React, { createContext, useState } from "react";

export const FilterContext = createContext();


export const FilterProvider =({children})=>{
    const [filterData, setFilterData] = useState({
        cityCode: null,
        category: null,
        rangeOfDates: {
            checkIn:null,
            checkOut: null
        }
      
    });

    const handleFilterData = newValues => {
        setFilterData({...filterData, ...newValues})
    }

    return (
        <FilterContext.Provider value ={{filterData, setFilterData, handleFilterData}}>
            {children}
        </FilterContext.Provider>
    )
}
