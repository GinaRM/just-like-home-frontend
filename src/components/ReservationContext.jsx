import React, { createContext, useState } from "react";

export const ReservationContext = createContext();

export const ReservationProvider =({children})=>{
    const [reservationsDates, setReservationsDates] = useState([])

    return(
        <ReservationContext.Provider value ={{reservationsDates, setReservationsDates}}>
            {children}
        </ReservationContext.Provider>
    )

}