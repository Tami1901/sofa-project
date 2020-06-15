import React, { useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, updateEvent } from "../../reducers/leagues";
import EventForm from "../../components/EventForm";

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
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Heading>
        {loading ? "Loading..." : error || !event ? "Error..." : `Edit Event: ${event.name}`}
      </Heading>
      <EventForm
        onSubmit={onSubmit}
        error={updateError[id]}
        loading={updateLoading.includes(id)}
        initState={event}
        buttonText="Update"
        edit
      />
    </Stack>
  );
};

export default EventEdit;
