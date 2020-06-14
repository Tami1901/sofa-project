import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, List, ListItem, Heading, Spinner, Text, Link as ChakraLink } from "@chakra-ui/core";
import { Link, useHistory } from "react-router-dom";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeagues, deleteLeague } from "../reducers/leagues";

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
      <Heading>Leagues</Heading>
      <ChakraLink>
        <Link to="/leagues/new">New League</Link>
      </ChakraLink>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <List styleType="disc">
          {leagues.map((league) => (
            <ListItem key={league.id}>
              <ChakraLink>
                <Link to={`/leagues/${league.id}`}>{league.name}</Link>
              </ChakraLink>{" "}
              <ChakraLink>
                <Link to={`/leagues/${league.id}/edit`}>Edit</Link>
              </ChakraLink>{" "}
              <ChakraLink onClick={remove(league.id)}>Delete</ChakraLink>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default Leagues;
