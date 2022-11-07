const filterList = ['todos', 'meus', 'design', 'desenvolvimento', 'marketing', 'vendas']

export default function ProjectFilter({ currentFilter, changeFilter }) {

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
    console.log(currentFilter)
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
