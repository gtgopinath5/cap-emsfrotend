import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = ({ user }) => {
  return (
    <Box className="dashboard" position="relative" overflow="hidden" minHeight="100vh">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="rgba(0, 0, 0, 0.3)" // Darkened background for better contrast
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Heading className="dashboard__title" color="teal" mb={4} textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
          Dashboard
        </Heading>
        <Text className="dashboard__user-id" color="white" mb={6} textAlign="center" fontSize={{ base: "md", md: "lg" }}>
          ID: {user?._id || "Guest"}
        </Text>
        <nav className="dashboard__nav">
          <Stack spacing={4} align="center"> {/* Center alignment for buttons */}
            <Link to="/updateprofilepage">
              <Button
                colorScheme="gray"
                color="teal"
                variant="solid"
                size="lg"
                _hover={{ bg: "gray.600", transform: "scale(1.05)" }} // Hover effect
                transition="0.3s"
              >
                Profile
              </Button>
            </Link>
            <Link to="/leave-application">
              <Button
                colorScheme="gray"
                color="teal"
                variant="solid"
                size="lg"
                _hover={{ bg: "gray.600", transform: "scale(1.05)" }} // Hover effect
                transition="0.3s"
              >
                Leave Application
              </Button>
            </Link>
            <Link to="/attendance">
              <Button
                colorScheme="gray"
                color="teal"
                variant="solid"
                size="lg"
                _hover={{ bg: "gray.600", transform: "scale(1.05)" }} // Hover effect
                transition="0.3s"
              >
                Mark Attendance
              </Button>
            </Link>
            <Link to="/status-page">
              <Button
                colorScheme="gray"
                color="teal"
                variant="solid"
                size="lg"
                _hover={{ bg: "gray.600", transform: "scale(1.05)" }} // Hover effect
                transition="0.3s"
              >
                Status Page
              </Button>
            </Link>
          </Stack>
        </nav>
      </Box>
    </Box>
  );
};

export default HomePage;
