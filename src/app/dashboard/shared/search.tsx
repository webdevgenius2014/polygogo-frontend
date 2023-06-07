import SearchForm from '../forms/searchForm'
import { useState } from 'react';
const Search =()=>{
    const [searchText, setSearchText] = useState("");
    const searchContent=()=>{}
    return(
        <SearchForm searchText={searchText} setSearchText={setSearchText} searchValue={searchContent} />
    );
}
export default Search;