import dstyles from '../../../styles/dashboard/dstyles.module.scss'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from '../forms/Form';
import FileInput from '../forms/form-fields/FileInput'
import { useState, ChangeEvent, MouseEvent } from 'react'
import Dropdown from '../forms/form-fields/Dropdown'
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
};
const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    //companyName: Yup.string().required('Company name is required')
});
const UpdatePhotoAndTitle: React.FC<Props>=({currentStep, nextStep, prevStep, setSkip, userData})=>{    
    const [job, setJob]= useState<string | ''>('');
    const [fileName, setFileName] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    console.log(fileInput.files);
    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }
    const file = fileInput.files[0];
    
    setFileName(file); 
    setPreviewUrl(URL.createObjectURL(file)); 

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

    const saveData=()=>{
        nextStep(currentStep);
    };
    const {
        register,        
        handleSubmit,
        formState   
    } = useForm<UpdatePhotoInterface>({resolver: yupResolver(validationSchema)});
    const jobsList=[
        {
            displayValue:'Job one',
            value: 'job 1'
        },
        {
            displayValue:'Job two',
            value: 'job 2'
        }
    ]; 
    return(<>        
        <h1 className={`text-center ${dstyles.heading_one} ${dstyles.text_primary}`}>Upload a photo and select your title.</h1>
        <Form 
            register={register}          
            handleSubmit={handleSubmit}     
            onSubmit={saveData}
            onBack={prevStep}
            formState={formState}
            className={dstyles.form}
            currentStep={currentStep}
        >
            <div className={`d-flex align-items-start justify-content-center ${dstyles.form_container}`}>
                <div className={dstyles.image_wrap}>
                    <img src="/dashboard/profile-photo.png" alt="profile-photo" />
                </div>
                <div className={`h-100 d-flex flex-column justify-space-between ${dstyles.form_wrap} ${dstyles.after_before_dots}`}>
                    <div>
                        <h2 className={`mb-2 ${dstyles.title_lg}`}>Your profile photo</h2>
                        <h3 className={dstyles.title}>Upload a profile picture. Then, <br className='d-none d-lg-block'/> add your job title.</h3>
                        <div className={dstyles.uploaded_img}>
                            {previewUrl?(<img src={previewUrl} alt="profile-photo" className='img-fluid' />):(<img src={fileName?'/':'/dashboard/upload-imag.png'} alt={fileName?'':'upload-imag'} />)}                                
                        </div>
                        <div className={`${dstyles.mx_362}`}>
                            <FileInput
                                name="profilePhoto"
                                type='file' 
                                accept="image/png, image/webp, image/jpeg, image/jpg"                                            
                                register={register}                                                
                                // value={fileName}                               
                                handleChange={onFileUploadChange} 
                                placeholder=""
                                label="Upload Photo"
                                error={formState.errors.profilePhoto?.message}
                                wrapperClass={`${dstyles.file_group} ${dstyles.mb_1}`}                               
                                className={`${dstyles.input_file} ${formState.errors.profilePhoto ? dstyles.is_invalid : ''}`}         
                            /> 
                            <Dropdown
                                name="jobTitle"                                               
                                register={register}
                                options={jobsList}                
                                value={job}
                                handleChange={(e:any)=>setJob(e.target.value)} 
                                placeholder="Choose One"
                                label="What’s your job title"
                                error={formState.errors.jobTitle?.message}
                                wrapperClass={`form-group ${dstyles.mb_1}`}
                                iconClass={`position-relative ${dstyles.input_job} ${dstyles.icon_wrap}`}
                                className={`form-control dropdown ${dstyles.input_field} ${dstyles.hidden} ${formState.errors.jobTitle ? dstyles.is_invalid : ''}`}         
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </>)
}
export default UpdatePhotoAndTitle;