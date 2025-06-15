import '../assets/css/Filter.css'

function Filter(){
    return <form className="d-flex mb-3" role="search">
        <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
        />
        <button className="btn btn-outline-primary" type="submit">
            Buscar
        </button>
    </form>

}

export default Filter;