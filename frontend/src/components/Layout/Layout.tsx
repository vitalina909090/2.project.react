import {Box, Container} from "@mui/material";
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" sx={{ flexGrow: 1, py: 4}}>
                <Outlet />
            </Container>
            <Box>
                Footer
            </Box>
        </Box>
    );
}

export default Layout;