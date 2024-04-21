import React, { Fragment, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link if using React Router

import { useNavigate } from "react-router-dom";

function Passengerdetail() {
  const navigate = useNavigate();

  const defaultValue = {
    fullName: "",
    phoneNumber: "",
    gender: "",
    idCardNumber: "",
  };

  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Please enter the username").min(3).max(50),
    gender: yup.string().required("Please select  the gender"),
    phoneNumber: yup
      .string()
      .required("Please enter the phone")
      .min(10)
      .max(11),
    idCardNumber: yup
      .string()
      .required("Please enter the id cardnumber")
      .min(13)
      .max(14),
  });

  const token = localStorage.getItem("token");
  console.log(token);
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/pinfo",
        {
          fullName: values.fullName,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          idCardNumber: String(values.idCardNumber),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success", response);
      navigate("/login"); // Navigate to success page if the request is successful
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // If the error message exists in the response data, set it as the idCardNumber error
        setErrors({ idCardNumber: error.response.data.message });
      } else {
        console.error("Error:", error);
      }
    }
    setSubmitting(false);
    // navigate("/login");
  };

  return (
    <Fragment>
      <div className="form-container">
        <h1>Passenger Detail</h1>
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <span>
                <FontAwesomeIcon icon={faUser} className="field-icon" />
              </span>
              <Field
                type="text"
                placeholder="Enter the fullName"
                name="fullName"
              />
              <ErrorMessage name="fullName" />
            </div>
            <div className="form-group">
              <span>
                <FontAwesomeIcon icon={faEnvelope} className="field-icon" />
              </span>
              <Field
                type="tel"
                placeholder="Enter the phoneNumber"
                name="phoneNumber"
              />
              <ErrorMessage name="phoneNumber" />
            </div>
            <div className="form-group">
              <span>
                <FontAwesomeIcon icon={faLock} className="field-icon" />
              </span>
              <Field
                type="Number"
                placeholder="Enter the id CardNumber"
                name="idCardNumber"
              />
              <ErrorMessage name="idCardNumber" />
            </div>
            <div className="form-group">
              <Field as="select" name="gender" className="field option-group">
                <option value="">Please Select Your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
}

export default Passengerdetail;
