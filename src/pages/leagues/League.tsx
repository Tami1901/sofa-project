import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Heading,
  Spinner,
  Text,
  List,
  ListItem,
  Button,
  FormControl,
  Input,
  Flex,
  Box
} from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, deleteLeague, updateEvent } from "../../reducers/leagues";
import Link from "../../components/Link";

const League: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [addId, setAddId] = useState<string | undefined>();
  const [value, setValue] = useState<string | undefined>();

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

  const addScore = (eventId: string) => (): void => {
    setAddId(eventId === addId ? undefined : eventId);
    setValue("");
  };

  const onSubmit = (eventId: string) => (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setAddId(undefined);
    dispatch(updateEvent(token, id, eventId, { score: value })).then(() => console.log("Hello"));
    setValue("");
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
    <Stack p={3}>
      <Flex justifyContent="space-between">
        <Flex align="flex-end">
          <Heading className="title">
            {loading ? "Loading..." : error || !league ? "Error..." : league.name}
          </Heading>
        </Flex>
        <Flex align="center" justify="center">
          <Stack spacing={4} isInline>
            <Button color="red.600" onClick={onDelete}>
              Delete
            </Button>
            <Flex align="end">
              <Link to="/leagues">
                <Button>Leagues</Button>
              </Link>
            </Flex>
            <Link to={`/leagues/${id}/new-event`}>
              <Button>Add new event</Button>
            </Link>
          </Stack>
        </Flex>
      </Flex>

      <hr />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : league ? (
        <Stack>
          <Text fontSize="30px" textDecoration="underline rgb(248, 136, 61)">
            Place: {league.place}
          </Text>
          <List listStyleType="'🎾 '">
            {league.events?.map((event) => (
              <ListItem>
                <Link to={`/leagues/${id}/event/${event.id}`}>Edit</Link>
                <Flex>
                  <Box bg="#FBD38D" marginBottom="2" width="40%" borderRadius="5px">
                    {event.name} [{event.a} : {event.b}] ={">"} ({event.score})
                  </Box>
                  <Box>
                    {scoreLoading.includes(event.id) ? (
                      <Spinner />
                    ) : Object.keys(scoreError).includes(event.id) ? (
                      <Text color="red.600">{scoreError[event.id]}</Text>
                    ) : (
                      event.score === undefined && (
                        <>
                          <Button onClick={addScore(event.id)}>
                            {event.id === addId ? "Hide score" : "Show score"}
                          </Button>
                          {event.id === addId && (
                            <form onSubmit={onSubmit(event.id)}>
                              <FormControl>
                                <Input
                                  onChange={(e): void => setValue(e.target.value)}
                                  value={value}
                                />
                              </FormControl>
                              <Button type="submit">Add</Button>
                            </form>
                          )}
                        </>
                      )
                    )}
                  </Box>
                </Flex>
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
