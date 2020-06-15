import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack, Heading, Spinner, Text, Button, Flex, Grid, Divider } from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, deleteLeague, updateEvent, deleteEvent } from "../../reducers/leagues";
import { LinkButton } from "../../components/Link";
import EventCard from "../../components/EventCard";

const League: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useThunkDispatch();
  const { loading, error, league, token } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    league: store.leagues.leagues.find((l) => l.id === id) || undefined,
    token: store.login.token
  }));

  useEffect(() => {
    dispatch(fetchLeague(token, id, !!league));
  }, [dispatch]);

  const addScore = (eventId: string) => (data: { score: string }): Promise<boolean> => {
    return dispatch(updateEvent(token, id, eventId, data));
  };

  const onDelete = (): void => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure?")) {
      dispatch(deleteLeague(token, id)).then(() => {
        history.push(`/leagues`);
      });
    }
  };

  const removeEvent = (eventId: string) => (): void => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEvent(token, id, eventId)).then(() => {
        console.log("done");
      });
    }
  };

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Flex justifyContent="space-between" flexDir={{ base: "column", md: "row" }}>
        <Flex align="flex-end">
          <Heading className="title">
            {loading
              ? "Loading..."
              : error || !league
              ? "Error..."
              : `${league.name}, ${league.place}${league.type ? ` - ${league.type}` : ""}`}
          </Heading>
        </Flex>
        <Stack spacing={4} isInline mt={{ base: 4, md: 0 }}>
          <Button leftIcon="delete" variantColor="red" onClick={onDelete}>
            Delete
          </Button>
          <LinkButton leftIcon="edit" to={`/leagues/${id}/edit`} variantColor="green">
            Edit
          </LinkButton>
          <LinkButton to={`/leagues/${id}/new-event`} variantColor="blue">
            Add new event
          </LinkButton>
        </Stack>
      </Flex>

      <Divider />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : league ? (
        <Stack>
          <Heading fontSize="xl">Events: </Heading>
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(300px, 1fr))",
              md:
                league.events?.length > 2
                  ? "repeat(auto-fit, minmax(300px, 1fr))"
                  : "repeat(3, 1fr)"
            }}
            gap={6}
          >
            {league.events?.length ? (
              league.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  lId={id}
                  addScore={addScore(event.id)}
                  remove={removeEvent(event.id)}
                />
              ))
            ) : (
              <Heading fontSize="lg">No events</Heading>
            )}
          </Grid>
        </Stack>
      ) : (
        <Text color="red.600">Can&apos;t find league</Text>
      )}
    </Stack>
  );
};

export default League;
