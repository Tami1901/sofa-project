import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Heading,
  Spinner,
  Text,
  Button,
  Input,
  Flex,
  Box,
  Grid,
  Tag,
  Divider
} from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, deleteLeague, updateEvent } from "../../reducers/leagues";
import { LinkButton } from "../../components/Link";
import { IEvent } from "../../reducers/leagues/types";
import useToggle from "../../hooks/useToggle";

interface EventItemProps {
  lId: string;
  event: IEvent;
  addScore: ({ score: string }) => Promise<boolean>;
  loading: string[];
  error: Record<string, string>;
}

const EventItem: React.FC<EventItemProps> = ({ lId, event, addScore, loading, error }) => {
  const [add, toggle, setShow] = useToggle();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { score: string }): void => {
    addScore(data).then((ok) => {
      if (ok) {
        setShow(false);
      }
    });
  };

  return (
    <Stack spacing={4} p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">
        {event.name}
        {loading.includes(event.id) ? (
          <Spinner />
        ) : Object.keys(error).includes(event.id) && error[event.id] ? (
          <Text color="red.600">{error[event.id]}</Text>
        ) : (
          event.score !== undefined && `: ${event.score}`
        )}
      </Heading>
      <Stack isInline>
        <Tag>{event.a}</Tag>
        <Tag>{event.b}</Tag>
      </Stack>
      {add && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Input type="text" name="score" isRequired ref={register} />
              <Button type="submit">Add</Button>
            </Stack>
          </form>
        </Box>
      )}
      <Stack isInline justify="space-between">
        <LinkButton
          leftIcon="edit"
          w="100%"
          to={`/leagues/${lId}/event/${event.id}`}
          variantColor="green"
          variant="outline"
          mr={2}
        >
          Edit
        </LinkButton>
        {event.score === undefined && (
          <Button onClick={toggle}>{add ? "Hide score" : "Show score"}</Button>
        )}
      </Stack>
    </Stack>
  );
};

const League: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useThunkDispatch();
  const { loading, error, league, token, updateEventStore } = useSelector(
    (store: AppStoreState) => ({
      loading: store.leagues.loading,
      error: store.leagues.error,
      league: store.leagues.leagues.find((l) => l.id === id) || undefined,
      token: store.login.token,
      updateEventStore: store.leagues.updateEvent
    })
  );

  const { loading: scoreLoading, error: scoreError } = updateEventStore;

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

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Flex justifyContent="space-between" flexDir={{ base: "column", md: "row" }}>
        <Flex align="flex-end">
          <Heading className="title">
            {loading
              ? "Loading..."
              : error || !league
              ? "Error..."
              : `${league.name}, ${league.place}`}
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
                <EventItem
                  key={event.id}
                  event={event}
                  lId={id}
                  addScore={addScore(event.id)}
                  loading={scoreLoading}
                  error={scoreError}
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
