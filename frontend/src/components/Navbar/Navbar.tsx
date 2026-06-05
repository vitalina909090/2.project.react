import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant= "h6"sx={{ flexGrow: 1 }} >MyApp</Typography>
                <Box>
                    <Button color="inherit" component={NavLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={NavLink} to="/articles">
                        Articles
                    </Button>
                    <Button color="inherit" component={NavLink} to="/products">
                        Products
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;