import {
  Container,
  Flex,
  VStack,
  Image,
  Button,
  Heading
} from "@chakra-ui/react";
import { TwitchIcon, YoutubeIcon } from "@assets/icons";
import { authenticate } from "../../api/auth";

const Login = (): JSX.Element => {
  const handleAuthTwitch = (): void => {
    authenticate("twitch");
  };

  const handleAuthYoutube = (): void => {
    authenticate("youtube");
  };

  return (
    <Flex w="100vw" h="100vh" bg="ui.dark3" align="center">
      <Container centerContent>
        <Image src="/hub/assets/img/logo/logo.svg" alt="SLNT.stream" h="96px" />
        <Heading size="lg" color="white" my={8}>
          Login or sign up
        </Heading>

        <VStack spacing={6} bg="ui.dark2" w="full" p={6} borderRadius="xl">
          <Button
            colorScheme="twitch"
            leftIcon={<TwitchIcon />}
            onClick={handleAuthTwitch}
            isFullWidth
          >
            Continue with Twitch
          </Button>

          <Button
            colorScheme="youtube"
            leftIcon={<YoutubeIcon />}
            onClick={handleAuthYoutube}
            isFullWidth
          >
            Continue with Youtube
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Login;
