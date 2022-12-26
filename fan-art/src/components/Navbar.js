import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {getAuth} from "firebase/auth";
import {Link,useNavigate} from "react-router-dom"; 
import {theme} from "../theme";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";

const pages = [
    {name:'Products', url:'/products'},
    {name:'About Us', url:'/about'},
    {name:'Contact Us', url:'/contact'},];

const settings = [
    {name:'Profile',url:'/profile'},
    {name:'Logout',url:'/logout'}];

export default function ResponsiveAppBar() {
    
    const {user} = useAuth();
    console.log(user);
    const auth = getAuth();
    let navigate = useNavigate();
    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const handleLogout = () => {
        handleCloseUserMenu();
        auth.signOut().then(() => {
            window.location.href = '/';
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/> 
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                    <Button component={Link}
                                            to={page.url}
                                            key={page.name}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, display: 'block' }}
                                    >
                                        {page.name}
                                    </Button>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button component={Link}
                                to={page.url}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            { 
                                user ?
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.displayName} src={user.photoURL} referrerPolicy="no-referrer" />
                                </IconButton>
                                    :
                                <Box sx={{display:'flex',flexDirection:'row'}}>
                                    <Button component={Link}
                                            to={"login"}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Login</Button>
                                    <Button component={Link}
                                    to={"/register"} 
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Register</Button>
                                </Box>
                            }
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                    <Button component={Link}
                                            to={setting.url !== '/logout' ? setting.url : {}}
                                            key={setting.name}
                                            onClick={setting.name === 'Logout' ? handleLogout : handleCloseUserMenu}
                                            sx={{ my: 1,color: 'black', display: 'block' }}
                                    >
                                        {setting.name}
                                    </Button>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
};
