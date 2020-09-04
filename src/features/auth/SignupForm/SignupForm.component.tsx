import React, { useState } from "react";
import { useMutation, ApolloError } from "@apollo/client";

import { CREATE_USER } from "./SignupForm.queries";

const SignupFormComponent = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // Hooks
  const [values, setValues] = useState(initialFormValues);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createUser] = useMutation(CREATE_USER, {
    onError: (e: ApolloError) => {
      setError(`Something went wrong :/ Error message: ${e.message}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const createdUser = await createUser({
      variables: {
        name: values.firstName + "" + values.lastName,
        email: values.email,
        password: values.password,
      },
    });

    setIsLoading(false);

    if (!!createdUser) {
      setValues(initialFormValues);
      setUserCreated(true);
    }
  };

  return (
    <div>
      <h3>Sign up for a free account</h3>
      {}
      {userCreated ? (
        "Your account was created!"
      ) : (
        <>
          <form onSubmit={handleFormSubmit}>
            <input
              type='text'
              name='firstName'
              value={values.firstName}
              onChange={handleInputChange}
              placeholder='First name'
            />
            <input
              type='text'
              name='lastName'
              value={values.lastName}
              onChange={handleInputChange}
              placeholder='First name'
            />
            <input
              type='text'
              name='email'
              value={values.email}
              onChange={handleInputChange}
              placeholder='Email address'
            />
            <input
              type='text'
              name='password'
              value={values.password}
              onChange={handleInputChange}
              placeholder='Create password'
            />
            <input type='submit' value='Register' />
          </form>
          {isLoading && <p>Waiting for server response</p>}
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default SignupFormComponent;
