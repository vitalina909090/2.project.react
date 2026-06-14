import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { baseApi } from "../../api/baseApi";
import { removeToken } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const { user, isAuth } = useAuth();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(removeToken()); // видаляємо всі кишовані запити removeToken();
        dispatch(baseApi.util.resetApiState()); // видаляємо всі кишовані запити
        // dispatch(baseApi.util.invalidateTags(["User"]));
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant= "h6"sx={{ flexGrow: 1 }} >MyApp</Typography>
                <Box sx={{ display: "flex", alingItems: "center", gap: 1 }}>
                    <Button color="inherit" component={NavLink} to="/">
                        Головна
                    </Button>
                    <Button color="inherit" component={NavLink} to="/articles">
                        Статті
                    </Button>
                    <Button color="inherit" component={NavLink} to="/products">
                        Продукти
                    </Button>
                    <Button color="inherit" component={NavLink} to="/apply">
                        Анкета
                    </Button>

                    {isAuth ? 
                        (
                        <>
                            <Link to="/profile"><Avatar>{user?.name?.[0]?.toUpperCase() ?? "?"}</Avatar></Link>
                            <Button color="inherit" onClick={handleLogout}>Вийти</Button>
                        </>

                        ) : (
                        <Button color="inherit" component={NavLink} to="/login">
                            Увійти
                        </Button>)
                    }


                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;