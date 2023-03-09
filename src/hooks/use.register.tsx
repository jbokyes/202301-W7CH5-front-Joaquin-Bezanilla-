import { SyntheticEvent, useState } from "react";

export function useRegister() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });

  const handleChange = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(inputs);
  };

  return {
    handleChange,
    handleSubmit,
    inputs,
  };
}
