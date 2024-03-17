import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import { authorize } from "../../components/service";

const StartPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    const userName = data.userName as string;
    const password = data.password as string;
    target.reset();
    authorize({ login: userName, password }).then(res => {
      setToken(res);
    });
  }

  useEffect(() => {
    const JSONtoken = localStorage.getItem("auth_token");
    if (!JSONtoken) {
      return;
    }
    setToken(JSON.parse(JSONtoken));
  }, []);

  useEffect(() => {
    if (token ) {
      navigate("/news");
      localStorage.setItem("auth_token", JSON.stringify(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__title">Neto Social</h3>
        <input type="text" name="userName" className="form__input user-name" required={true} placeholder="Username" />
        <input type="text" name="password" className="form__input password" required={true} placeholder="Password" />
        <button className="form__btn">Login</button>
      </form>
      <article className="lable">
        <h1 className="lable__title">Neto Social</h1>
        <h4 className="lable__slogan">Facebook and VK killer.</h4>
      </article>
    </>
  );
}

export default StartPage;