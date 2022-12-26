import Box from "@mui/material/Box";
import {useLocation, Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import Typography from "@mui/material/Typography";

export default function HomePage() {

    const {state} = useLocation();
    const product = state;
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                <Typography variant="h5" component='h1'>
                    {product.product.name}
                </Typography>
                <Typography variant="h6" component='h2'>
                    ${product.product.price}
                </Typography>
                <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        mb: 5,
                        mt: 2
                    }}
                    src={product.product.image_url}
                />
                <Button component={Link}
                    to={"/products/buy/checkout"}
                    state={{product: product.product}}    
                    variant="contained" 
                    size="large"
                    sx={{ width: '100%', maxWidth: 250 }}
                >
                    Buy
                </Button>
            </Box>
        </ThemeProvider>
    )
}