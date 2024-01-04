/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from "react-hook-form";

import image from "../../assets/imageSideBar.png";
import { ButtonMaker } from "../../components/button/button";
import { FormMaker } from "../../components/form/form";
import { InputMaker } from "../../components/input/input";
import { SideBarMaker } from "../../components/sidebar/sidebar";
// eslint-disable-next-line import/no-cycle
import api from "../../services/api";

type Inputs = {
  email: string;
  password: string;
};

export function Login(): React.ReactNode {
  const { register, handleSubmit } = useForm<Inputs>();
  const { mutateAsync: loginMutation } = api.user.useLogin();

  const onSubmit = async (data: Inputs) => {
    try {
      await loginMutation({ loginUserModel: data });
      window.location.href = "/home";
    } catch (err) {
      // pop up error
    }
  };

  const handleRegisterClick = () => {
    window.location.href = "register";
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <SideBarMaker>
        <img alt="ollamy logo" src={image} width="auto" height="auto" />
      </SideBarMaker>
      <FormMaker>
        <h1
          style={{
            color: "#E6674F",
            marginTop: "140px",
            marginBottom: "60px",
            fontWeight: "bolder",
            fontSize: "40px",
          }}
        >
          Login
        </h1>
        <label htmlFor="email">Email</label>
        <InputMaker register={{ ...register("email") }} />
        <label htmlFor="password">Password</label>
        <InputMaker
          type="password"
          margin="0px 0px 20px 0px"
          register={{ ...register("password") }}
        />
        <ButtonMaker textButton="Login" onClick={handleSubmit(onSubmit)} />
        <p>
          Don't have an account?{" "}
          <span
            style={{ color: "#876BF6", cursor: "pointer" }}
            onClick={handleRegisterClick}
          >
            Register
          </span>
        </p>
      </FormMaker>
    </div>
  );
}
