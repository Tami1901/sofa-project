import React, { useEffect } from "react";
import { Stack, Heading, Link as ChakraLink, FormControl, Input, Button } from "@chakra-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AppStoreState } from "../lib/reducer";
import useThunkDispatch from "../hooks/useThunkDispatch";
import { fetchLeague, createEvent } from "../reducers/leagues";

const EventNew: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const dispatch = useThunkDispatch();

  const { leagueName, token } = useSelector((state: AppStoreState) => ({
    leagueName: state.leagues.leagues.find((l) => l.id === id)?.name,
    token: state.login.token
  }));

  useEffect(() => {
    if (!leagueName) {
      dispatch(fetchLeague(token, id, false)).then((ok) => {
        console.log(ok);
      });
    }
  }, [leagueName, dispatch, id, token]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Stack spacing={2}>
            <Input type="text" isRequired placeholder="Event name" name="name" ref={register} />
            <Input type="text" isRequired placeholder="A" name="a" ref={register} />
            <Input type="text" isRequired placeholder="B" name="b" ref={register} />
          </Stack>
        </FormControl>
        <Button mt={3} type="submit">
          Add
        </Button>
      </form>
    </Stack>
  );
};

export default EventNew;
