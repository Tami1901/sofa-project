import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Stack,
  Flex,
  Heading,
  Spinner,
  IconButton,
  Tag,
  Box,
  Input,
  Text,
  Button
} from "@chakra-ui/core";
import { AppStoreState } from "../lib/reducer";
import { IEvent } from "../reducers/leagues/types";
import useToggle from "../hooks/useToggle";
import { LinkIconButton } from "./Link";

interface EventCardProps {
  lId: string;
  event: IEvent;
  addScore: ({ score: string }) => Promise<boolean>;
  remove: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ lId, event, addScore, remove }) => {
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
            event.score !== undefined && `: [ ${event.score} ]`
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
              <Input type="text" name="score" isRequired ref={register} placeholder="Score" />
              <Button type="submit">Add Score</Button>
            </Stack>
          </form>
        </Box>
      )}
    </Stack>
  );
};

export default EventCard;
