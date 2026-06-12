import { Alert, Box, Button } from "@mui/material";
import { useCreateArticleMutation, useGetArticlesQuery, useUpdateArticleMutation } from "../api/articlesApi";
import { Link } from "react-router-dom";

const Home = () => {
    const {data, isLoading, isError} = useGetArticlesQuery();
    const [createArticle, {isLoading: isCreating}] = useCreateArticleMutation();
    const [updateArticle] = useUpdateArticleMutation();

    if (isLoading) {
        return <Box>Loading...</Box>;
    }
    if (isError) {
        return <Alert severity="error">Error loading articles.</Alert>;
    }

    const articles = data?.data || [];
    const handlerCreate = () => {
        createArticle({
            title: "New Article 3",
            content: "This is a new article 3",
        });
    };

    const handlerUpdate = () => {
        updateArticle({
            id: 3,
            title: "Updated Article 3",
        })
    };

    return (
        <div>
            <h1>Home</h1>
            <Button variant="contained" onClick={handlerCreate} disabled={isCreating}>
                Create Article
            </Button>
            <Button variant="contained" onClick={handlerUpdate}>
                Update Article 3
            </Button>
            {articles.map((article: any) => (
                <div key={article.id}>
                    <h2><Link to={`/article/${article.id}`}>{article.title}</Link></h2>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
