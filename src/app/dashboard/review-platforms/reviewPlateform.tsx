import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Form from '../forms/Form'
import Input from '../forms/form-fields/Input'
import ReviewModal from './reviewModal'
import { plateformsList } from './plateforms'
import SearchBusinessModal from './searchBusinessModal'
import { useRouter } from 'next/navigation'
interface ReviewPlateformsInterface {
    searchReviewPlatform: string;     
    platformList: {};
    setPlatFormList:(val:{})=>void;
}
type Props={
    currentStep:any;
    userData:any;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;    
    googlePlaceId?:string;
    facebookPageId?:string;
    removePlateformId:(val:any)=>void;
    savePlatform:any;
};
// const validationSchema = Yup.object().shape({
//     searchReviewPlatform: Yup.string().required('Eneter review platform.')
// });
const ReviewPlateformsSetup: React.FC<Props>=({currentStep, prevStep, googlePlaceId, facebookPageId, removePlateformId, savePlatform})=>{
    const router = useRouter();
    const [reviewPlateform, setReviewPlateform]= useState<string | ''>('');       
    const [platformList, setPlatFormList]= useState<any | null>(null);
    const [connectedPlateforms, setConnectedPlateforms]=useState<any | null>(null)     
    const [modalData, setModalData]=useState<any | null>(null); 
    const [message, setMessage]=useState("");   
    const [isShowPlatformModal, setShowPlatforModal]= useState<boolean | false>(false);
    const [isShowbusinessModal, setShowbusinessModal]= useState<boolean | false>(false);
    const [searchResults, setSearchResults]=useState<any | null>(null);
    const [showResults, setShowResults] = useState<boolean | false>(false);
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<ReviewPlateformsInterface>();
       
    const searchReviewPlateforms=()=>{
       console.log(connectedPlateforms);
        if(connectedPlateforms && connectedPlateforms.length>0){
            setMessage('');
            router.push('/dashboard');
        }
        else{
            setMessage("Review Platform is not connected.");
        }    
    }; 
     
    const getPlateformsData=()=>{        
        let isGoogleConnect = googlePlaceId && googlePlaceId?.length>1?true:false;
        let isFacebookConnect = facebookPageId && facebookPageId?.length>1?true:false;        
        const data = plateformsList(isGoogleConnect, isFacebookConnect);        
        if(data){
            filterConnectedPlateforms(data);
            const filterData = data[0].plateforms.filter((p:any) => p.connected === false);
            setPlatFormList(filterData);
        }        
    }
    const filterConnectedPlateforms=(data:any)=>{   
        const filterData = data[0].plateforms.filter((p:any) => p.connected === true);
        setConnectedPlateforms(filterData);
    }
    useEffect(()=>{                    
        getPlateformsData();
    },[googlePlaceId, facebookPageId]);    
      
    const setRemovePlateform=(platform:string)=>{
        let payload=null;
        switch(platform){
            case 'google':
                return payload ={ googlePlaceId : " " }
            case 'facebook':
                return payload ={ facebookPageId : " " }
            default:
                return null
        }
    }
    const removePlateform=(platform:string)=>{        
        let payload = setRemovePlateform(platform);
        console.log(payload);           
        if(payload!==null){
            removePlateformId(payload);            
        }
        getPlateformsData();
    };   
    const closePlatformModal = () => setShowPlatforModal(false);
    const closeBusinessModal = () => setShowbusinessModal(false);
    const showBusinessModal = () => setShowbusinessModal(true);
    const openReviewModal=(platformId:number)=>{        
        const plateform = platformList.filter((p:any) => p.id === platformId);       
        if(plateform){
            setModalData(plateform[0]);            
        }
    };
    const savePlateformData = ( payload:any )=>{
        savePlatform(payload);
        if(isShowbusinessModal===true){
            closeBusinessModal();
        }
        if(isShowPlatformModal===true){
            closePlatformModal();
        }
    } 
    const handleSearch=(val:any)=>{
        const data = plateformsList();  
        if(val.length>1){
            setShowResults(true);
            const filterData = data[0].plateforms.filter((p:any) => p.name.includes(val));
            setSearchResults(filterData);
        }else{
            setShowResults(false);
        }
    }
    console.log(platformList);
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Review Platforms</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={searchReviewPlateforms}          
            onBack={prevStep}
            buttonLabel="continue"
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.user_review_Box}>
                    <div className={dstyles.user_box}>
                        <div className={dstyles.user_image}>
                            <img src="/dashboard/avtar.png" alt="avtar" className='w-100 h-auto' />
                        </div>
                        <div className={dstyles.user_review}>
                            <img src="/dashboard/icons/stars.png" alt="stars" className='mw-100' />
                            <p className='text-sm mt-1 mb-0'>Rated 5.0/5.0 by users</p>
                        </div>
                    </div>
                    <div className={dstyles.platform_box}>
                        <div className='d-flex align-items-start'>
                            <img src="/dashboard/icons/google.svg" alt="google" className={dstyles.icon_img} /> 
                            <span className={dstyles.count}>10,698</span>
                        </div>
                        <div className={dstyles.reviews}>
                            <img src="/dashboard/icons/stars.png" alt="stars" className='mw-100' />
                            <p className='text-sm mt-1 mb-0'>5-star reviews from satisfied customer</p>
                        </div>
                    </div>
                    <img
                        src={`/dashboard/review-indicate.png`}
                        alt="review-indicate"                         
                        className={`mw-100 ${dstyles.connect_arrow}`}                                
                    />
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <div className={`${dstyles.mx_362}`}><h3 className={dstyles.title}>Connect a Platform you'd Like to<br className='d-none d-lg-block' /> Get a Review Form</h3></div>
                        <div className={`${dstyles.mx_362}`}>
                            <Input
                                name="searchReviewPlatform"                                               
                                register={register}                                                
                                value={reviewPlateform}                               
                                handleChange={(e:any)=>{
                                    handleSearch(e.target.value);
                                    setReviewPlateform(e.target.value)
                                }} 
                                type='search'
                                placeholder="Search"
                                label="Search Review Platform"
                                error={formState.errors.searchReviewPlatform?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}                                
                                className={`form-control ps-3 ps-lg-4 ${dstyles.input_field} ${formState.errors.searchReviewPlatform ? dstyles.is_invalid : ''}`}         
                            /> 
                            {showResults?(<>
                                <p className={`mt-4 ${dstyles.text_primary}`}>All Plateforms</p>
                                <div className={`display-flex align-items-center justify-content-center flex-wrap ${dstyles.review_plateforms_list}`}>
                                {searchResults && searchResults.map((plateform:any, key:number)=>{
                                    return(                                        
                                        <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`} key={`plateform-${key}`} 
                                            name={plateform?.name}   
                                            onClick={()=>{
                                                setShowPlatforModal(true);
                                                openReviewModal(plateform?.id)}
                                            }
                                        >
                                            <img src={plateform?.icon?.image} alt={plateform?.icon?.alt} className={dstyles.icon_img} />
                                        </button> 
                                    )
                                })}                                
                            </div>
                            </>):(<>
                                {connectedPlateforms!==null &&  connectedPlateforms.length>0 && <>
                                    <p className={`mt-5 ${dstyles.text_primary}`}>Connected Plateforms</p>
                                    <div className={`display-flex align-items-center justify-content-center flex-wrap ${dstyles.review_plateforms_list}`}>
                                        {connectedPlateforms.map((plateform:any)=>{
                                            return(                                                                                
                                                <div key={`plateform-${plateform?.id}`} className={`position-relative ${dstyles.connected_app}`}>
                                                    <button type="button"  name={plateform?.name} className={`${dstyles.btn} ${dstyles.review_btn}`}>
                                                        <img src={plateform?.icon?.image} alt={plateform?.icon?.alt} className={dstyles.icon_img} />
                                                    </button> 
                                                    <span onClick={()=>removePlateform(plateform?.name)} className={`${dstyles.remove_btn} ${dstyles.btn_link} ${dstyles.link}`}>X</span>
                                                </div>
                                            );
                                        })}
                                    </div>                                    
                                </> } 
                                {platformList && platformList.length>0 && (<> 
                                    <hr />                                                          
                                    <p className={`mt-4 ${dstyles.text_primary}`}>All Plateforms</p>
                                    <div className={`display-flex align-items-center justify-content-center flex-wrap ${dstyles.review_plateforms_list}`}>
                                        { platformList.map((plateform:any, key:number)=>{
                                            return(                                        
                                                <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`} key={`plateform-${key}`} 
                                                    name={plateform?.name}   
                                                    onClick={()=>{
                                                        setShowPlatforModal(true);
                                                        setMessage('');
                                                        openReviewModal(plateform?.id)}
                                                    }
                                                >
                                                    <img src={plateform?.icon?.image} alt={plateform?.icon?.alt} className={dstyles.icon_img} />
                                                </button> 
                                            )
                                        })}                                
                                    </div> 
                                </>)}
                            </>)} 
                            {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 text-danger`}>{message}</p></div>}                          
                        </div>
                    </div>                    
                </div>
            </div>
        </Form> 
        <SearchBusinessModal 
            modalId="SearchBusinessModal"
            message={message}
            setMessage={setMessage} 
            isshowbusinessModal={isShowbusinessModal}            
            closeBusinessModal={closeBusinessModal}
            buttonAction={savePlateformData}
        />
        <ReviewModal 
            modalId="ReviewPlatformModal"
            buttonLabel={modalData?.plateformOptions?.buttonLabel}
            buttonAction={savePlateformData} 
            platformName={modalData?.plateformOptions?.modalTitle}
            icon= {modalData?.icon}
            message={message}
            setMessage={setMessage}
            isShowPlatformModal={isShowPlatformModal}             
            closePlatformModal={closePlatformModal} 
            showBusinessModal={showBusinessModal}          
        > </ReviewModal>
    </>)
}
export default ReviewPlateformsSetup;