import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterData } from '../validations/RegisterSchema';
import { useRegisterMutation } from '../api/authApi';
import { Link } from 'react-router-dom';


const RegisterPage = () => {
    const [registerUser] = useRegisterMutation();

    const {register, handleSubmit, formState: { errors }} = useForm({
        mode: 'onChange',
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = (data: RegisterData) => {
        registerUser(data);
    };

    return (
        <Box>
            <Typography variant="h1" align="center">
                Реєстрація
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    variant="outlined"
                    fullWidth label="Ваше ім'я"
                    margin="normal"
                    {...register('name')} 
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
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
                <TextField
                    type="password"
                    variant="outlined" fullWidth 
                    label="Повторіть пароль" 
                    margin="normal" 
                    {...register('repeatPassword')}
                    error={!!errors.repeatPassword}
                    helperText={errors.repeatPassword?.message} 
                />
                <Button type="submit" variant="contained" fullWidth>
                    Зареєструватися
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography>
                Вже маєте аккаунт? <Link to="/login">Увійти</Link>
                </Typography>
            </Box>
        </Box>

    );
}

export default RegisterPage;
