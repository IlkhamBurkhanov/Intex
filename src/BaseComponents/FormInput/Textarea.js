import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="flex flex-col ">
      <label className="mb-3" htmlFor={name}>
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="p-3 rounded-lg outline-none border border-gray-200 focus-visible:border-gray-300 text-base h-[142px]"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Textarea;
