import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Heading,
  Spinner,
  Text,
  Link as ChakraLink,
  Box,
  Button,
  Grid,
  Flex
} from "@chakra-ui/core";
import { Link, useHistory } from "react-router-dom";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeagues, deleteLeague } from "../reducers/leagues";

const Feature: React.FC<{ title: string; place: string; type: string }> = ({
  title,
  place,
  type,
  ...rest
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>Place: {place}</Text>
      <Text mt={4}>Type: {type}</Text>
    </Box>
  );
};

const Leagues: React.FC = () => {
  const history = useHistory();

  const dispatch = useThunkDispatch();
  const { loading, error, leagues, token } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    leagues: store.leagues.leagues,
    token: store.login.token
  }));

  useEffect(() => {
    // dispatch(fetchLeagues(token, leagues.length === 0));
    dispatch(fetchLeagues(token, true));
  }, [dispatch]);

  const remove = (id: string) => (): void => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure?")) {
      dispatch(deleteLeague(token, id)).then(() => {
        history.push(`/leagues`);
      });
    }
  };

  return (
    <Stack p={3}>
      <Flex justifyContent="space-between">
        <Flex align="flex-end">
          <Heading className="title">Leagues</Heading>
        </Flex>
        <Flex align="center" justify="center">
          <Button variantColor="green">
            <Link to="/leagues/new">New League</Link>
          </Button>
        </Flex>
      </Flex>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        // <List styleType="disc">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {leagues.map((league) => (
            <Link to={`/leagues/${league.id}`}>
              <Feature title={league.name} place={league.place} type={league.type} />
              <ChakraLink onClick={remove(league.id)}>Delete</ChakraLink>
            </Link>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Leagues;
