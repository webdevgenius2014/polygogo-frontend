import React, { FC, createElement } from "react"
import { ReactNode } from "react"
// import styles from '../../styles/styles.module.scss'
import dstyles from '../../../styles/dashboard/dstyles.module.scss'
export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
  defaultValues?: any;
  children?: childrenType;
  onSubmit?: any;
  isbackbutton?:boolean;
  onBack:any;
  handleSubmit?: any;
  buttonLabel?:string;
  isDisabled?:boolean;
  register?: any;
  className?: any;
  formState?:any;
  currentStep:any;
}

const Form: FC<IFormProps> = ({
  defaultValues,    
  children,  
  onSubmit,
  isbackbutton= true,
  onBack,
  handleSubmit,
  buttonLabel,
  isDisabled=false,
  register,
  className,
  formState,
  currentStep,
  ...rest
}) => {
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} {...rest}>     
      {Array.isArray(children)
        ? children.map((child) => {
            console.log(child)
            return (child && child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child);
          })
        : children
      } 
        <div className="d-flex align-items-center justify-content-center mb-4">
            {isbackbutton  && <button type='button' disabled={currentStep===1} className={`${dstyles.btn} ${dstyles.prev_btn} ${dstyles.btn_secondary}`} onClick={()=>onBack(currentStep)}><span className="fw-bold">Back</span></button>} 
            <button type='submit' disabled={formState && formState.isSubmitting || isDisabled===true} className={`${dstyles.btn} ${isDisabled?dstyles.disabled:''} ${dstyles.next_btn} ${dstyles.btn_primary}`}>
              {formState && formState.isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
              <span className="fw-bold">{buttonLabel?buttonLabel:'Next'}</span>
              <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
            </button>  
        </div> 
    </form>
  );
};

export default Form;
