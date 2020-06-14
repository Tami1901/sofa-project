import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Text, Image, Button } from "@chakra-ui/core";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import { AppStoreState } from "../lib/reducer";

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
  const { token, loggedIn } = useSelector((store: AppStoreState) => ({
    // useSelector se koristi za uzimanje podataka iz stora
    loggedIn: store.login.loggedIn, // uzme jel logiran i username
    token: store.login.token
  }));

  const history = useHistory();

  useEffect(() => {
    if (token && loggedIn) {
      history.push("/leagues");
    }
  }, [token, loggedIn, history]);

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
