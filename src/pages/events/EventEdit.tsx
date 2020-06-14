import React, { useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, updateEvent } from "../../reducers/leagues";
import EventForm from "../../components/EventForm";
import Link from "../../components/Link";

const EventEdit: React.FC = () => {
  const { id, eventId } = useParams();
  const history = useHistory();

  const dispatch = useThunkDispatch();

  const { loading, error, event, token, update } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    event: (store.leagues.leagues.find((l) => l.id === id) || { events: [] }).events.find(
      (e) => e.id === eventId
    ),
    token: store.login.token,
    update: store.leagues.update
  }));

  const { loading: updateLoading, error: updateError } = update;

  useEffect(() => {
    dispatch(fetchLeague(token, id, !!event));
  }, [dispatch]);

  const onSubmit = (data): void => {
    dispatch(updateEvent(token, id, eventId, data)).then((ok) => {
      if (ok) {
        history.push(`/leagues/${id}`);
      }
    });
  };

  return (
    <Stack p={3}>
      <Heading>
        {loading ? "Loading..." : error || !event ? "Error..." : `Edit: ${event.name}`}
      </Heading>
      <Link to={`/leagues/${id}`}>League</Link>
      <EventForm
        onSubmit={onSubmit}
        error={updateError[id]}
        loading={updateLoading.includes(id)}
        initState={event}
        buttonText="Update"
      />
    </Stack>
  );
};

export default EventEdit;
