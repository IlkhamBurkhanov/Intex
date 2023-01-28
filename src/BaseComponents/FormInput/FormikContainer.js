import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import MButton from "../MButton/MButton";

function FormikContainer() {
  const dropdownOptions = [
    { key: "Выберите страна призводства", value: "" },
    { key: "Option1", value: "option 1" },
    { key: "Option2", value: "option 2" },
    { key: "Option3", value: "option 3" },
  ];

  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    birthDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    birthDate: Yup.date().required("Required").nullable(),
  });
  const onSubmit = (values) => ("Form data", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="w-96 ">
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />

          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select a topic"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl control="date" label="Pick a date" name="birthDate" />
          <MButton BType="filter" type="submit">
            Submit
          </MButton>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
