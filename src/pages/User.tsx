import React from "react";
import { useSelector } from "react-redux";
import { Heading, Stack } from "@chakra-ui/core";

import { AppStoreState } from "../lib/reducer";

const User: React.FC = () => {
  const { user } = useSelector((store: AppStoreState) => ({ user: store.login.user }));

  console.log(user);

  return (
    <Stack p={3}>
      <Heading>Profile</Heading>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(user, null, 2)}</code>
    </Stack>
  );
};

export default User;
