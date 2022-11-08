import React, { useContext, useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Index";
import Footer from "./components/Footer/Index";
import Listar from "./components/List/List";
import ProductPage from "./pages/Product/ProductTemplate";
import { UserProvider } from "./components/UserContext";
import { FilterProvider } from "./components/FilterContext";
import Reservation from "./components/Reservation/Reservation";
import PrivateRoute from "./components/RequireAuth";
import ConfirmationMessage from "./components/Reservation/ConfirmationMessage";
import { ReservationProvider } from "./components/ReservationContext";
import Search from "./pages/Search/Search";
import CreateProducts from "./components/CreateProducts/CreateProducts";
import MyReservationsPage from "./pages/MyReservations/MyReservationsTemplate";

import AdminRoute from "./components/AdminAuth";

function App() {
  
  return (
    <div className="App">
      <UserProvider>
        <FilterProvider>
          <ReservationProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/listar" element={<Listar />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/filtrado" element={<Search />} />

                <Route element={<AdminRoute />}>
                  <Route path="/administration" element={<CreateProducts />} />
                  
                  <Route
                    path="/ConfirmationProduct"
                    element={
                      <ConfirmationMessage
                        message={"Su propiedad fue creada con éxito"}
                      />
                    }
                  />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route
                    path="/product/reservation/:id"
                    element={<Reservation />}
                  />
                  <Route path="/myreservations" element={<MyReservationsPage />} />
                  <Route
                    path="/ConfirmationMessage"
                    element={
                      <ConfirmationMessage
                        message={"Su reservación se ha realizado con éxito"}
                      />
                    }
                  />
                </Route>
              </Routes>

              <Footer />
            </BrowserRouter>
          </ReservationProvider>
        </FilterProvider>
      </UserProvider>
    </div>
  );
}

export default App;
