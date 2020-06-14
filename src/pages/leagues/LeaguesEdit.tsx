import React, { useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import LeagueForm from "../../components/LeagueForm";
import useThunkDispatch from "../../hooks/useThunkDispatch";
import { AppStoreState } from "../../lib/reducer";
import { fetchLeague, updateLeague } from "../../reducers/leagues";

const LeagueEdit: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useThunkDispatch();

  const { loading, error, league, token, update } = useSelector((store: AppStoreState) => ({
    loading: store.leagues.loading,
    error: store.leagues.error,
    league: store.leagues.leagues.find((l) => l.id === id) || undefined,
    token: store.login.token,
    update: store.leagues.update
  }));

  const { loading: updateLoading, error: updateError } = update;

  useEffect(() => {
    dispatch(fetchLeague(token, id, !!league));
  }, [dispatch]);

  const onSubmit = (data): void => {
    dispatch(updateLeague(token, id, data)).then((ok) => {
      if (ok) {
        history.push(`/leagues/${id}`);
      }
    });
  };

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Heading>
        {loading ? "Loading..." : error || !league ? "Error..." : `Edit: ${league.name}`}
      </Heading>
      <LeagueForm
        onSubmit={onSubmit}
        error={updateError[id]}
        loading={updateLoading.includes(id)}
        initState={league}
        buttonText="Update"
      />
    </Stack>
  );
};

export default LeagueEdit;
