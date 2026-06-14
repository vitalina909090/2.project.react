import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplySchema, type ApplyData } from "../validations/ApplySchema";
import { Link } from "react-router-dom";


const labelStyle = {
  color: "#1a1a2e",
  mb: 0.5,
  fontSize: "0.9rem",
};

const redStar = (
  <Typography component="span" sx={{ color: "#e53935" }}> *</Typography>
);

const inputSx = {
    "& .MuiOutlinedInput-root": {
        color: "#1a1a2e",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        "& fieldset": { borderColor: "#c8cdd8" },
        "&:hover fieldset": { borderColor: "#8892aa" },
        "&.Mui-focused fieldset": { borderColor: "#4a6cf7" },
        "&.Mui-error fieldset": { borderColor: "#e53935" },
    },
    "& .MuiFormHelperText-root": {
        color: "#6b7280",
        fontSize: "0.75rem",
        marginLeft: "4px",
    },
};

const labelSeparator = (line: string) => (
  <>
    <Divider sx={{ bgcolor: "#dde1ea", mb: 2.5, mt: 4}} />
    <Typography sx={{ color: "#8892aa", mb: 2, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
      {line}
    </Typography>
  </>
);

const skillsOptions = ['React', 'TypeScript', 'Node.js', 'Git', 'Docker'];

const ApplyPage = () => {
  const { register, handleSubmit, control, formState: { errors }, } = useForm<ApplyData>({
    mode: "onChange",
    resolver: zodResolver(ApplySchema),
    defaultValues: {
      skills: [],
      experience: "none",
      position: "frontend",
    },
  });

  const onSubmit = (data: ApplyData) => {
      console.log(data);
  };

    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: "#f8f9fc",
                color: "#1a1a2e",
                border: "1px solid #dde1ea",
                borderRadius: "12px",
                mx: "auto",
            }}
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: "#1a1a2e" }}>
                    Анкета кандидата
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#6b7280", mb: 3 }}>
                    Заповніть форму, щоб подати заявку на стажування
                </Typography>

                {labelSeparator("Особисті дані")}

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={labelStyle}>Ім'я{redStar}</Typography>
                    <TextField
                        fullWidth
                        placeholder="Олексій"
                        size="small"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={inputSx}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={labelStyle}>Прізвище{redStar}</Typography>
                    <TextField
                        fullWidth
                        placeholder="Ковальчук"
                        size="small"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={inputSx}
                    />
                </Box>
                </Stack> 
                        
                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Email{redStar}</Typography>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="oleksiy@example.com"
                        size="small"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={inputSx}
                    />
                </Box> 
                
                <Box sx={{ mb: 1 }}>
                    <Typography sx={labelStyle}>Телефон{redStar}</Typography>
                    <TextField
                        fullWidth
                        type="tel"
                        placeholder="+380XXXXXXXXX"
                        size="small"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={ errors.phone?.message ?? "Формат: +380XXXXXXXXX (9 цифр після коду)"}
                        sx={inputSx}
                    />
                </Box>    

                <Box >
                    <Typography sx={labelStyle}>Дата народження{redStar}</Typography>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        {...register("birthDate")}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message ?? "Кандидат повинен бути від 16 до 60 років"}
                        sx={inputSx}
                    />
                </Box>
                
                {labelSeparator("Позиція та досвід")}

                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Позиція{redStar}</Typography> 
                    <TextField
                        select
                        fullWidth
                        size="small"
                        {...register("position")}
                        error={!!errors.position}
                        helperText={errors.position?.message}
                        sx={inputSx}
                        defaultValue="frontend"
                    >
                        <MenuItem value="frontend">Frontend</MenuItem>
                        <MenuItem value="backend">Backend</MenuItem>
                        <MenuItem value="fullstack">Fullstack</MenuItem>
                        <MenuItem value="design">Design</MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Досвід роботи{redStar}</Typography> 
                    <FormControl error={!!errors.experience} fullWidth sx={inputSx}>
                        <Controller
                            name="experience"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <FormControlLabel value="none" control={<Radio sx={{ color: "#c8cdd8", "&.Mui-checked": { color: "#4a6cf7" } }} />} label="Немає досвіду" />
                                    <FormControlLabel value="less1" control={<Radio sx={{ color: "#c8cdd8", "&.Mui-checked": { color: "#4a6cf7" } }} />} label="Менше 1 року" />
                                    <FormControlLabel value="1to3" control={<Radio sx={{ color: "#c8cdd8", "&.Mui-checked": { color: "#4a6cf7" } }} />} label="1–3 роки" />
                                    <FormControlLabel value="3plus" control={<Radio sx={{ color: "#c8cdd8", "&.Mui-checked": { color: "#4a6cf7" } }} />} label="Більше 3 років" />
                                </RadioGroup>
                            )}
                        />
                        {errors.experience && (
                            <FormHelperText>{errors.experience.message}</FormHelperText>
                        )}
                    </FormControl>

                </Box>

                        
                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Технології{redStar}</Typography>
                    
                    <FormControl error={!!errors.skills} fullWidth sx={inputSx}>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field: { value = [], onChange } }) => (
                            <>
                                <FormGroup>
                                    {skillsOptions.map((skill) => (
                                        <FormControlLabel
                                            key={skill}
                                            control={
                                                <Checkbox
                                                    checked={value.includes(skill)}
                                                    onChange={(e) => {
                                                        const newValue = e.target.checked
                                                            ? [...value, skill]
                                                            : value.filter((s) => s !== skill);
                                                        onChange(newValue);
                                                    }}
                                                    sx={{ color: "#c8cdd8", "&.Mui-checked": { color: "#4a6cf7" } }}
                                                />
                                            }
                                            label={skill}
                                        />
                                    ))}
                                </FormGroup>

                                {value.length > 0 && (
                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'row', 
                                            flexWrap: 'wrap',
                                            gap: 1, 
                                            mt: 1 
                                        }}
                                    >
                                        {value.map((skill) => (
                                            <Chip
                                                key={skill}
                                                label={skill}
                                                sx={{
                                                    backgroundColor: '#38517c',
                                                    color: '#fff',
                                                    fontWeight: 500,
                                                    borderRadius: '16px',
                                                    mr: 1
                                                }}
                                            />
                                        ))}
                                    </ Box >

                                )}
                            </>
                        )}
                    />

                    <FormHelperText>
                        {errors.skills?.message ?? "Оберіть від 1 до 4 технологій"}
                    </FormHelperText>
                    </FormControl>
                </Box>

                {labelSeparator("Додатково (необов'язково)")}
                
                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Бажана зарплата, грн</Typography>
                    <TextField
                        fullWidth
                        type="number"
                        placeholder="наприклад, 25000"
                        size="small"
                        {...register("salaryExpected")}
                        error={!!errors.salaryExpected}
                        helperText={
                            errors.salaryExpected?.message ?? "Від 5 000 до 200 000 грн"
                        }
                        sx={inputSx}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Готовий розпочати з</Typography>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        {...register("startDate")}
                        error={!!errors.startDate}
                        helperText={
                            errors.startDate?.message ?? "Дата не може бути в минулому"
                        }
                        sx={inputSx}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>
                        Портфоліо або <Typography component="span" sx={{ fontWeight: 600}}>GitHub</Typography>
                    </Typography>
                    <TextField
                        fullWidth
                        type="url"
                        placeholder="https://github.com/username"
                        size="small"
                        {...register("portfolioUrl")}
                        error={!!errors.portfolioUrl}
                        helperText={errors.portfolioUrl?.message}
                        sx={inputSx}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography sx={labelStyle}>Супровідний лист</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Розкажіть про себе та чому хочете приєднатись..."
                        {...register("coverLetter")}
                        error={!!errors.coverLetter}
                        helperText={
                        errors.coverLetter?.message ??
                            "Якщо заповнюєте - мінімум 50 символів"
                        }
                        sx={inputSx}
                    />
                </Box>
                
                <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                        <FormControl error={!!errors.agreeToTerms}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                {...field}
                                checked={!!value}
                                onChange={(e) => field.onChange(e.target.checked ? true : undefined)}
                                sx={{
                                  color: "#c8cdd8",
                                  "&.Mui-checked": { color: "#4a6cf7" },
                                }}
                            />
                            }
                            label={
                            <Typography sx={{ color: "#1a1a2e", fontSize: "0.9rem" }}>
                                Я погоджуюсь з
                                <Link to="#" style={{ color: "#4a6cf7", textDecoration: "none" }}> умовами участі </Link>
                                у стажуванні{redStar}
                            </Typography>
                            }
                        />
                        {errors.agreeToTerms && (
                            <FormHelperText>{errors.agreeToTerms.message}</FormHelperText>
                        )}
                        </FormControl>
                    )}
                />


                <Button
                    type="submit"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        backgroundColor: "#4a6cf7",
                        color: "#ffffff",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#3a5ce7" },
                    }}
                    >
                    Надіслати анкету
                </Button>

            </Box>
        </Box>
    )
};

export default ApplyPage;