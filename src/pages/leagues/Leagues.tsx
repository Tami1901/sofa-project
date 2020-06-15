import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Heading, Spinner, Text, Grid, Flex, Divider, IconButton } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeagues, deleteLeague } from "../../reducers/leagues";
import Link, { LinkButton, LinkIconButton } from "../../components/Link";
import { League } from "../../reducers/leagues/types";

const Feature: React.FC<{
  league: League;
  remove: (id: string) => () => void;
}> = ({ league, remove }) => {
  return (
    <Stack spacing={4} p={5} shadow="md" borderWidth="1px">
      <Flex justify="space-between">
        <Link to={`/leagues/${league.id}`}>
          <Heading fontSize="xl">{league.name}</Heading>
        </Link>
        <Stack isInline>
          <LinkIconButton
            to={`/leagues/${league.id}/edit`}
            variantColor="green"
            variant="outline"
            icon="edit"
            aria-label="edit"
          />
          <IconButton
            icon="delete"
            aria-label="delete"
            variantColor="red"
            variant="outline"
            onClick={remove(league.id)}
          />
        </Stack>
      </Flex>
      <Text>Place: {league.place}</Text>
      <Text>Type: {league.type}</Text>
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
    dispatch(fetchLeagues(token, leagues.length === 0));
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
      <Flex justifyContent="space-between" flexDir={{ base: "column", md: "row" }}>
        <Flex align="flex-end">
          <Heading className="title">Leagues</Heading>
        </Flex>
        <Stack spacing={4} isInline mt={{ base: 4, md: 0 }}>
          <LinkButton to="/leagues/new" variantColor="blue">
            New League
          </LinkButton>
        </Stack>
      </Flex>

      <Divider />

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(auto-fit, minmax(300px, 1fr))",
            md: leagues?.length > 2 ? "repeat(auto-fit, minmax(300px, 1fr))" : "repeat(3, 1fr)"
          }}
          gap={6}
        >
          {leagues.map((league) => (
            <Feature key={league.id} remove={remove} league={league} />
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Leagues;
