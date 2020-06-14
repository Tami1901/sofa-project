import React, { useEffect } from "react";
import { Stack, Heading, Link as ChakraLink } from "@chakra-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppStoreState } from "../lib/reducer";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { fetchLeague, createEvent } from "../reducers/leagues";
import EventForm from "../components/EventForm";

const EventNew: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const { leagueName, token, loading, error } = useSelector((state: AppStoreState) => ({
    leagueName: state.leagues.leagues.find((l) => l.id === id)?.name,
    token: state.login.token,
    loading: state.leagues.addEvent.loading,
    error: state.leagues.addEvent.error
  }));

  useEffect(() => {
    if (!leagueName) {
      dispatch(fetchLeague(token, id, false)).then((ok) => {
        console.log(ok);
      });
    }
  }, [leagueName]);

  const onSubmit = (data): void => {
    dispatch(createEvent(token, id, data)).then((ok) => {
      if (ok) {
        history.push(`/leagues/${id}`);
      }
    });
  };

  return (
    <Stack p={3}>
      <Heading>Add new Event {leagueName && `to: ${leagueName}`}</Heading>
      <Stack spacing={3} isInline>
        <ChakraLink>
          <Link to={`/leagues/${id}`}>Back to League</Link>
        </ChakraLink>
      </Stack>
      <EventForm onSubmit={onSubmit} loading={loading} error={error} buttonText="Create" />
    </Stack>
  );
};

export default EventNew;
