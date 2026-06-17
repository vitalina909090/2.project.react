import { Box, Button, TextField, Typography } from "@mui/material";
import { useCreateArticleMutation } from "../api/articlesApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleSchema, type ArticleData } from "../validations/ArticleSchema";
import { useNavigate } from "react-router-dom";


const ArticleAddPage = () => {
    const [createArticle] = useCreateArticleMutation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(ArticleSchema),
    });


    const onSubmit = (data: ArticleData) => {
        createArticle(data);
        navigate("/");
    };

    return (
        <>
            <Typography variant="h4" sx={{display: "flex", justifyContent: "center", mb: 4}}>Створіть свою нову статтю</Typography>
            <Box 
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <Typography>
                    <TextField
                        fullWidth
                        placeholder="Заголовок"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Typography>

                <Typography>
                    <TextField
                        type="text"
                        multiline
                        fullWidth
                        placeholder="Текст статті"
                        {...register("content")}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                    />
                </Typography>

                <Button variant="contained" type="submit">
                    Створити
                </Button>
            </Box>
        </>

    );
}

export default ArticleAddPage;
