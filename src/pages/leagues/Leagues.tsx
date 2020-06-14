import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Heading, Spinner, Text, Grid, Flex, Button } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeagues, deleteLeague } from "../../reducers/leagues";
import Link, { LinkButton } from "../../components/Link";
import { League } from "../../reducers/leagues/types";

const Feature: React.FC<{
  league: League;
  remove: (id: string) => () => void;
}> = ({ league, remove }) => {
  return (
    <Stack spacing={4} p={5} shadow="md" borderWidth="1px">
      <Link to={`/leagues/${league.id}`}>
        <Heading fontSize="xl">{league.name}</Heading>
      </Link>
      <Text>Place: {league.place}</Text>
      <Text>Type: {league.type}</Text>
      <Flex justify="space-between">
        <LinkButton
          leftIcon="edit"
          w="100%"
          to={`/leagues/${league.id}/edit`}
          variantColor="green"
          variant="outline"
          mr={2}
        >
          Edit
        </LinkButton>
        <Button
          leftIcon="delete"
          w="100%"
          onClick={remove(league.id)}
          variantColor="red"
          variant="outline"
          ml={2}
        >
          Delete
        </Button>
      </Flex>
    </Stack>
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
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Flex justifyContent="space-between">
        <Heading className="title">Leagues</Heading>
        <LinkButton variantColor="blue" to="/leagues/new">
          New League
        </LinkButton>
      </Flex>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {leagues.map((league) => (
            <Feature remove={remove} league={league} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Leagues;
