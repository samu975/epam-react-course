import React, { useState } from "react";
import Header from "../Header/Header";
import Input from "../../common/Input/Input";
import { MoonLoader } from "react-spinners";
import Button from "../../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const sendToLocalStorage = (response: any) => {
    localStorage.setItem("token", response.data.result);
    localStorage.setItem("name", response.data.user.name);
    localStorage.setItem("email", response.data.user.email);
  };

  const onSubmit = () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        sendToLocalStorage(response);
        showSuccess();
        redirect();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const validateForm = () => {
    if (email.length < 2) {
      setError("Email must be at least 2 characters");
      return false;
    } else if (password.length < 2) {
      setError("Password must be at least 2 characters");
      return false;
    } else {
      return true;
    }
  };

  const showSuccess = () => {
    if (localStorage.getItem("token")) {
      setSuccess(`Welcome ${localStorage.getItem("name")}`);
    }
  };

  const redirect = () => {
    setTimeout(() => {
      navigate("/courses");
    }, 3000);
  };

  return (
    <>
      <Header />
      <section className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl">Login</h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                onSubmit();
              }
            }}
          >
            <Input
              className="border border-solid border-gray-300 rounded-md py-1 px-2"
              id="registrationEmail"
              type="email"
              label="Email"
              minLength={2}
              placeHolder="Enter your email"
              onChange={(e) => {
                e.target.value.length > 2
                  ? setEmail(e.target.value)
                  : setEmail("");
              }}
            />
            <Input
              className="border border-solid border-gray-300 rounded-md py-1 px-2"
              id="registrationPassword"
              type="password"
              minLength={2}
              placeHolder="Enter a password"
              label="Password"
              onChange={(e) => {
                e.target.value.length > 2
                  ? setPassword(e.target.value)
                  : setPassword("");
              }}
            />
            {loading ? (
              <div className="flex justify-center">
                <MoonLoader color="#36d7b7" />
              </div>
            ) : (
              <Button
                buttonText="Login"
                onClick={() => {}}
                type="submit"
                className="bg-cyan-500 py-1 rounded-md text-white"
              />
            )}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
          <p>
            If you not have an account you can{" "}
            <Link to={"/registration"} className="text-blue-700">
              Regitration
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
