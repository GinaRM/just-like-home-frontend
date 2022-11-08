import React, { useState, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FilterContext } from "../FilterContext";
import { DateRangePicker } from "react-date-range";
import SearchCities from "../SearchCities/SearchCities";
import "./searchbar.css";
import defaultLocale from "date-fns/locale/es";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/min/moment-with-locales";
import { Link } from "react-router-dom";

function SearchBar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [search, setSearch] = useState({
    cityCode: null,
    rangeOfDates: {
      checkIn: null,
      checkOut: null,
    },
  });
  /* 
  const [search, setSearch] = useState(filterData); */
  const { filterData } = useContext(FilterContext);
  /* setSearch(FilterContext) */
  /* setSearch(filterData) */

  const { handleFilterData } = useContext(FilterContext);

  const windowDimension = useWindowDimensions();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const [dropCalendar, setDropCalendar] = useState(false);

  const showCalendar = () => {
    setDropCalendar(!dropCalendar);
  };

  /*
  <SearchIcon 
            sx={{ fontSize: 40 }}
            style={{cursor: "pointer"}}
            
            onClick={() => handleFilterData(search)}

  ></SearchIcon>



  <div className="flex">
              <button className="button-2" onClick={resetInput}>
                Cancelar
              </button>
              <button className="button-2">Buscar</button>
  </div>


  onChange={(e) => setSearchInput(e.target.value)}
  value={searchInput}
  */

  function newDateFormatter(date) {
    const dateDayFirst = moment(date).locale("es");

    return dateDayFirst.format("DD/MM/YYYY");
  }

  function sendedDateFomatter(date) {
    const d = moment(date).locale("es");
    return d.format("YYYY-MM-DD");
  }

  const [inputPlaceholder, setInputPlaceholder] = useState(
    "Check in - Check out"
  );

  function applyDates() {
    setSearch({
      ...search,
      rangeOfDates: {
        checkIn: sendedDateFomatter(startDate),
        checkOut: sendedDateFomatter(endDate),
      },
    });

    setInputPlaceholder(
      newDateFormatter(startDate) + " - " + newDateFormatter(endDate)
    );
    setDropCalendar(false);
  }

  function RedirectSearch() {
    if (
      search.cityCode != null ||
      search.rangeOfDates.checkIn != null ||
      search.rangeOfDates.checkOut != null ||
      search.category != null
    ) {
      return (
        <Link to="/filtrado">
          <div
            className="button-search"
            onClick={() => handleFilterData(search)}
          >
            Buscar
          </div>
        </Link>
      );
    } else {
      return (
        <div className="button-search" onClick={() => handleFilterData(search)}>
          Buscar
        </div>
      );
    }
  }
  return (
    <div className="searchbar-container" id="search-bar">
      <h1> Busca ofertas en casas, cabañas y mucho más</h1>

      <div className="search-bar">
        <SearchCities
          setSearch={(newSearch) => setSearch({ ...search, ...newSearch })}
        />
        <div className="search-bar-dates">
          <div className="search-input" onClick={showCalendar}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>{inputPlaceholder}</span>
          </div>
          {dropCalendar && (
            <div className="calendar-container">
              {windowDimension.width < 768 ? (
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#E48561"]}
                  onChange={handleSelect}
                  locale={defaultLocale}
                  direction="horizontal"
                  months={1}
                  showDateDisplay={false}
                />
              ) : (
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#E48561"]}
                  onChange={handleSelect}
                  locale={defaultLocale}
                  direction="horizontal"
                  months={2}
                  showDateDisplay={false}
                />
              )}

              <div className="button-search-container">
                <button className="button-search" onClick={applyDates}>
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>

        <RedirectSearch />
      </div>
    </div>
  );
}

export default SearchBar;
