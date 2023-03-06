import { useNavigate } from "react-router-dom";

export function RegisterLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
