import React,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profilePicture: '',
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    name: Yup.string(),
    profilePicture: Yup.string().url('Invalid URL'),
    termsAndConditions: Yup.boolean().oneOf([true], 'Please accept terms and conditions'),
  });

  const simulateWelcomeEmail = (email) => {
    // Simulate sending welcome email (not actual email sending)
    setSuccessMessage(`Welcome email sent to ${email}`);
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/posts');
    }, 3000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulated signup process
    const signupSuccess = true; // Replace with your signup logic

    if (signupSuccess) {
      simulateWelcomeEmail(/* user's email */);
    } else {
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate sending welcome email
    simulateWelcomeEmail(values.email);
    // Redirect to post list screen after successful signup (replace '/posts' with actual route)
    // history.push('/posts');
    resetForm();
  };
  


  return (
    <div className="form-container">

         <h2>Sign Up</h2>

       {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form onSubmit={handleSignup}> 
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" id="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <Field type="text" name="profilePicture" id="profilePicture" />
            <ErrorMessage name="profilePicture" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="termsAndConditions">
              <Field type="checkbox" name="termsAndConditions" id="termsAndConditions" />
              I accept the terms and conditions
            </label>
            <ErrorMessage name="termsAndConditions" component="div" className="error-message" />
          </div>

          <button type="submit" disabled={isSubmitting} className="button">Sign Up</button>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
