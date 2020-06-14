import React, { useState } from "react";
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
  FormControl,
  Flex
} from "@chakra-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Link from "../../components/Link";
import useToggle from "../../hooks/useToggle";
import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { registerUser } from "../../reducers/login";

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
        <Flex justify="center">
          <Button
            mt={6}
            variantColor="green"
            size="lg"
            className="loginbutton"
            type="submit"
            isLoading={loading}
          >
            Register
          </Button>
        </Flex>
      </form>
      <Text mt={8}>
        You already have an account? <Link to="/login">Login here</Link>
      </Text>
    </Stack>
  );
};

export default Register;
