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
  Heading,
  Stack,
  FormControl,
  Flex
} from "@chakra-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { loginAction, loginInit } from "../../reducers/login";
import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import Link from "../../components/Link";
import useToggle from "../../hooks/useToggle";

const Login: React.FC = () => {
  const [showPassword, togglePassword] = useToggle();

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
    <Stack
      p={6}
      bg="orange.400"
      w="90%"
      maxW="500px"
      borderRadius={5}
      pos="absolute"
      top="40%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Text fontSize="3em" color="blue" textAlign="center" fontFamily="'Bebas Neue', cursive;">
        Tennis league
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Text>{error}</Text>}
        <FormControl isReadOnly={loading} justifyContent="center">
          <Stack spacing={4} px={2}>
            <InputGroup>
              <InputLeftElement children={<Icon name="email" color="gray.300" />} />
              <Input type="email" placeholder="email" name="email" ref={register} isRequired />
            </InputGroup>

            <InputGroup>
              <InputLeftElement children={<Icon name="check" color="gray.300" />} />
              <Input type="text" placeholder="Username" name="username" ref={register} isRequired />
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
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={togglePassword}>
                  {showPassword ? "Hide" : "Show"}
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
          </Stack>
        </FormControl>
        <Flex justify="center">
          <Button
            mt={6}
            variantColor="green"
            size="lg"
            className="loginbutton"
            type="submit"
            isLoading={loading}
          >
            Login
          </Button>
        </Flex>
      </form>
      <Text mt={8}>
        You don&lsquo;t have an account? <Link to="/register">Register here</Link>
      </Text>
    </Stack>
  );
};

export default Login;
