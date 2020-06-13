import React from "react";
import {
  Stack,
  Heading,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  FormControl,
  Text,
  Link as ChakraLink
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { createLeague } from "../reducers/leagues";
import { AppStoreState } from "../lib/reducer";

export interface NewLeagueData {
  name: string;
  place: string;
  type?: string;
}

const LeaguesNew: React.FC = () => {
  const { handleSubmit, register } = useForm();

  const { token, loading, error } = useSelector((store: AppStoreState) => ({
    token: store.login.token,
    loading: store.leagues.add.loading,
    error: store.leagues.add.error
  }));
  const dispatch = useThunkDispatch();

  const onSubmit = (data: NewLeagueData): void => {
    dispatch(createLeague(token, data)).then((id) => console.log(id));
  };

  return (
    <Stack p={3}>
      <Heading>New League</Heading>
      <ChakraLink>
        <Link to="/leagues">Leagues</Link>
      </ChakraLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormControl isReadOnly={loading}>
            <InputGroup>
              <InputLeftAddon children="Name" />
              <Input
                type="text"
                isRequired
                roundedLeft="0"
                placeholder="League name"
                name="name"
                ref={register}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Place" />
              <Input
                type="text"
                isRequired
                roundedLeft="0"
                placeholder=" Place name"
                name="place"
                ref={register}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Type" />
              <Input
                type="text"
                roundedLeft="0"
                placeholder="Type league"
                name="type"
                ref={register}
              />
            </InputGroup>
          </FormControl>
          <Button type="submit" isLoading={loading}>
            Add league
          </Button>
          {error && <Text color="red.600">{error}</Text>}
        </Stack>
      </form>
    </Stack>
  );
};

export default LeaguesNew;
