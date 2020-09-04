import React, { useState } from "react";
import { AUTHENTICATE_USER } from "./LoginForm.queries";
import { useMutation, ApolloError } from "@apollo/client";

type Props = {
  onLoginSuccess: () => void;
};

const LoginForm: React.FC<Props> = ({ onLoginSuccess }) => {
  const initialFormValues = {
    email: "",
    password: "",
  };

  // Hooks
  const [values, setValues] = useState(initialFormValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [authenticateUser] = useMutation(AUTHENTICATE_USER, {
    onError: (e: ApolloError) => {
      setError(`Something went wrong :/ Error message: ${e.message}`);
    },
    onCompleted: (data) => {
      window.sessionStorage.setItem(
        "token",
        data.authenticateUserWithPassword.token
      );
      onLoginSuccess();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    await authenticateUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    setIsLoading(false);

    if (!!authenticateUser) {
      setValues(initialFormValues);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='email'
          value={values.email}
          onChange={handleInputChange}
          placeholder='Yout email address'
        />
        <input
          type='text'
          name='password'
          value={values.password}
          onChange={handleInputChange}
          placeholder='Your password'
        />
        <input type={"submit"} value={"Login"} />
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginForm;
