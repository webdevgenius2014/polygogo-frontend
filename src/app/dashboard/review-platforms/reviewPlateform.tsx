import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import { useState, useEffect, useRef } from 'react';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import ReviewModal from './reviewModal';
import { plateformsList } from './plateforms';
import ProfileService from '../../../services/profile.service';

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
    reloadData:(val:any)=>void;
};
const validationSchema = Yup.object().shape({
    searchReviewPlatform: Yup.string().required('Eneter review platform.')  
});
const ReviewPlateformsSetup: React.FC<Props>=({currentStep, prevStep, googlePlaceId, facebookPageId, removePlateformId, reloadData})=>{
    const [reviewPlateform, setReviewPlateform]= useState<string | ''>('');       
    const [platformList, setPlatFormList]= useState<any | null>(null);
    const [connectedPlateforms, setConnectedPlateforms]=useState<any | null>(null)
    const [isshowModal, setIsShowModal]=useState(false);
    // const [currentModal, setCurrentModal]= useState<string|''>('');
    const [modalData, setModalData]=useState<any | null>(null); 
    const [message, setMessage]=useState("");
    const [currentRef, setCurrentRef] = useState(null);
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<ReviewPlateformsInterface>({resolver: yupResolver(validationSchema)});   
    const searchReviewPlateforms=()=>{
        // console.log(reviewPlateform);
    };   
    const getPlateformsData=()=>{        
        let isGoogleConnect = googlePlaceId && googlePlaceId?.length>1?true:false;
        let isFacebookConnect = facebookPageId && facebookPageId?.length>1?true:false;        
        const data = plateformsList(isGoogleConnect, isFacebookConnect);        
        if(data){
            filterConnectedPlateforms(data);
            setPlatFormList(data[0].plateforms);
        }        
    }
    const filterConnectedPlateforms=(data:any)=>{   
        const filterData = data[0].plateforms.filter((p:any) => p.connected === true);
        setConnectedPlateforms(filterData);
    }
    useEffect(()=>{               
        getPlateformsData();
    },[googlePlaceId, facebookPageId]);    
    const openReviewModal=(platformId:number)=>{        
        setIsShowModal(true);        
        const plateform = platformList.filter((p:any) => p.id === platformId);       
        if(plateform){
            setModalData(plateform[0]);            
        }
    };
    const closeModal =(ref:any)=>{
        // console.log(ref.current);        
        // setIsShowModal(false);
    }
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
    const savePlateform= async(payload:any )=>{
        console.log(payload);
        await ProfileService.completeProfile( payload ).then((response)=>{      
            if(response){        
              if(response.status===200){
                setMessage(''); 
                // closeModal(currentRef);
                reloadData;            
              }else{
                setMessage(response.data.message);                        
              }
            }
        },error=>{      
            setMessage(error.data.message);         
        });
    }
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Review Platforms</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={searchReviewPlateforms}
            //isbackbutton={false}
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
                                handleChange={(e:any)=>{setReviewPlateform(e.target.value)}} 
                                type='search'
                                placeholder="Search"
                                label="Search Review Platform"
                                error={formState.errors.searchReviewPlatform?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                // iconClass={`position-relative ${dstyles.input_user} ${dstyles.icon_wrap}`}
                                className={`form-control ps-3 ps-lg-4 ${dstyles.input_field} ${formState.errors.searchReviewPlatform ? dstyles.is_invalid : ''}`}         
                            /> 
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
                                <hr />
                            </> }                            
                            <p className={`mt-4 ${dstyles.text_primary}`}>All Plateforms</p>
                            <div className={`display-flex align-items-center justify-content-center flex-wrap ${dstyles.review_plateforms_list}`}>
                                {platformList && platformList.map((plateform:any, key:number)=>{                                    
                                    return(
                                        <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`} data-bs-toggle="modal" data-bs-target="#ReviewModal" key={`plateform-${key}`} 
                                            name={plateform?.name}   
                                            onClick={()=>{
                                                setCurrentModal(plateform?.name);
                                                openReviewModal(plateform?.id)}
                                            }
                                        >
                                            <img src={plateform?.icon?.image} alt={plateform?.icon?.alt} className={dstyles.icon_img} />
                                        </button> 
                                    )
                                })}                                
                            </div>                            
                        </div>
                    </div>                    
                </div>
            </div>
        </Form> 
        <ReviewModal 
            modalId="ReviewModal" 
            currentRef={currentRef}
            setCurrentRef={setCurrentRef} 
            isopen={isshowModal}                
            buttonLabel={modalData?.plateformOptions?.buttonLabel}
            buttonAction={savePlateform} 
            platformName={modalData?.plateformOptions?.modalTitle}
            icon= {modalData?.icon}
            message={message}
            setMessage={setMessage}
        >   
        </ReviewModal>
    </>)
}
export default ReviewPlateformsSetup;