import dstyles from '../../../styles/dashboard/dstyles.module.scss'
type Props={
    searchText:any;
    searchResults:(val: any) => void  
}
const SearchResults: React.FC<Props>=({searchText, searchResults})=>{
    return(
        <div className={dstyles.page_container}>
            <div className='h-100 text-center pt-5'>
                <h4>No Results are found {searchText}.</h4> 
            </div>
        </div>
    );
};
export default SearchResults;