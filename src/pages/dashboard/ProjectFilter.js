const filterList = ['todos', 'financeiro', 'logistica', 'suprimentos', 'materiais', 'carga']

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }

  return (

    <div className="project-filter">
      <nav>
        <p>Filtros: </p>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? 'active' : ''}
          >{filter}</button>
        ))}
      </nav>
    </div>

  )
}
