import Header from "../../components/Header/Index"
import SearchTemplate from "../../components/SearchPage/SearchTemplate"
import SearchBar from "../../components/Buscador/SearchBar"
import Footer from "../../components/Footer/Index"
import PaginationNumbers from "../../components/Pagination/Pagination";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    localStorage.removeItem("url");
    const onClick = () => {
 

        document.getElementById("search-bar").scrollIntoView();
    }
    return(
        <div className="main main-search">
        <Header/>
        <SearchBar/>
        <SearchTemplate/>
        {/*<PaginationNumbers pages={pages} setCurrentPage={setCurrentPage} /> */}
        <div className="pagination" >
        <p className="to-the-top" onClick={onClick}>Volver al inicio  <FontAwesomeIcon icon={faArrowUp} className="pagination-icon" /></p>
      </div>
        </div>
    )
}

export default Search