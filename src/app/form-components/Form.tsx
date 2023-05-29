import React, { FC, createElement } from "react";
import { ReactNode } from "react";

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
}

const Form: FC<IFormProps> = ({
  defaultValues,    
  children,
  onSubmit,
  handleSubmit,
  register,
  ...rest
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {/* {children} */}
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
                
      {/* <button className="btn btn--brand">{buttonLabel}</button> */}
    </form>
  );
};

export default Form;
