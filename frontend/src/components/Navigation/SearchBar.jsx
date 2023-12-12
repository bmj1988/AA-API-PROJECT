import './Navigation.css'

const SearchBar = () => {


    return (<form className='searchBar'>
        <input type='search' placeholder='Build your search' className='searchTextInput' />

       <button className='modalMenuItem'> <i className="fa-solid fa-trowel-bricks" style={{ color: "#1bcdd0", fontSize: "33px", border: 'none' }} /></button>

    </form>)
}

export default SearchBar
