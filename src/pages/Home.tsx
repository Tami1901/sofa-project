import React from "react";
import { Link } from "react-router-dom";
import { Stack, Heading } from "@chakra-ui/core";
import { useSelector } from "react-redux";
import { AppStoreState } from "../lib/reducer";

const Home: React.FC = () => {
  const { username, loggedIn } = useSelector((store: AppStoreState) => ({
    loggedIn: store.login.loggedIn,
    username: store.login.username
  }));

  return (
    <Stack>
      {loggedIn ? (
        <Heading>Hello {username}</Heading>
      ) : (
        <Link to="/login">
          <Heading>Go to Login</Heading>
        </Link>
      )}
    </Stack>
  );
};

export default Home;
