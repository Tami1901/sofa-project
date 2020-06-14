import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Flex, Heading, Stack, Button, Box, Avatar } from "@chakra-ui/core";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { LogoutAction } from "../reducers/login";
import Link from "./Link";

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useThunkDispatch();
  const { loggedIn, username } = useSelector((store: AppStoreState) => ({
    loggedIn: store.login.loggedIn,
    username: store.login.username
  }));

  const logout = (): void => {
    localStorage.removeItem("token");
    dispatch(LogoutAction());
    history.push("/");
  };

  if (loggedIn) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0.75rem"
        bg="rgb(248, 136, 61)"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Link to="/">
            <Heading as="h1" size="lg">
              TENNIS LEAGUE
            </Heading>
          </Link>
        </Flex>
        <Stack isInline align="center" spacing={3}>
          <Flex align="end">
            <Button onClick={logout} variantColor="white" variant="outline">
              Logout
            </Button>
          </Flex>

          <Box>
            <Link to="/user">
              <Avatar name={username} />
            </Link>
          </Box>
        </Stack>
      </Flex>
    );
  }

  return null;
};

export default Header;
