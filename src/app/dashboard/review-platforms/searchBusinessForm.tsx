import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useState, useEffect, useRef, useMemo } from 'react';
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
import { GoogleMap, Marker} from "@react-google-maps/api";
interface SearchBusinessInterface {    
    businessName:string;
}
type Props={
    savePlatform:(val:any)=>void;    
    message:any;
    setMessage:(val:any)=>void;   
};
const scriptOptions= {
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
}
const SearchBusiness:React.FC<Props>=({savePlatform, message, setMessage})=>{    
    const { isLoaded, loadError } = useLoadScript(scriptOptions);   
    const [autocomplete, setAutocomplete] = useState(null);
    const [businessName, setBusinessName] = useState(''); 
    const [ placeId, setPlaceId]= useState<string | ''>('');
    const inputRef = useRef<any | null>(null);  
    const onLoad = (autocompleteObj:any) => {       
        setAutocomplete(autocompleteObj);
    }  
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
 
    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();        
        if(place.place_id) {
            setPlaceId(place.place_id); 
            setBusinessName(place.name);
        } 
    }
    const validationSchema = Yup.object().shape({
        // businessName: Yup.string().required('Company Name is required')    
    });
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<SearchBusinessInterface>({resolver: yupResolver(validationSchema)});
   
    const submitForm=()=>{
        let payload={
            googlePlaceId:placeId
        }       
        savePlatform(payload);  
                   
    }   
    return(<>       
        <form id="SearchBusinessForm" onSubmit={handleSubmit(submitForm)} className={dstyles.form}>
            { loadError && (
                <div className={`text-center ${dstyles.text_lg}`}>Google Map script can't be loaded, please reload the page</div>
            ) }
            { isLoaded && (<>
                <div className='d-flex align-items-center justify-content-center'>
                    <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                    > 
                        <Input
                            name="businessName" 
                            type='text'                                              
                            register={register}                
                            value={businessName}
                            handleChange={(e:any)=>setBusinessName(e.target.value)}                                         
                            placeholder="Business Name"
                            error={formState.errors.businessName?.message}
                            wrapperClass={`mb-0 form-group`}
                            iconClass={`position-relative ${dstyles.input_business} ${dstyles.icon_wrap}`}
                            className={`form-control ${dstyles.input_field} ${formState.errors.businessName ? dstyles.is_invalid : ''}`}         
                        />
                    </StandaloneSearchBox> 
                    <button type="submit" disabled={formState && formState.isSubmitting===true} className={`ms-2 mt-0 ${dstyles.btn} ${dstyles.btn_primary}`}>
                        {formState && formState.isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
                        <span className="fw-bold">Submit</span>
                        <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
                    </button>
                </div>
                {/* <GoogleMap
                    mapContainerClassName={dstyles.map_container}
                    center={center}
                    zoom={10}
                ></GoogleMap> */}
               
                                              
            </>)} 
        </form>
    </>)
}
export default SearchBusiness;