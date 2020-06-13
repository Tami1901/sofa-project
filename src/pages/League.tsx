import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Heading, Spinner, Text, Link as ChakraLink } from "@chakra-ui/core";
import { Link, useParams } from "react-router-dom";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeague } from "../reducers/actionsLeagues";

const League: React.FC = () => {
  const { id } = useParams();

  const dispatch = useThunkDispatch();
  const { loading, error, league, token } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    league: store.leagues.leagues.find((l) => l.id === id) || undefined,
    token: store.login.token
  }));

  useEffect(() => {
    dispatch(fetchLeague(token, id, !!league));
  }, []);

  return (
    <Stack p={3}>
      <Heading>{loading ? "Loading..." : error || !league ? "Error..." : league.name}</Heading>
      <ChakraLink>
        <Link to="/leagues">Leagues</Link>
      </ChakraLink>
      <hr />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : league ? (
        <Text>Place: {league.place}</Text>
      ) : (
        <Text color="red.600">Can&apos;t find league</Text>
      )}
    </Stack>
  );
};

export default League;
