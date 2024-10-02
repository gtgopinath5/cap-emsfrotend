import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
    location: "",
  });
  const fileRef = useRef(null);
  const showToast = useShowToast();

  useEffect(() => {
    if (user) {
      setInputs({
        name: user.name,
        username: user.username,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("error", data.error, "error");
        return;
      }
      showToast("success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-profile", JSON.stringify(data));
    } catch (error) {
      showToast("error", error.message, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"} py={12}>
      <Box
        rounded={"lg"}
        boxShadow={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        maxW={"lg"}
        w={"full"}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          textAlign={"center"}
          mb={6}
        >
          Edit Your Profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="password"
                autoComplete="off"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"green.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "green.500",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
        <Text mt={4} textAlign={"center"}>
          Want to go back to Dashboard?{" "}
          <Link to="/" style={{ color: "#3182ce" }}>
            Dashboard
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
