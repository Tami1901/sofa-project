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

  if (loggedIn) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex justify="space-between" w="100%">
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg">
              Chakra UI
            </Heading>
          </Flex>

          <Box display={{ sm: "block", md: "none" }} onClick={toggle}>
            <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>
        </Flex>

        <Flex
          flexDir="column"
          height={show ? "unset" : "0"}
          overflow="hidden"
          style={{ animationDuration: "0.3s" }}
        >
          <Box
            display={{ sm: show ? "block" : "none", md: "flex" }}
            width={{ sm: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
          >
            <MenuItems>Docs</MenuItems>
            <MenuItems>Examples</MenuItems>
            <MenuItems>Blog</MenuItems>
          </Box>

          <Box display={{ sm: show ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
            <Button bg="transparent" border="1px">
              Create account
            </Button>
          </Box>
        </Flex>
      </Flex>
    );

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

        <Box display={display("block", "none", true)} onClick={toggle}>
          <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <br />

        <Box
          display={display("flex", "flex", show)}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <MenuItems>Docs</MenuItems>
          <MenuItems>Examples</MenuItems>
          <MenuItems>Blog</MenuItems>
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
  }

  return null;
};

export default Header;
