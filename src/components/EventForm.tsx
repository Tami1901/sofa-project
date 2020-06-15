import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  Stack,
  Input,
  Button,
  Text,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/core";

export interface EventFormData {
  name: string;
  a: string;
  b: string;
  score?: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  loading: boolean;
  error?: string;
  initState?: EventFormData;
  buttonText: string;
  edit?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  loading,
  error,
  initState = {},
  buttonText,
  edit
}) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isReadOnly={loading}>
        <Stack spacing={2}>
          <InputGroup>
            <InputLeftAddon children="Name" minWidth="95px" />
            <Input
              type="text"
              isRequired
              placeholder="Event name"
              name="name"
              ref={register}
              defaultValue={initState.name}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Player 1" minWidth="95px" />
            <Input
              type="text"
              isRequired
              placeholder="Player 1"
              name="a"
              ref={register}
              defaultValue={initState.a}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Player 2" minWidth="95px" />
            <Input
              type="text"
              isRequired
              placeholder="Player 2"
              name="b"
              ref={register}
              defaultValue={initState.b}
            />
          </InputGroup>
          {edit && initState.score && (
            <InputGroup>
              <InputLeftAddon children="Score" minWidth="95px" />
              <Input
                type="text"
                isRequired
                placeholder="Score"
                name="score"
                ref={register}
                defaultValue={initState.score}
              />
            </InputGroup>
          )}
          {error && <Text color="red.600">{error}</Text>}
          <Button type="submit" isLoading={loading} mt={2}>
            {buttonText}
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
};

export default EventForm;
