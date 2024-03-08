import './Pagination.sass'

export default function Pagination(props) {

    const pages = [];

    for (let i = 1; i <= Math.ceil(props.total / props.gamePerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => (
                <button key={index} className={props.currentPage === page ? 'active-page' : 'page'} onClick={() => props.setCurrentPage(page)}>{page}</button>
            ))}
        </div>
    )

}