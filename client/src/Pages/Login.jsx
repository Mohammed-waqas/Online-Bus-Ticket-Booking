import React, { Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link if using React Router
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().required("Please enter a valid email").email(),
    password: yup.string().required("Please enter a password").min(5).max(10),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Form submitted with values:", values);
      const response = await axios.post("http://localhost:3003/login", {
        email: values.email,
        password: values.password,
      });
      console.log("REPONSE", response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Login", response.data);
      if (response.data.message == "Login successfully") {
        // console.log("first");
        return navigate("/City");
      }
      // Redirect user to dashboard or next page upon successful login if needed
    } catch (error) {
      console.log(error.message);
      // Handle errors - display error message to the user
    }
  };

  return (
    <Fragment>
      <div className="form-container">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <span className="field-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <Field type="email" placeholder="Enter your email" name="email" />
              <ErrorMessage
                name="email"
                component="p"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <span className="field-icon">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <Field
                type="password"
                placeholder="Enter your password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="error-message"
              />
            </div>
            <div className="forgot-password">
              <Link to="/Forgotpassword" className="forgot-link">
                Forgot your password?
              </Link>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="dont-have-account">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
}

export default Login;
