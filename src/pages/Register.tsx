import React, { useReducer } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import {
  Input,
  Button,
  Stack,
  InputLeftElement,
  InputGroup,
  Icon,
  InputRightElement,
  Text
} from "@chakra-ui/core";

const Container = styled.div`
  background-color: rgb(248, 136, 61);
  width: 400px;
  min-height: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 3%;

  .content2 {
    width: 100%;
    height: 100%;
  }
  .title {
    text-align: center;
    padding-top: 10%;
  }

  .middle {
    width: 70%;
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

type Field = "username" | "email" | "password" | "confirmPassword";

interface IState {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  confirmPassword: string;
  showConfirmPassword: boolean;
  errors: Record<Field, string | undefined>;
}

const defaultErrors = {
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
  username: undefined
};

const initState: IState = {
  email: "foo@bar.com",
  password: "foobar",
  showPassword: false,
  confirmPassword: "foo",
  showConfirmPassword: false,
  username: "foobar",
  errors: { ...defaultErrors }
};

type IAction =
  | { type: "error"; payload: { field: Field; message: string } }
  | { type: "clearError" }
  | { type: Field; payload: string }
  | { type: "togglePassword" | "toggleConfirmPassword" };

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "username":
      return { ...state, username: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "togglePassword":
      return { ...state, showPassword: !state.showPassword };
    case "toggleConfirmPassword":
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case "error":
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message }
      };
    case "clearError":
      return {
        ...state,
        errors: { ...defaultErrors }
      };
    default:
      return state;
  }
};

const Register: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { password, confirmPassword } = state;

    dispatch({ type: "clearError" });

    if (password.length < 6) {
      dispatch({ type: "error", payload: { field: "password", message: "Password too short" } });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({
        type: "error",
        payload: { field: "confirmPassword", message: "Passwords don't match" }
      });
    }
  };

  console.log(state);

  return (
    <Container>
      <div className="content2">
        <div className="middle">
          <Text fontSize="3em" color="blue" className="title" fontFamily="'Bebas Neue', cursive;">
            Tennis league
          </Text>
          {/* {JSON.stringify(state)} */}
          <br />
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                <Input
                  type="email"
                  placeholder="email"
                  className="input"
                  value={state.email}
                  onChange={(e): void => dispatch({ type: "email", payload: e.target.value })}
                  isRequired
                  isInvalid={!!state.errors.email}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement children={<Icon name="check" color="gray.300" />} />
                <Input
                  type="phone"
                  placeholder="Username"
                  value={state.username}
                  onChange={(e): void => dispatch({ type: "username", payload: e.target.value })}
                  isRequired
                  isInvalid={!!state.errors.username}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type={state.showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="input"
                  value={state.password}
                  onChange={(e): void => dispatch({ type: "password", payload: e.target.value })}
                  isRequired
                  isInvalid={!!state.errors.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={(): void => dispatch({ type: "togglePassword" })}
                  >
                    {state.showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {state.errors.password && <Text>{state.errors.password}</Text>}
              <InputGroup size="md">
                <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                <Input
                  pr="4.5rem"
                  type={state.showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="input"
                  value={state.confirmPassword}
                  onChange={(e): void =>
                    dispatch({ type: "confirmPassword", payload: e.target.value })
                  }
                  isRequired
                  isInvalid={!!state.errors.confirmPassword}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={(): void => dispatch({ type: "toggleConfirmPassword" })}
                  >
                    {state.showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {state.errors.confirmPassword && <Text>{state.errors.confirmPassword}</Text>}
            </Stack>

            <div className="login">
              <Button variantColor="green" size="lg" className="loginbutton" type="submit">
                Register
              </Button>
            </div>
          </form>
          <Text className="text">
            You already have an account? Login <Link to="/login">here</Link>
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default Register;
