import React, { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Stack,
  InputLeftElement,
  InputGroup,
  Icon,
  InputRightElement,
  Text,
  FormControl
} from "@chakra-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Link from "../../components/Link";
import useToggle from "../../hooks/useToggle";
import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { registerUser } from "../../reducers/login";

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

const Register: React.FC = () => {
  const history = useHistory();
  const [showPassword, togglePassword] = useToggle();
  const [showConfirmPassword, toggleConfirmPassword] = useToggle();
  const { handleSubmit, register } = useForm();

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const { loading, error } = useSelector((store: AppStoreState) => ({
    loading: store.login.register.loading,
    error: store.login.register.error
  }));
  const dispatch = useThunkDispatch();

  const onSubmit = (data): void => {
    if (data.password.length < 6) {
      setErrors({ password: "Too short" });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrors({ confirmPassword: "No match" });
      return;
    }

    dispatch(registerUser(data)).then((ok) => {
      if (ok) {
        history.push("/leagues");
      }
    });
  };

  return (
    <Container>
      <div className="content2">
        <div className="middle">
          <Text fontSize="3em" color="blue" className="title" fontFamily="'Bebas Neue', cursive;">
            Tennis league
          </Text>
          {/* {JSON.stringify(state)} */}
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <Text>{error}</Text>}
            <FormControl isReadOnly={loading}>
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                  <Input type="email" placeholder="email" name="email" ref={register} isRequired />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement children={<Icon name="check" color="gray.300" />} />
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    ref={register}
                    isRequired
                  />
                </InputGroup>
                <InputGroup size="md">
                  <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                    ref={register}
                    isRequired
                    isInvalid={!!errors.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={togglePassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <Text>{errors.password}</Text>}
                <InputGroup size="md">
                  <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
                  <Input
                    pr="4.5rem"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    ref={register}
                    isRequired
                    isInvalid={!!errors.confirmPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleConfirmPassword}>
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}
              </Stack>
            </FormControl>

            <div className="login">
              <Button
                variantColor="green"
                size="lg"
                className="loginbutton"
                type="submit"
                isLoading={loading}
              >
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
