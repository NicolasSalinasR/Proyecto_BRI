import Filter from "../Filter.jsx";
import Plate from "../Plate.jsx";
import {useNavigate} from "react-router-dom";

function Home(){
    return (
        <>
            <h1>Plataforma de Recetas</h1>
            <Filter />
            <Plate />
        </>
    )
}

export default Home;