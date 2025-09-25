import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loginAs, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/teacher", {
        replace: true,
      });
    }
  }, [user, navigate]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Giriş</h2>
      <p className="text-gray-600 mb-4">Hızlı giriş için rol seçin:</p>
      <div className="flex gap-2">
        <Button
          type="primary"
          onClick={() => {
            loginAs("admin");
            navigate("/admin", { replace: true });
          }}
        >
          Admin olarak gir
        </Button>
        <Button
          onClick={() => {
            loginAs("teacher");
            navigate("/teacher", { replace: true });
          }}
        >
          Öğretmen olarak gir
        </Button>
      </div>
    </div>
  );
};

export default Login;
