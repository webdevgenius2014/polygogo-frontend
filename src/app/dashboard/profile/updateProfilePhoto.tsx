import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Form from '../forms/Form'
import FileInput from '../forms/form-fields/FileInput'
import Input from '../forms/form-fields/Input'
import { useState, ChangeEvent, useEffect } from 'react'
// import Dropdown from '../forms/form-fields/Dropdown'
interface UpdatePhotoInterface {
    profilePhoto: any;
    jobTitle:string;
}
type Props={
    currentStep:any;
    userData:any;
    nextStep:(val:any)=>void;
    prevStep:(val:any)=>void;
    setSkip:(val:any)=>void; 
    job: any;
    setJob:(val:any)=>void;
    profilePhoto:any;
    setProfilePhoto:(val:any)=>void;
    saveData:(val:any)=>void;
    message:any;setMessage:(val:any)=>void;
    alertClass: any;
    isVarified:any; 
};
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validationSchema = Yup.object().shape({
    profilePhoto: Yup.string().required('Upload profile image'),
    jobTitle: Yup.string().required('Please Enter job title')
});
const UpdatePhotoAndTitle: React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData, job, setJob, profilePhoto, setProfilePhoto, saveData, message, setMessage, alertClass, isVarified})=>{ 
    const [previewUrl, setPreviewUrl] = useState<string | ''>(''); 
    const [fileName, setFileName]= useState<any | ''>('');
    const [fileError, setFileError]= useState<any | ''>('');
    const basrUrl= process.env.NEXT_PUBLIC_API_URL+'/images/'
    const handleFileRead = async (file:any) => { 
        const base64 = await convertBase64(file);
        if(base64){
            setFileName(base64);
        }                    
    }
    const convertBase64 = (file:any) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }
    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;        
        if (!fileInput.files) {
            setFileError("No file was chosen");
        return;
        }
        if (!fileInput.files || fileInput.files.length === 0) {
            setFileError("Files list is empty");
        return;
        }
        const file = fileInput.files[0];
        setPreviewUrl(URL.createObjectURL(file));
        setProfilePhoto(file); 
        handleFileRead(file);
        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
    };
    
    const savePhotoAndJobProfile=()=>{  
        console.log(fileName);     
        if((profilePhoto || fileName) && job){
            let payload = {
                job_title : job, 
                profile_img: fileName!==null?fileName:profilePhoto,
                profile_status:true      
            };
            saveData(payload);
        }
    };
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<UpdatePhotoInterface>({resolver: yupResolver(validationSchema)});
    useEffect(()=>{
        setFileError(formState?.errors?.profilePhoto?.message?formState?.errors?.profilePhoto?.message:fileError);
    },[])
    const backToPrev=()=>{
        if(isVarified===true){
            setSkip(currentStep-1);
        }
        prevStep(currentStep);
    }
    // console.log("profilePhoto: "+ profilePhoto.length);
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Upload a photo and select your title.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={savePhotoAndJobProfile}
            onBack={backToPrev}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                <div className={`position-relative ${dstyles.image_wrap}`}>
                    <img src="/dashboard/profile-photo.png" alt="profile-photo" />
                    <div className={dstyles.user_image}>
                        {previewUrl?(<img src={previewUrl} alt="profile-photo" className='mw-100 h-auto' />):profilePhoto?(<img src={basrUrl+profilePhoto} alt="profile-photo" className='mw-100 h-auto' />):(<img src="/dashboard/dummy-image.png" alt="dummy-image" />)}
                        
                    </div>                    
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <h2 className={`mb-2 ${dstyles.title_lg}`}>Your profile photo</h2>
                        <h3 className={dstyles.title}>Upload a profile picture. Then, <br className='d-none d-lg-block'/> add your job title.</h3>
                        <div className={`${dstyles.uploaded_img} ${previewUrl?dstyles.selected:dstyles.upload_error}`}>
                            {previewUrl?(<img src={previewUrl} alt="profile-photo" className='img-fluid' />):(<img src={profilePhoto?'/':'/dashboard/upload-imag.png'} alt={profilePhoto?'':'upload-imag'} />)}                                
                        </div>
                        <div className={`${dstyles.mx_362}`}>
                            <FileInput
                                name="profilePhoto"
                                type='file' 
                                accept="image/png, image/webp, image/jpeg, image/jpg"                                            
                                register={register} 
                                value={profilePhoto.length>0?profilePhoto.name:""}                              
                                handleChange={onFileUploadChange} 
                                placeholder=""
                                label="Upload Photo"
                                error={formState.errors.profilePhoto?.message}
                                wrapperClass={`text-center ${dstyles.file_group} ${dstyles.mb_1}`}                               
                                className={`${dstyles.input_file} ${formState.errors.profilePhoto ? dstyles.is_invalid : ''}`}         
                            /> 
                            {fileError && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{fileError}</p></div>} 
                            <Input
                                name="jobTitle"                                               
                                register={register}                                                
                                value={job}                               
                                handleChange={(e:any)=>{setJob(e.target.value)}} 
                                placeholder="Job title"
                                label="What’s your job title"
                                error={formState.errors.jobTitle?.message}                                
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                iconClass={`position-relative ${dstyles.input_job} ${dstyles.icon_wrap}`}
                                className={`form-control ${dstyles.input_field} ${formState.errors.jobTitle ? dstyles.is_invalid : ''}`} 
                              
                            /> 
                            {message && <div className='ms-3 me-3 mt-3'><p className={`text-center fw-md mt-2 ${alertClass}`}>{message}</p></div>} 
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </>)
}
export default UpdatePhotoAndTitle;