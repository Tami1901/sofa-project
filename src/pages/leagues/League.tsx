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
  Divider,
  IconButton
} from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, deleteLeague, updateEvent, deleteEvent } from "../../reducers/leagues";
import { LinkButton, LinkIconButton } from "../../components/Link";
import { IEvent } from "../../reducers/leagues/types";
import useToggle from "../../hooks/useToggle";

interface EventItemProps {
  lId: string;
  event: IEvent;
  addScore: ({ score: string }) => Promise<boolean>;
  remove: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ lId, event, addScore, remove }) => {
  const [add, toggle, setShow] = useToggle();
  const { register, handleSubmit } = useForm();

  const { updateEventStore, deleteEventStore } = useSelector((store: AppStoreState) => ({
    updateEventStore: store.leagues.updateEvent,
    deleteEventStore: store.leagues.removeEvent
  }));

  const { loading: updateLoading, error: updateError } = updateEventStore;
  const { loading: deleteLoading, error: deleteError } = deleteEventStore;

  const onSubmit = (data: { score: string }): void => {
    addScore(data).then((ok) => {
      if (ok) {
        setShow(false);
      }
    });
  };

  return (
    <Stack spacing={4} p={5} shadow="md" borderWidth="1px">
      <Flex justify="space-between">
        <Heading fontSize="xl">
          {event.name}
          {updateLoading.includes(event.id) ? (
            <Spinner />
          ) : Object.keys(updateError).includes(event.id) && updateError[event.id] ? (
            <Text color="red.600">{updateError[event.id]}</Text>
          ) : (
            event.score !== undefined && `: ${event.score}`
          )}
        </Heading>
        {Object.keys(deleteError).includes(event.id) && deleteError[event.id] && (
          <Text color="red.600">{deleteError[event.id]}</Text>
        )}
        <Stack isInline>
          {event.score === undefined && (
            <IconButton
              onClick={toggle}
              variant="outline"
              variantColor="orange"
              icon={!add ? "view-off" : "view"}
              aria-label={!add ? "Hide score" : "Show score"}
            />
          )}
          <LinkIconButton
            to={`/leagues/${lId}/event/${event.id}`}
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
            onClick={remove}
            isLoading={deleteLoading.includes(event.id)}
          />
        </Stack>
      </Flex>
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
    </Stack>
  );
};

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
