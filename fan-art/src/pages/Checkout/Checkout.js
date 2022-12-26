import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import {theme} from "../../theme.js";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase-config";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details'];

export default function Checkout(props) {

    const {
        firstName, lastName, address1, address2,
        city, cityState, zip, country, cardName, cardNumber, expDate, cvv} = props;
    
    const {user} = useAuth();
    const {state} = useLocation();
    const product = state;
    
    const [addressInfoId, setAddressInfoId] = React.useState({});
    const [paymentInfoId, setPaymentInfoId] = React.useState("");
    const [activeStep, setActiveStep] = React.useState(0);
    const [formValues, setFormValues] = React.useState({
        firstName, lastName, address1, address2, city, cityState, zip, country,
        cardName, cardNumber, expDate, cvv
    });
    
    const handleNext = (newValues) => {
        setFormValues({...formValues, ...newValues});
        setActiveStep(activeStep + 1);
    };

    const handleBack = (newValues) => {
        setFormValues({...formValues, ...newValues});
        setActiveStep(activeStep - 1);
    };
    
    const handleOrder = async (paymentValues) => {
        setFormValues({...formValues, ...paymentValues});
        const addressInfo = await addDoc(collection(db, "addressInfo"), {
            user_uid: user.uid,
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            address1: formValues.address1,
            address2: formValues.address2,
            city: formValues.city,
            state: formValues.cityState,
            zip: formValues.zip,
            country: formValues.country
        });

        const paymentInfo = await addDoc(collection(db, "paymentInfo"), {
            user_uid: user.uid,
            card_name: paymentValues.cardName,
            card_number: paymentValues.cardNumber,
            exp_date: paymentValues.expDate,
            cvv: paymentValues.cvv
        });
        
        const addressRef = doc(db, "addressInfo", addressInfo.id);
        const payRef = doc(db, "paymentInfo", paymentInfo.id);
        const addressDoc = (await getDoc(addressRef)).data();
        const payDoc = (await getDoc(payRef)).data();
        
        await addDoc(collection(db, "orders"), {
            user_id: user.uid,
            product: product.product,
            address_info: addressDoc,
            payment_info: payDoc,
        });
        setActiveStep(activeStep + 1);
        };

    function getStepContent(step) {
        const isLastStep = (activeStep === steps.length - 1);
        switch (step) {
            case 0:
                return <AddressForm {...formValues} isLastStep={isLastStep}  handleBack={handleBack} handleNext={handleNext}/>;
            case 1:
                return <PaymentForm {...formValues} isLastStep={isLastStep} handleBack={handleBack} handleNext={handleNext} handleOrder={handleOrder}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}