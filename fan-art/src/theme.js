
import {createTheme} from "@mui/material/styles";



const font = "'Source Sans Pro', sans-serif";

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#2c3531',
            contrastText: '#ffcb9a',
        },
        secondary: {
            main: '#d87e2e',
        },
        background: {
            default: '#ffffff',
        },
    },
    typography: {
        fontFamily:
            font,
            h1: {
            fontFamily: 'sans-serif',
        }
    ,
    }}
)