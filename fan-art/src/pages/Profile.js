import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Alert, FormHelperText} from "@mui/material";
import Container from "@mui/material/Container";
import {addDoc, collection} from "firebase/firestore";
import {db, storage} from "../firebase-config.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4} from "uuid";
import {theme} from "../theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function Profile() {

    const auth = getAuth();
    const user = auth.currentUser;
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    console.log(user);
    const uploadImage = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (image === null) {
            setErrorMessage("Please select an image");
        } else if (user === null) {
            setErrorMessage("Please log in");
        } else {
            const imageRef = ref(storage, `images/${data.get("product_name") + v4()}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(imageRef).then((url) => {
                    setUrl(url);
                });
            })
            
            if (url !== "") {
                await addDoc(collection(db, "products"), {
                    name: data.get("product_name"),
                    price: data.get("product_price"),
                    type: data.get("product_type"),
                    image_url: url,
                    author_uid: user.uid
                });
                setAlert(true);
                setAlertContent("Product added successfully");
            } else {
                setErrorMessage("Error uploading image");
                window.location.reload();
            }
        }
    };
    
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
        { alert ? <Alert severity="success">{alertContent}</Alert> : <></> }
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Upload Product
            </Typography>
            <Box component="form" noValidate onSubmit={uploadImage} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="product_name"
                            label="Title"
                            name="product_name"
                            autoComplete="product-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="product_price"
                            label="Price"
                            name="product_price"
                            autoComplete="product-price"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="product_type"
                            label="Product Type"
                            name="product_type"
                            autoComplete="product-type"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'flex-start',
                            alignItems:'center'
                        }}>
                            <Button
                                sx={{mr:2}}
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Button>
                            <Typography variant="body2" color="text.secondary" align="center">
                                File selected: {image ? image.name : ""}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{display:'flex',justifyContent:'center',mt: 3}}>
                    <FormHelperText error>
                        {errorMessage}
                    </FormHelperText>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    </Container>
            </ThemeProvider>
        </>
    );
}