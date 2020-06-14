import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Heading, Spinner, Text, Link as ChakraLink, List, ListItem } from "@chakra-ui/core";
import { Link, useParams } from "react-router-dom";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeague } from "../reducers/leagues";

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
  }, [dispatch, token, id, league]);

  return (
    <Stack p={3}>
      <Heading>{loading ? "Loading..." : error || !league ? "Error..." : league.name}</Heading>
      <Stack spacing={3} isInline>
        <ChakraLink>
          <Link to="/leagues">Leagues</Link>
        </ChakraLink>
        <ChakraLink>
          <Link to={`/leagues/${id}/new-event`}>Add new event</Link>
        </ChakraLink>
      </Stack>
      <hr />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : league ? (
        <Stack>
          <Text>Place: {league.place}</Text>
          <List listStyleType="'💩 '">
            {league.events?.map((event) => (
              <ListItem>
                {event.name} [{event.a} : {event.b}] ={">"} ({event.score})
              </ListItem>
            ))}
          </List>
        </Stack>
      ) : (
        <Text color="red.600">Can&apos;t find league</Text>
      )}
    </Stack>
  );
};

export default League;
