import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="laiout">
      <Outlet />
    </div>
  );
}

export default Layout;