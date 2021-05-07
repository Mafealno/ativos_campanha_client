import React, { useState, useEffect} from 'react'
import ReactPaginate from "react-paginate";
import "./Paginacao.css";

function Paginacao(props) {

    const [totalDePaginas, setTotalDePaginas] = useState(0);

    useEffect(() => {
        setTotalDePaginas(totalPaginas(props.quantidadePagina, props.totalRegistros));
    }, [props.quantidadePagina, props.totalRegistros])

    const totalPaginas = (quantidadePagina, totalRegistros) => {
        return totalRegistros / quantidadePagina;
    }

    const mudarPagina = (dados) => {
        const paginaSelecionada = dados.selected;
        props.paginaAtual(paginaSelecionada);
        props.setCarregando(true);
    }

    return (
        <div className="container-paginacao">
            <ReactPaginate
            previousLabel={'<'}
            previousClassName={"item-pagina"}
            previousLinkClassName={"link-item-pagina"}
            nextLabel={'>'}
            nextClassName={"item-pagina"}
            nextLinkClassName={"link-item-pagina"}
            breakLabel={"..."}
            breakClassName={"item-pagina"}
            breakLinkClassName={"link-item-pagina"}
            pageClassName={"item-pagina"}
            pageLinkClassName={"link-item-pagina"}
            pageCount={totalDePaginas}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={mudarPagina}
            containerClassName={'pagination'}
            activeClassName={'pagina-atual'}
            />
        </div>
    )
}

export default Paginacao;
