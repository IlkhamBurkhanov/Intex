import React from "react";
import DatePicker from "./DatePicker";
import Input from "./input";
import Select from "./Select";
import Textarea from "./Textarea";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "radio":
    case "checkbox":
    default:
      return null;
  }
}

export default FormikControl;
