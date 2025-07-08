import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    
const {dispatch} = useBudget()

const changeHandle = ( e: React.ChangeEvent<HTMLSelectElement>) => {
dispatch({type:"current-filter", payload:{id:e.target.value}})
}


  return (
    <div className="bg-white rounded-lg shadow-lg py-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5 w-4/5 mx-auto">
        <label htmlFor="category">Categorias</label>
        <select onChange={changeHandle} className="bg-slate-100 p-3 flex-1 rounded" name="category" id="category">
          <option value=""> --Todas las categorias</option>
          { 
            categories.map( cat =>
            <option value={cat.id}>{cat.name}</option>
            )}
        </select>
        </div>
      </form>
    </div>
  );
}
