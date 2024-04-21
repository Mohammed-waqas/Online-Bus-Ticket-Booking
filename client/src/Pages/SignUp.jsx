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
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate(); // Move inside the component

  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [password, setPassword] = useState("");
  const defaultValue = {
    username: "",
    email: "",
    role: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Please enter the username").min(3).max(50),
    email: yup.string().required("Please enter the email").email(),
    password: yup.string().required("Please enter the password").min(5).max(10),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    axios
      .post("http://localhost:3003/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      })
      .then((response) => {
        console.log("Registration Success");
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="form-container">
        <h1>Sign Up</h1>
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
                placeholder="Enter the username"
                name="username"
              />
              <ErrorMessage name="username" />
            </div>
            <div className="form-group">
              <span>
                <FontAwesomeIcon icon={faEnvelope} className="field-icon" />
              </span>
              <Field type="email" placeholder="Enter the Email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div className="form-group">
              <span>
                <FontAwesomeIcon icon={faLock} className="field-icon" />
              </span>
              <Field
                type="password"
                placeholder="Enter the Password"
                name="password"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="form-group">
              <Field as="select" name="role" className="field option-group">
                <option value="">Please Select Your Role</option>
                <option value="admin">Admin</option>
                <option value="passenger">Passenger</option>
              </Field>
            </div>
            <div className="form-group">
              <button type="submit">Sign Up</button>
            </div>
            <div className="already-have-account">
              Already have an account? <Link to="/login">Login </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
}

export default SignUp;
