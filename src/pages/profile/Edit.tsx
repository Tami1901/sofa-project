import React from "react";
import {
  Stack,
  Text,
  Heading,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Button
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { AppStoreState } from "../../lib/reducer";
import { updateUser } from "../../reducers/login";
import useThunkDispatch from "../../hooks/useThunkDispatch";

const EditProfile: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const { user, loading, error, token } = useSelector((store: AppStoreState) => ({
    user: store.login.user,
    loading: store.login.loading,
    error: store.login.error,
    token: store.login.token
  }));

  const onSubmit = (data): void => {
    dispatch(updateUser(token, data)).then((ok) => {
      history.push("/user");
    });
  };

  return (
    <Stack p={3} w="90%" m="0 auto" spacing={4}>
      <Heading>Edit Profile</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isReadOnly={loading}>
          <Stack spacing={2}>
            <InputGroup>
              <InputLeftAddon children="First Name" minWidth="115px" />
              <Input
                type="text"
                isRequired
                roundedLeft="0"
                placeholder="First Name"
                name="firstName"
                defaultValue={user.firstName}
                ref={register}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Last Name" minWidth="115px" />
              <Input
                type="text"
                isRequired
                roundedLeft="0"
                placeholder="Last Name"
                name="lastName"
                defaultValue={user.lastName}
                ref={register}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Age" minWidth="115px" />
              <Input
                type="number"
                roundedLeft="0"
                placeholder="Age"
                name="age"
                defaultValue={user.age}
                ref={register}
              />
            </InputGroup>
            {error && <Text color="red.600">{error}</Text>}
            <Button type="submit" isLoading={loading} mt={2}>
              Update
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Stack>
  );
};

export default EditProfile;
