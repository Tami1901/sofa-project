import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, List, ListItem, Heading, Spinner, Text } from "@chakra-ui/core";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeagues } from "../reducers/actionsLeagues";

const Leagues: React.FC = () => {
  const dispatch = useThunkDispatch();
  const { loading, error, leagues, token } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    leagues: store.leagues.leagues,
    token: store.login.token
  }));

  useEffect(() => {
    dispatch(fetchLeagues(token));
  }, []);

  return (
    <Stack>
      <Heading>Leagues</Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <List>
          {leagues.map((league) => (
            <ListItem key={league.id}>{league.name}</ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default Leagues;
