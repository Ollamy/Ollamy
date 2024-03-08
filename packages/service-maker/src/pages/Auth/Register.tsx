/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { useForm } from "react-hook-form";

import image from "../../assets/imageSideBar.png";
import { ButtonMaker } from "../../components/button/button";
import { FormMaker } from "../../components/form/form";
import { InputMaker } from "../../components/input/input";
import { SideBarMaker } from "../../components/sidebar/sidebar";
// eslint-disable-next-line import/no-cycle
import api from "../../services/api";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rePassword: string;
};

enum State {
  PERSONALDATA,
  CONFIDENTIALDATA,
}

export function Register(): React.ReactNode {
  const [state, setState] = useState<State>(State.PERSONALDATA);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync: registerMutation } = api.user.useRegister();
  const buildRes = api.mobileApp.useLastMobileBuild();

  const onSubmit = async (data: Inputs): Promise<void> => {
    try {
      const { firstname, lastname, email, password } = data;
      await registerMutation({
        createUserModel: { firstname, lastname, email, password },
      });
      window.location.href = "/home";
    } catch (err) {
      /* empty */
    }
  };
  const handleLoginClick = (): void => {
    window.location.href = "login";
  };

  const downloadLastBuild = () => {
    if (buildRes.status === "success") window.location.href = buildRes.data.url;
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
        <img alt="logo Ollamy" src={image} width="auto" height="auto" />
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
          Register
        </h1>
        {state === State.PERSONALDATA && (
          <>
            <label htmlFor="firstName">First name</label>
            <InputMaker
              padding="24px"
              register={{ ...register("firstname", { required: true }) }}
            />
            <label htmlFor="lastName">Last name</label>
            <InputMaker
              padding="24px"
              register={{ ...register("lastname", { required: true }) }}
            />
            <ButtonMaker
              textButton="Continue"
              onClick={() => setState(State.CONFIDENTIALDATA)}
            />
          </>
        )}
        {state === State.CONFIDENTIALDATA && (
          <>
            <label htmlFor="email">Email</label>
            <InputMaker
              padding="24px"
              register={{ ...register("email", { required: true }) }}
            />
            <label htmlFor="password">Password</label>
            <InputMaker
              type="password"
              padding="24px"
              register={{ ...register("password", { required: true }) }}
            />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <InputMaker
              type="password"
              padding="24px"
              errorMessage={errors.rePassword && errors.rePassword.message}
              register={{
                ...register("rePassword", {
                  required: true,
                  // eslint-disable-next-line consistent-return
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                }),
              }}
            />
            <ButtonMaker
              textButton="Register"
              onClick={handleSubmit(onSubmit)}
            />
          </>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "#876BF6", cursor: "pointer" }}
              onClick={handleLoginClick}
            >
              Login
            </span>
          </p>
          <span
            style={{ color: "#876BF6", cursor: "pointer", alignSelf: "center" }}
            onClick={downloadLastBuild}
          >
            Download mobile app
          </span>
        </div>
      </FormMaker>
    </div>
  );
}
