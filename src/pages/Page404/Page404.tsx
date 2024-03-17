import { useNavigate } from "react-router-dom";
import "./Page404.css";


const Page404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  } 

  return (
    <div className="page-error" onClick={handleClick}>
      <img src="./src/img/404.png" alt="image" className="page-error__img" />
    </div>
  );
}

export default Page404;