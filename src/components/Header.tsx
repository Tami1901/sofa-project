import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Flex, Heading, Text, Button, Box, Avatar, Stack } from "@chakra-ui/core";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { LogoutAction } from "../reducers/login";
import Link from "./Link";
import useToggle from "../hooks/useToggle";

const MenuItems: React.FC = ({ children }) => {
  return (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  );
};

type Foo = "base" | "xs" | "sm" | "md";

const display = (sm: string, md: string, show: boolean): { [k in Foo]: string } => {
  return {
    base: show ? sm : "none",
    xs: show ? sm : "none",
    sm: show ? sm : "none",
    md
  };
};

const Header: React.FC = () => {
  const [show, toggle] = useToggle();

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

  if (!loggedIn) {
    return null;
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-evenly"
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

      <Box display={{ sm: "block", md: "none" }} onClick={toggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={display("flex", "flex", show)}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link to="/leagues">Leagues</Link>
        </MenuItems>
      </Box>

      <Stack
        display={display("flex", "flex", show)}
        mt={{ base: 4, md: 0 }}
        isInline
        align="center"
        spacing={3}
      >
        <Button onClick={logout} variantColor="white" variant="outline">
          Logout
        </Button>
        <Avatar name={username} onClick={(): void => history.push("/user")} cursor="pointer" />
      </Stack>
    </Flex>
  );
};

export default Header;
