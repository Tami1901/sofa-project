import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  InputLeftElement,
  InputGroup,
  Icon,
  InputRightElement,
  Checkbox,
  Text,
  Heading
} from "@chakra-ui/core";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { loginAction, loginInit } from "../reducers/login";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";

const Container = styled.div`
  background-color: rgb(248, 136, 61);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 500px;

  border-radius: 50%;

  .content2 {
    width: 100%;
    height: 100%;
  }

  .middle {
    width: 60%;
    margin: 0 auto;
  }

  .checkbox {
    margin-top: 5%;
  }

  .login .loginbutton {
    display: block;
    margin: 5% auto 0 auto;
  }

  .text {
    padding-top: 10px;
  }
`;

const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = (): void => setShow(!show);

  const [showLogging, setShowLogging] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();

  const dispatch = useThunkDispatch();
  const { error, loading, loggedIn, token, init } = useSelector((store: AppStoreState) => ({
    error: store.login.error,
    loading: store.login.loading,
    loggedIn: store.login.loggedIn,
    token: store.login.token,
    init: store.login.init
  }));

  useEffect(() => {
    dispatch(loginInit()).then((res) => console.log(res));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogging(true), 500);
    return (): void => clearTimeout(timeout);
  }, []);

  const { register, handleSubmit } = useForm();

  if (loading && init) {
    return showLogging && <Heading>Trying to log you in with existing token</Heading>;
  }

  if (loggedIn && token) {
    const { from } = (location.state as any) || {
      from: { pathname: "/" }
    };
    history.replace(from);
    return null;
  }

  const onSubmit = (data): void => {
    dispatch(loginAction(data.username, data.password, data.keep)).then((ok) => {
      if (ok) {
        history.push("/leagues");
      }
    });
  };

  return (
    <Container>
      <div className="content2">
        <Text
          fontSize="3em"
          color="blue"
          className="title"
          textAlign="center"
          paddingTop="1em"
          fontFamily="'Bebas Neue', cursive;"
        >
          Tennis league
        </Text>
        <br />

        <Text textAlign="center" mb="1em" pt={error ? 0 : "1.5em"}>
          {error || " "}
        </Text>

        <form className="middle" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <InputLeftElement children={<Icon name="email" color="gray.300" />} />
            <Input
              type="text"
              name="username"
              placeholder="email"
              className="input"
              // value={username}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              //   setUsername(e.target.value)
              // }
              ref={register}
            />
          </InputGroup>
          <br />
          <InputGroup size="md">
            <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              className="input"
              // value={password}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              //   setPassword(e.target.value)
              // }
              ref={register}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Checkbox
            defaultIsChecked
            variantColor="green"
            className="checkbox"
            name="keep"
            ref={register}
          >
            Keep me logged in
          </Checkbox>
          <div className="login">
            <Button
              variantColor="green"
              type="submit"
              size="lg"
              className="loginbutton"
              isLoading={loading}
            >
              Log in
            </Button>
          </div>
          <Text className="text">
            You don&lsquo;t have an account? Register <Link to="/register">here</Link>
          </Text>
        </form>
      </div>
    </Container>
  );
};

export default Login;
