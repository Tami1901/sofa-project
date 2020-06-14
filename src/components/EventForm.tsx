import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, Stack, Input, Button, Text } from "@chakra-ui/core";

export interface EventFormData {
  name: string;
  a: string;
  b: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  loading: boolean;
  error?: string;
  initState?: EventFormData;
  buttonText: string;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  loading,
  error,
  initState = {},
  buttonText
}) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Stack spacing={2}>
          <Input
            type="text"
            isRequired
            placeholder="Event name"
            name="name"
            ref={register}
            defaultValue={initState.name}
          />
          <Input
            type="text"
            isRequired
            placeholder="A"
            name="a"
            ref={register}
            defaultValue={initState.a}
          />
          <Input
            type="text"
            isRequired
            placeholder="B"
            name="b"
            ref={register}
            defaultValue={initState.b}
          />
        </Stack>
        {error && <Text color="red.600">{error}</Text>}
      </FormControl>
      <Button mt={3} type="submit" isLoading={loading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default EventForm;
