import React, { useState } from "react";
import { Stack, Input, Button, Text } from "@chakra-ui/core";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { loginAction } from "../reducers/actions";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const history = useHistory();

  const dispatch = useThunkDispatch();
  const { error, loading } = useSelector((store: AppStoreState) => ({
    error: store.login.error,
    loading: store.login.loading
  }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(loginAction(username, password)).then((ok) => {
      if (ok) {
        history.push("/");
      }
    });
  };

  return (
    <Stack>
      <h1>Hello from login</h1>
      <form onSubmit={onSubmit}>
        <Input
          mb={2}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}
        />
        <Input
          mb={2}
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
        />
        <Button type="submit" loadingText="Logging in" isLoading={loading}>
          Login
        </Button>
        {error && <Text>{error}</Text>}
      </form>
    </Stack>
  );
};

export default Login;
