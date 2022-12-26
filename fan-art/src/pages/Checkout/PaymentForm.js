import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function PaymentForm(props) {

    const {
        values, cardName, cardNumber, expDate, cvv,activeStep, isLastStep,
        handleBack, handleNext, handleOrder
    } = props;
    
    return (
        <React.Fragment>
            <Formik initialValues={{
                cardName: cardName, 
                cardNumber: cardNumber,
                expDate: expDate,
                cvv: cvv
            }}
                    validationSchema={Yup.object({
                        cardName: Yup.string()
                            .required('Field is required'),
                        cardNumber: Yup.string()
                            .required('Field is required'),
                        expDate: Yup.string()
                            .required('Field is required'),
                        cvv: Yup.number()
                            .required('Field is required')
                    })}
            >
                {({validateForm, setTouched, values, handleChange,errors}) => (
                    <Form>
                        <Typography variant="h6" gutterBottom>
                            Payment method
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Field
                                    component={TextField}
                                    id="cardName"
                                    name="cardName"
                                    label="Name on card"
                                    fullWidth
                                    autoComplete="cc-name"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.cardName} </label>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    component={TextField}
                                    id="cardNumber"
                                    name="cardNumber"
                                    label="Card number"
                                    fullWidth
                                    autoComplete="cc-number"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.cardNumber} </label>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    component={TextField}
                                    id="expDate"
                                    name="expDate"
                                    label="Expiry date"
                                    fullWidth
                                    autoComplete="cc-exp"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.expDate} </label>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    component={TextField}
                                    id="cvv"
                                    name="cvv"
                                    label="CVV"
                                    helperText="Last three digits on signature strip"
                                    fullWidth
                                    autoComplete="cc-csc"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                                <label style={{color: 'red'}}> {errors.cvv} </label>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                    label="Remember credit card details for next time"
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt:2 }}>
                            {activeStep !== 0 && (
                                <Button onClick={() => { handleBack(values) } }> Back </Button>
                            )}
                            <Button variant="contained" color="primary"
                                    onClick={() => validateForm().then((errors) => {
                                        if (Object.keys(errors).length === 0) {
                                            isLastStep ? handleOrder(values) : handleNext(values)
                                        } else {
                                            setTouched(errors)
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