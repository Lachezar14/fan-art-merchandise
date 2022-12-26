import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Formik, Form, Field, useField} from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AddressForm(props) {

    const {
        values, firstName, lastName, address1, address2,
        city, cityState, zip, country, activeStep, isLastStep,
        handleBack, handleNext
    } = props;

    return (
        <React.Fragment>
            <Formik initialValues={{
                firstName: firstName,
                lastName: lastName,
                address1: address1,
                address2: address2,
                city: city,
                cityState: cityState,
                zip: zip,
                country: country
            }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .required('Field is required'),
                        lastName: Yup.string()
                            .required('Field is required'),
                        address1: Yup.string()
                            .required('Field is required'),
                        address2: Yup.string(),
                        city: Yup.string()
                            .required('Field is required'),
                        cityState: Yup.string()
                            .required('Field is required'),
                        zip: Yup.string()
                            .required('Field is required'),
                        country: Yup.string()
                            .required('Field is required')
                    })}
            >
                {({validateForm, setTouched, values, handleChange, errors}) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            Shipping address
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                    <label style={{color: 'red'}}> {errors.firstName} </label>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.lastName} </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.address1} </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.city} </label>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="cityState"
                                    name="cityState"
                                    label="State/Province/Region"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.cityState} </label>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.zip} </label>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field
                                    component={TextField}
                                    id="country"
                                    name="country"
                                    label="Country"
                                    fullWidth
                                    autoComplete="shipping country"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.country} </label>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                                    label="Use this address for payment details"
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="contained" color="primary"
                                    sx={{width: '100px', maxWidth: '100px', mt: 2}}
                                    onClick={
                                        () => validateForm().then((errors) => {
                                            if (Object.keys(errors).length === 0) {
                                                handleNext(values);
                                            } else {
                                                setTouched(errors);
                                            }
                                        })}>
                                {isLastStep ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}