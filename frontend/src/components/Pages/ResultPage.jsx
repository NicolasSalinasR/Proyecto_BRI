import {useNavigate} from "react-router-dom";
import ResultInfo from "../ResultInfo.jsx";

function ResultPage(){

    const navigate = useNavigate();

    const Home = () => {
        navigate('/');
    };

    return (
        <>
            <h1 onClick={Home}>Plataforma de Recetas</h1>
            <ResultInfo />
        </>
    )
}

export default ResultPage;