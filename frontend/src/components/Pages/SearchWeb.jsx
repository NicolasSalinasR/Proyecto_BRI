import { useNavigate, useLocation } from "react-router-dom";
import RecipeCard from "../RecipeCard.jsx";
import Filter from "../Filter.jsx";
import Filter2 from "../Filter2.jsx";
import '../../assets/css/SeachWeb.css';


/*
* Componente que muestra la página de busquedas intermedias, en donde puedes aplicar más filtros antes de elegir la
* receta que finalmente vez
* */
function SearchWeb() {

    /* Para moverse a otra página y recuperar la información de recetas estaticas*/
    const navigate = useNavigate();
    const location = useLocation();
    const recetas = location.state || [];

    const Home = () => {
        navigate('/');
    };

    return (
        <>
            <h1 onClick={Home}>Plataforma de Recetas</h1>
            <Filter />
            <Filter2 />

            {/**Para mostrar las recetas*/}
            <div className="recipe-grid">
                {recetas.length > 0 ? (
                    recetas.map((receta, index) => (
                        <RecipeCard key={index} receta={receta} />
                    ))
                ) : (
                    <p>No se encontraron recetas.</p>
                )}
            </div>
        </>
    );
}

export default SearchWeb;
