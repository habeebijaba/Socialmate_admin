import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Alert } from "@mui/material";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import axios from '../../utils/axios';
import {adminLogin } from '../../utils/Constants';
import { toast, Toaster } from "react-hot-toast";


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};



const Login = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {


    axios
      .post(
        adminLogin,
        JSON.stringify(values),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const loggedIn = response.data;
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              admin: loggedIn.admin,
              token: loggedIn.token,
            })
          );
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        ((error) => {
          toast.error(error.response.data.msg, {
            position: "top-center",
          });
        })(err);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <MDBContainer className="my-5 main">

            <MDBCard>
              <MDBRow className='g-0 body'>

                <MDBCol md='6'>
                  <MDBCardImage src='https://amumtionalrollercoasterhome.files.wordpress.com/2021/05/happy-friends-celebrating-event-together_74855-7482.webp' alt="login form" className='p-5 img-fluid' style={{ objectFit: "cover", height: "100%", width: "100%", display:"inlineblock" }} />
                </MDBCol>

                <MDBCol md='6'>
                  <MDBCardBody className='d-flex flex-column mt-5 d-flex align-items-centeryy'>

                    <div className='d-flex flex-row mt-2'>
                      <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

                      <span className="h1 fw-bold mb-0">Admin dashboard</span>
                    </div>

                    <Box>
                      <TextField
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                      </Button>
                      <Box mt={2}>
                        
                      </Box>
                    </Box>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
          <Toaster/>
        </form>
      )}
    </Formik>
  );
};

export default Login;
