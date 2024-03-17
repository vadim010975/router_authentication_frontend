import { FC } from "react";
import "./Newsline.css";
import { NewsType } from "../service";

type NewslineProps = {
  newsline: NewsType[],
  handleSelect: (id: string) => void,
}

const Newsline: FC<NewslineProps> = ({ newsline, handleSelect }) => {

  return (
    <section className="newsline">
      {newsline.map(news => (
        <article className="news" key={news.id} onClick={() => handleSelect(news.id)}>
          <img src={news.image} alt="image" className="news__img" />
          <h4 className="news__title">{news.title}</h4>
          <div className="news__content">{news.content}</div>
        </article>
      ))}
    </section>
  );
}

export default Newsline;