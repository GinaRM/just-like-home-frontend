import MyReservationsTemplate from "../../components/MyReservations/MyReservations";
import Footer from "../../components/Footer/Index";
import "./my-reservations.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";

const MyReservationsPage = () => {

  const onClick = () => {
    document.getElementById("details").scrollIntoView();
}
  return (
    <div className="main main-reservations" id="top">
    <MyReservationsTemplate/>
    <div className="pagination">
    <p className="to-the-top" onClick={onClick}>Volver al inicio  <FontAwesomeIcon icon={faArrowUp} className="pagination-icon" /></p>
    </div>
    </div>
  );
}

export default MyReservationsPage;