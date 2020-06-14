import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import {
  Link as ChakraLink,
  Button,
  ButtonProps,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/core";

type LinkProps = RouterLinkProps & ChakraLinkProps;

const Link: React.FC<LinkProps> = React.forwardRef((props: LinkProps) => {
  return <ChakraLink as={RouterLink as any} {...props} />;
});

type LinkButtonProps = RouterLinkProps & ButtonProps & { as?: React.ElementType | RouterLink };

const LinkButton: React.FC<LinkButtonProps> = React.forwardRef((props: LinkButtonProps) => {
  return <Button as={RouterLink} {...props} />;
});

export default Link;
export { LinkButton };
