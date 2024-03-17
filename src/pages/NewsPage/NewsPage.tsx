import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsType, fetchNews, logOut } from "../../components/service";
import "./NewsPage.css";


const NewsPage = () => {
  const navigate = useNavigate();
  const newsId = useParams().id as string;
  const [news, setNews] = useState<NewsType>();

  useEffect(() => {
    const JSONtoken = localStorage.getItem("auth_token");
      if (!JSONtoken) {
        return;
      }
    fetchNews(JSON.parse(JSONtoken), newsId).then(res => {
      if (res.response) {
        setNews(res.response);
      }
      if (res.error) {
        handleErrors(res.error);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleErrors = (error: Error) => {
    if (error.message === "404") {
      navigate('/page404');
      return;
    }
    if (error.message === "401") {
      logOut();
      navigate('/');
      return;
    }
    console.log(error);
  }

  const handleClick = () => {
    navigate("/news");
  }

  return (
    <div className="news news-page" onClick={handleClick}>
      <img src={news?.image} alt="image" className="news__img" />
      <h4 className="news__title">{news?.title}</h4>
      <div className="news__content">{news?.content}</div>
    </div>
  );
}

export default NewsPage;