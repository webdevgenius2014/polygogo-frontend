import React, { FC, createElement } from "react"
import { ReactNode } from "react"
import styles from '../styles/styles.module.scss'
export type classNameType = string;
export type childrenType = ReactNode;

export interface IFormProps {
  defaultValues?: any;
  children?: childrenType;
  buttonLabel?: string;
  onSubmit?: any;
  handleSubmit?: any;
  register?: any;
  className?: any;
  formState?:any;
}

const Form: FC<IFormProps> = ({
  defaultValues,    
  children,
  buttonLabel,
  onSubmit,
  handleSubmit,
  register,
  className,
  formState,
  ...rest
}) => {
  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} {...rest}>     
      {Array.isArray(children)
        ? children.map((child) => {
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
      <button type='submit' disabled={formState && formState.isSubmitting} className={`${styles.btn} ${styles.btn_primary}`}>
        {formState && formState.isSubmitting && <span className="spinner-border spinner-border-sm me-2"></span>}
        <span className="fw-bold">{buttonLabel}</span>
        <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" />
      </button>   
    </form>
  );
};

export default Form;
