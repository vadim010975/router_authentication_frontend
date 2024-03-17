import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileType, NewsType, fetchProfile, fetchNewsline, logOut, setLocalForage } from "../../components/service";
import Newsline from "../../components/Newsline/Newsline";
import Profile from "../../components/Profile/Profile";

const NewslinePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileType>();
  const [newsline, setNewsline] = useState<NewsType[]>([]);

  useEffect(() => {
    const JSONprofile = localStorage.getItem("auth_profile");
    if (!JSONprofile) {
      const JSONtoken = localStorage.getItem("auth_token");
      if (!JSONtoken) {
        return;
      }
      fetchProfile(JSON.parse(JSONtoken)).then(res => {
        if (res.response) {
          setProfile(res.response);
        }
        if (res.error) {
          handleErrors(res.error);
        }
      });
      return;
    }
    setProfile(JSON.parse(JSONprofile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      const JSONtoken = localStorage.getItem("auth_token");
      if (!JSONtoken) {
        return;
      }
      fetchNewsline(JSON.parse(JSONtoken)).then(res => {
        if (res.response) {
          setNewsline(res.response);
        }
        if (res.error) {
          handleErrors(res.error);
        } 
      });
      localStorage.setItem("auth_profile", JSON.stringify(profile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    if (newsline.length > 0) {
      setLocalForage(newsline);
    }
  }, [newsline]);

  const handleErrors = (error: Error) => {
    if (error.message === "404") {
      console.log(error);
      navigate('/page404');
      return;
    }
    if (error.message === "401") {
      console.log(error);
      logOut();
      navigate('/');
      return;
    }
    console.log(error);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewsline([]);
    setProfile(undefined);
    logOut();
    navigate('/');
  }

  const handleSelect = (id: string) => {
    navigate('/news/' + id);
  }

  return (
    <>
      <Profile profile={profile} handleClick={handleClick} />
      <Newsline newsline={newsline} handleSelect={handleSelect} />
    </>
  );
}

export default NewslinePage;