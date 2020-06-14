import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Heading,
  Spinner,
  Text,
  Link as ChakraLink,
  List,
  ListItem,
  Button,
  FormControl,
  Input
} from "@chakra-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";

import useThunkDispatch from "../hooks/useThunkDispatch";
import { AppStoreState } from "../lib/reducer";
import { fetchLeague, updateEvent, deleteLeague } from "../reducers/leagues";

const League: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [addId, setAddId] = useState<string | undefined>();
  const [value, setValue] = useState<string | undefined>();

  const dispatch = useThunkDispatch();
  const { loading, error, league, token, scoreState } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    league: store.leagues.leagues.find((l) => l.id === id) || undefined,
    token: store.login.token,
    scoreState: store.leagues.updateEvent
  }));

  const { loading: scoreLoading, error: scoreError } = scoreState;

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
      <Heading>{loading ? "Loading..." : error || !league ? "Error..." : league.name}</Heading>
      <Stack spacing={3} isInline>
        <ChakraLink>
          <Link to="/leagues">Leagues</Link>
        </ChakraLink>
        <ChakraLink>
          <Link to={`/leagues/${id}/edit`}>Edit</Link>
        </ChakraLink>
        <ChakraLink>
          <Link to={`/leagues/${id}/new-event`}>Add new event</Link>
        </ChakraLink>
        <Button color="red.600" onClick={onDelete}>
          Delete
        </Button>
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
                <Link to={`/leagues/${id}/event/${event.id}`}>Edit</Link>
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
                            <Input onChange={(e): void => setValue(e.target.value)} value={value} />
                          </FormControl>
                          <Button type="submit">Add</Button>
                        </form>
                      )}
                    </>
                  )
                )}
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
