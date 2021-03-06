import React from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import useThunkDispatch from "../../hooks/useThunkDispatch";
import { createLeague } from "../../reducers/leagues";
import { AppStoreState } from "../../lib/reducer";
import LeagueForm from "../../components/LeagueForm";

export interface NewLeagueData {
  name: string;
  place: string;
  type?: string;
}

const LeaguesNew: React.FC = () => {
  const history = useHistory();

  const { token, loading, error } = useSelector((store: AppStoreState) => ({
    token: store.login.token,
    loading: store.leagues.add.loading,
    error: store.leagues.add.error
  }));
  const dispatch = useThunkDispatch();

  const onSubmit = (data: NewLeagueData): void => {
    dispatch(createLeague(token, data)).then((id) => history.push(`/leagues/${id}`));
  };

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Heading>New League</Heading>
      <LeagueForm onSubmit={onSubmit} error={error} loading={loading} buttonText="Create" />
    </Stack>
  );
};

export default LeaguesNew;
