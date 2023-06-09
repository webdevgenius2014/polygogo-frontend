import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import Input from '../forms/form-fields/Input';
import { useState, useEffect } from 'react';
interface ReviewPlateformsInterface {
    searchReviewPlatform: string;   
}
type Props={
    currentStep:any;
    userData:any;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;   
};
const validationSchema = Yup.object().shape({
    searchReviewPlatform: Yup.string().required('Eneter review platform.')  
});
const ReviewPlateformsSetup: React.FC<Props>=({currentStep, prevStep})=>{
    const [reviewPlateform, setReviewPlateform]= useState<string | ''>('');        
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<ReviewPlateformsInterface>({resolver: yupResolver(validationSchema)});   
    const saveReviewPlateforms=()=>{
        console.log(reviewPlateform);
    }; 
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Review Platforms</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={saveReviewPlateforms}
            isbackbutton={false}
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
                            <div className={`display-flex align-items-center justify-content-center ${dstyles.review_plateforms_list}`}>
                                <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`}>
                                    <img src="/dashboard/icons/google.svg" alt="google" className={dstyles.icon_img} />
                                </button> 
                                <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`}>
                                    <img src="/dashboard/icons/faceboook.svg" alt="faceboook" className={dstyles.icon_img} />
                                </button>
                                <button type='button' className={`${dstyles.btn} ${dstyles.review_btn}`}>
                                    <img src="/dashboard/icons/glassdoor.svg" alt="glassdoor" className={dstyles.icon_img} />
                                </button>
                            </div>                            
                        </div>
                    </div>                    
                </div>
            </div>
        </Form>
    </>)
}
export default ReviewPlateformsSetup;