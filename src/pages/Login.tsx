import React, { useState } from "react";
import {
  Input,
  Button,
  InputLeftElement,
  InputGroup,
  Icon,
  InputRightElement,
  Checkbox,
  Text
} from "@chakra-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { loginAction } from "../reducers/actions";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import styled from "@emotion/styled";

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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const history = useHistory();

  const dispatch = useThunkDispatch();
  const { error, loading } = useSelector((store: AppStoreState) => ({
    //spremljeni su u storu error i loading
    //store je uvijek AppStoreState i onda se lijepo reci i ponudit ti
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

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <div className="content2">
        <Text
          fontSize="3em"
          color="blue"
          className="title"
          textAlign="center"
          paddingTop="15%"
          fontFamily="'Bebas Neue', cursive;"
        >
          Tennis league
        </Text>
        <br />

        <form className="middle" onSubmit={onSubmit}>
          {" "}
          <InputGroup>
            <InputLeftElement children={<Icon name="email" color="gray.300" />} />
            <Input
              type="text"
              name="username"
              placeholder="email"
              className="input"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUsername(e.target.value)
              }
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
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
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
            value="remember"
            // onChange={setKeepLoggedIn}
            // checked={keepLoggedIn}
          >
            Keep me logged in
          </Checkbox>
          <div className="login">
            <Button variantColor="green" size="lg" className="loginbutton">
              Log in
            </Button>
          </div>
          <Text className="text">
            You don't have an account? Register <Link to="/register">here</Link>
          </Text>
        </form>
      </div>
    </Container>
  );
};

export default Login;
