import {useNavigate} from "react-router-dom";
import ResultInfo from "../ResultInfo.jsx";
import "../../assets/css/ResultPage.css";

function ResultPage(){

    const navigate = useNavigate();

    const Home = () => {
        navigate('/');
    };


    return (
        <>
            <h1 className="header-title" onClick={Home}>Plataforma de Recetas</h1>
            <ResultInfo />
        </>
    )
}

export default ResultPage;