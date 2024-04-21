import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./ForgotPassword.css"; // Import the CSS file
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleSubmit = (values, { setSubmitting }) => {
    const { email } = values;
    // Here you would typically send a request to your backend to handle the password reset
    // For now, we'll just display a message indicating that an email has been sent
    const message = `An email has been sent to ${email} with instructions on how to reset your password.`;
    this.setState({ message });
    setSubmitting(false); // Set submitting to false after form submission
  };

  render() {
    const { message } = this.state;

    return (
      <div className="container">
        <h1>Forgot Password</h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid email").required("Required"),
          })}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <span className="field-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <Field
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  className="input-email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
        {message && <p className="message">{message}</p>}
      </div>
    );
  }
}

export default ForgotPassword;
