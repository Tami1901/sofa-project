import React from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Text
} from "@chakra-ui/core";
import { NewLeagueData } from "../pages/leagues/LeaguesNew";

interface LeagueFormProps {
  onSubmit: (data: NewLeagueData) => void;
  loading: boolean;
  error?: string;
  initState?: NewLeagueData;
  buttonText: string;
}

const LeagueForm: React.FC<LeagueFormProps> = ({
  onSubmit,
  loading,
  error,
  buttonText,
  initState = {}
}) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isReadOnly={loading}>
          <InputGroup>
            <InputLeftAddon children="Name" minWidth="80px" />
            <Input
              type="text"
              isRequired
              roundedLeft="0"
              placeholder="League name"
              name="name"
              defaultValue={initState.name}
              ref={register}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Place" minWidth="80px" />
            <Input
              type="text"
              isRequired
              roundedLeft="0"
              placeholder="Place name"
              name="place"
              defaultValue={initState.place}
              ref={register}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Type" minWidth="80px" />
            <Input
              type="text"
              roundedLeft="0"
              placeholder="Type league"
              name="type"
              defaultValue={initState.type}
              ref={register}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" isLoading={loading}>
          {buttonText}
        </Button>
        {error && <Text color="red.600">{error}</Text>}
      </Stack>
    </form>
  );
};

export default LeagueForm;
