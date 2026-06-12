import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation} from '../api/authApi';
import { LoginSchema, type LoginData } from '../validations/LoginSchema';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/authSlice';
import { useDispatch } from 'react-redux';


const LoginPage = () => {
    const [loginUser, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        const user = await loginUser(data);
        dispatch(setToken(user.data.token));
        navigate("/");
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
        </Box>
    );
}

export default LoginPage;
