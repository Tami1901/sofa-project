import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Text, Image, Button, Heading, Stack } from "@chakra-ui/core";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import { AppStoreState } from "../lib/reducer";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { loginInit } from "../reducers/login";
import Link from "../components/Link";

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
  height: 100vh;
  .court {
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .button {
    background-color: #ffe900;
    color: black;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15em;
    height: 5em;
    font-size: 20px;
  }
`;

const Home: React.FC = () => {
  const dispatch = useThunkDispatch();
  const [showLogging, setShowLogging] = useState<boolean>(false);
  const { loggedIn, init } = useSelector((store: AppStoreState) => ({
    loggedIn: store.login.loggedIn,
    init: store.login.init
  }));

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogging(true), 500);
    return (): void => clearTimeout(timeout);
  }, []);

  const history = useHistory();

  useEffect(() => {
    dispatch(loginInit()).then((res) => console.log(res));
  }, []);

  if (loggedIn) {
    return (
      <Stack p={3} w="90%" m="0 auto" spacing={4}>
        <Heading className="title">Home</Heading>
        <Link to="/leagues">
          <Heading fontSize="lg">Leagues</Heading>
        </Link>
      </Stack>
    );
  }

  if (!showLogging && init) {
    return <Heading>Logging you in</Heading>;
  }

  return (
    <Container>
      <Text
        fontSize="5em"
        color="blue"
        className="title"
        textAlign="center"
        paddingTop="95px"
        fontFamily="'Bebas Neue', cursive;"
      >
        Tennis league
      </Text>
      <Image
        size="200px"
        src="https://wallpapercrafter.com/uploads/posts/39360-the-view-of-a-white-tennis-line-markings-on-a-tennis-court___tennis-line-markings.jpg"
        alt="tennis court"
        className="court"
      />
      <Button
        variant="solid"
        className="button"
        onClick={(): void => history.push("/login")}
        fontFamily="'Bebas Neue', cursive;"
      >
        Login in
      </Button>
    </Container>
  );
};

export default Home;
