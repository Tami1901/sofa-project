import React from "react";
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
  height: 500px;
  margin: 12vh auto 0;

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

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <div className="content2">
        <div className="middle">
          <Text fontSize="3em" color="blue" className="title" fontFamily="'Bebas Neue', cursive;">
            Tennis league
          </Text>
          <br />
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement children={<Icon name="email" color="gray.300" />} />
              <Input type="email" placeholder="email" className="input" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement children={<Icon name="check" color="gray.300" />} />
              <Input type="phone" placeholder="Username" />
            </InputGroup>

            <InputGroup size="md">
              <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="input"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="input"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>

          <div className="login">
            <Button variantColor="green" size="lg" className="loginbutton">
              Register
            </Button>
          </div>

          <Text className="text">
            You already have an account? Login <Link to="/login">here</Link>
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default Register;
