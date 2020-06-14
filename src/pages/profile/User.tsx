import React from "react";
import { useSelector } from "react-redux";
import { Heading, Stack, Flex } from "@chakra-ui/core";

import { AppStoreState } from "../../lib/reducer";
import { LinkButton } from "../../components/Link";

const User: React.FC = () => {
  const { user } = useSelector((store: AppStoreState) => ({ user: store.login.user }));

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Flex justify="space-between">
        <Heading>Hello {user.username}</Heading>
        <LinkButton leftIcon="edit" to="/user/edit" variantColor="green">
          Edit
        </LinkButton>
      </Flex>
      <Heading size="md">First Name: {user.firstName}</Heading>
      <Heading size="md">Last Name: {user.lastName}</Heading>
      <Heading size="md">Age: {user.age}</Heading>
    </Stack>
  );
};

export default User;
