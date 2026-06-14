import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation} from '../api/authApi';
import { LoginSchema, type LoginData } from '../validations/LoginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';


const LoginPage = () => {
    const [loginUser] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        try{
            const user = await loginUser(data).unwrap();
            dispatch(setToken(user.token));
            navigate("/");
        } catch (err) {
            const fetchError = err as FetchBaseQueryError;
            const data = fetchError.data as { error?: { message?: string } };
            const message = data?.error?.message || "Помилка сервера";

            if (message.includes("password")) {
                setError('password', { type: 'manual', message: message }, { shouldFocus: true });
            } else {
                setError('email', { type: 'manual', message: message }, { shouldFocus: true });
            }
        }
    };

    return (
        <Box>
            <Typography variant="h1" align="center">
                Увійти
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type='email'
                    variant="outlined"
                    fullWidth label="Ваш email"
                    margin="normal"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="nope"
                />
                <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Ваш пароль"
                    margin="normal" 
                    {...register('password')} 
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <Button type="submit" variant="contained" fullWidth>
                    Увійти
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography>
                    Немає аккаунту? <Link to="/register">Зареєструватися</Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default LoginPage;
