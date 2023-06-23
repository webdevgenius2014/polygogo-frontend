import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Form from '../forms/Form'
import Input from '../forms/form-fields/Input'
import Dropdown from '../forms/form-fields/Dropdown'
import { getStateData, filterStateCode, getCityData } from '../../../helpers/cityState'
import { useEffect, useState } from 'react'
import RadioGroup from '../forms/form-fields/RadioGroup'

interface BusinessSetupInterface {
    companyName: string;
    buildingName:string;
    businessAddress:string;
    city:string;
    state:string;
    zipCode:string;
    companyStrength:string;
    companyRevenue:string;
}
type Props={
    currentStep:any;
    userData:any;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void;
    name:any;
    companyDetails:any;
    setCompanyDetails: (val:any)=>void;
    saveData: (val:any)=>void;
    message:any;
    alertClass: any;
    isloading:boolean;
};

const validationSchema = Yup.object().shape({    
    companyName: Yup.string().required('Company name is required')
});
const BusinessSetup:React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData, name, companyDetails, setCompanyDetails, saveData, message, alertClass, isloading})=>{
    const [addressOne, setAddressOne]=useState(companyDetails.address_one)
    const [addressTwo, setAddressTwo]=useState(companyDetails.address_two);
    const [companyName, setCompanyName]=useState(companyDetails.company_name)
    const [stateVal, setStateVal]= useState(companyDetails.state);
    const [cityVal, setCityVal]= useState(companyDetails.city);
    const [zipcode,setZipcode]= useState(companyDetails.zipcode);
    const [companyStrength, setCompanyStrength]= useState(companyDetails.resources_strength);
    const [revanue, setRevanue]= useState(companyDetails.revanue);
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<BusinessSetupInterface>({resolver: yupResolver(validationSchema)});
   
    useEffect(()=>{
        setCompanyDetails({
            company_name:companyName, 
            address_one:addressOne, 
            address_two:addressTwo, 
            city:cityVal,
            state:stateVal,
            zipcode:zipcode, 
            resources_strength:companyStrength, 
            revanue:revanue
        })
    },[addressOne, addressTwo, companyName, stateVal, cityVal, zipcode, companyStrength, revanue])
    const countryCode = 'US';
    const [cityData, setCityData]= useState<any | null>(null);    
    const stateData = getStateData(countryCode);
    const strengthOptions=[
        {
            name:'stOne',
            label:'Just Me',
            value:'just me'
        },
        {
            name:'stOneTwo',
            label:'2-4',
            value:'2-4'
        },
        {
            name:'stThree',
            label:'5-9',
            value:'5-9'
        },
        {
            name:'stFour',
            label:'10+',
            value:'10+'
        }

    ];
    const revenueOptions=[
        {
            name:'revenueOne',
            label:'<$500k',
            value:'<$500k'
        },
        {
            name:'revenueTwo',
            label:'$500k-$1m',
            value:'$500k-$1m'
        },
        {
            name:'revenueThree',
            label:'$1m-$2m',
            value:'$1m-$2m'
        },
        {
            name:'revenueFour',
            label:'$2m+',
            value:'$2m+'
        }
    ];
    useEffect(()=>{ 
        if(stateVal){ 
            const stateCode = filterStateCode(countryCode, stateVal);             
            if(stateCode){                
                const cityList = getCityData(countryCode, stateCode);
                if(cityList){
                    setCityData(cityList);
                }
            }
        }
    },[stateVal]); 
    const saveManualBusinessData=()=>{
        let payload = {
            name : name, 
            ...companyDetails          
        };       
        saveData(payload);
    }
    return(<>
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Select the business to use with company.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={saveManualBusinessData}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
            isloading={isloading}
        >
            <div className={`d-flex justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.image_wrap}>
                    <img src="/dashboard/location-view.png" alt="location-view" />
                </div>
                <div className={`${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div className='mx-auto' style={{maxWidth:'52.25rem'}}>
                        <h3 className={dstyles.title}>Connect your Google listing, then make it super simple to collect reviews by texting review invitations to your customers.</h3>
                        <div className='row gx-2'>
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                                <Input
                                    name="buildingName"                                               
                                    register={register} 
                                    placeholder="Suite/Unit/Building(optional)"
                                    value={addressOne}
                                    handleChange={(e:any)=>setAddressOne(e.target.value)} 
                                    error={formState.errors.buildingName?.message}
                                    wrapperClass={`form-group ${dstyles.mb_1}`}
                                    iconClass={`position-relative ${dstyles.input_mail} ${dstyles.icon_wrap}`}
                                    className={`form-control ${dstyles.input_field} ${formState.errors.buildingName ? dstyles.is_invalid : ''}`}         
                                />
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                                <Input
                                    name="companyName"                                               
                                    register={register} 
                                    placeholder="Company Name"
                                    value={companyName}
                                    handleChange={(e:any)=>{setCompanyName(e.target.value)}}
                                    error={formState.errors.companyName?.message}
                                    wrapperClass={`form-group ${dstyles.mb_1}`}
                                    iconClass={`position-relative ${dstyles.input_business} ${dstyles.icon_wrap}`}
                                    className={`form-control ${dstyles.input_field} ${formState.errors.companyName ? dstyles.is_invalid : ''}`}         
                                />
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                                <Input
                                    name="businessAddress"                                               
                                    register={register} 
                                    placeholder="Business Address"                                   
                                    value={addressTwo}
                                    handleChange={(e:any)=>{setAddressTwo(e.target.value)}}
                                    error={formState.errors.businessAddress?.message}
                                    wrapperClass={`form-group ${dstyles.mb_1}`}
                                    iconClass={`position-relative ${dstyles.input_location} ${dstyles.icon_wrap}`}
                                    className={`form-control ${dstyles.input_field} ${formState.errors.businessAddress ? dstyles.is_invalid : ''}`}         
                                />
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'> 
                                <div className={`mw-100 ${dstyles.multi_field}`}>
                                    <Dropdown
                                        name="state"                                               
                                        register={register}
                                        options={stateData}                
                                        value={stateVal}
                                        handleChange={(e:any)=> setStateVal(e.target.value)} 
                                        placeholder="State"
                                        error={formState.errors.state?.message}
                                        wrapperClass={`form-group ${dstyles.mb_1}`}
                                        iconClass={`position-relative  ${dstyles.input_location} ${dstyles.d_sm_none} ${dstyles.icon_wrap}`}
                                        className={`form-control ${dstyles.input_field} ${dstyles.mw_csc} ${formState.errors.state ? dstyles.is_invalid : ''}`}         
                                    />
                                    <Dropdown
                                        name="city"                                               
                                        register={register}
                                        options={cityData}                
                                        value={cityVal}                                        
                                        handleChange={(e:any)=>setCityVal(e.target.value)}                                        
                                        placeholder="City"
                                        error={formState.errors.city?.message}
                                        wrapperClass={`form-group ${dstyles.mb_1}`}
                                        iconClass={`position-relative ${dstyles.input_location} ${dstyles.d_sm_none} ${dstyles.icon_wrap}`}
                                        className={`form-control ${dstyles.input_field} ${dstyles.mw_csc} ${formState.errors.city ? dstyles.is_invalid : ''}`}         
                                    />
                                    <Input
                                        name="zipCode"                                               
                                        register={register}                
                                        value={zipcode}
                                        handleChange={(e:any)=>setZipcode(e.target.value)} 
                                        placeholder="Zip Code"
                                        error={formState.errors.zipCode?.message}
                                        wrapperClass={`form-group ${dstyles.mb_1}`}
                                        iconClass={`position-relative ${dstyles.input_location} ${dstyles.d_sm_none} ${dstyles.icon_wrap}`}
                                        className={`form-control ${dstyles.input_field} ${dstyles.mw_csc} ${formState.errors.zipCode ? dstyles.is_invalid : ''}`}         
                                    />
                                </div>                                
                            </div>                            
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                                <RadioGroup 
                                    name="companyStrength"                                               
                                    register={register} 
                                    label="Company Resource Strength "
                                    // value={companyStrength}
                                    handleChange={(e:any)=>setCompanyStrength(e.target.value)}
                                    options={strengthOptions} 
                                    error={formState.errors.companyStrength?.message}
                                    wrapperClass={`form-group ${dstyles.mb_1}`}  
                                    currentValue={companyStrength}                                 
                                />
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                                <RadioGroup 
                                    name="companyRevenue"                                               
                                    register={register} 
                                    // value={revanue}
                                    handleChange={(e:any)=>setRevanue(e.target.value)}
                                    label="Revenue Details"
                                    options={revenueOptions}                                    
                                    error={formState.errors.companyRevenue?.message}
                                    wrapperClass={`form-group ${dstyles.mb_1}`} 
                                    currentValue={revanue}                               
                                />
                            </div>
                        </div>
                        {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p></div>} 
                    </div>    
                </div>
            </div>
        </Form>        
    </>)
}
export default BusinessSetup;