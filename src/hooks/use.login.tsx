import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersApiRepo } from "../repo/user.api.repo";

export function useLogin() {
  const repo = new UsersApiRepo();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    passwd: "",
  });

  const handleLogin = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setLogin({ ...login, [target.name]: target.value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    repo.logUser(login);
    setTimeout(() => {
      navigate("/home");
    }, 300);
  };

  return {
    login,
    handleLogin,
    handleSubmit,
  };
}
