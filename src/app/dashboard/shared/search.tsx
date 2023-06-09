import SearchForm from '../forms/searchForm'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Search =()=>{
    const router =  useRouter();
    const [searchText, setSearchText] = useState("");
    const searchContent=()=>{
        if(searchText &&  searchText.length>3){
            router.push('/dashboard/search');
        }else{
            return;
        }
    }
    return(
        <SearchForm searchText={searchText} setSearchText={setSearchText} searchValue={searchContent} />
    );
}
export default Search;