import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";

export default function HomePage() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1>Home Page</h1>
            </div>
        </ThemeProvider>
    )
}