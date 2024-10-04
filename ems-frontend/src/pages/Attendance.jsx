import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Divider,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useShowToast from "../hooks/useShowToast"; // Ensure this hook is available

const Attendance = () => {
  const showToast = useShowToast(); // Custom hook for showing toast notifications

  // Retrieve the token from localStorage
  const token = localStorage.getItem("user-details"); // Ensure "user-details" is the correct key

  const formik = useFormik({
    initialValues: {
      date: "",
      status: "",
      shift: "",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Required"),
      status: Yup.string()
        .oneOf(["present", "absent", "leave"], "Invalid status")
        .required("Required"),
      shift: Yup.string()
        .oneOf(["Day", "General", "Night"], "Invalid shift")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Ensure token is present
        if (!token) {
          showToast("error", "Authentication token is missing.", "error");
          return;
        }

        const res = await fetch("https://cap-emsbackend-1.onrender.com/api/attendance", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData = await res.json();  // Handle non-2xx responses
          throw new Error(errorData.error || "An error occurred");
        }

        const data = await res.json();  // Handle the successful response
        showToast("success", "Attendance marked successfully!", "success");
        resetForm();
        localStorage.setItem("Attendance", data.token);
      } catch (error) {
        showToast("error", error.message, "error");
      }
    }
  });

  return (
    <Box
      maxW="lg"
      mx="auto"
      bg={useColorModeValue("white", "gray.700")}
      p={8}
      rounded="md"
      shadow="lg"
      mt={10}
    >
      <Heading mb={6} textAlign="center">Mark Attendance</Heading>
      <Divider mb={6} />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl
            id="date"
            isInvalid={formik.touched.date && Boolean(formik.errors.date)}
          >
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="status"
            isInvalid={formik.touched.status && Boolean(formik.errors.status)}
          >
            <FormLabel>Status</FormLabel>
            <Input
              type="text"
              name="status"
              placeholder="present / absent / leave"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="shift"
            isInvalid={formik.touched.shift && Boolean(formik.errors.shift)}
          >
            <FormLabel>Shift</FormLabel>
            <Input
              type="text"
              name="shift"
              placeholder="Day / General / Night"
              value={formik.values.shift}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.shift}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit Attendance
          </Button>
          <Text textAlign="center" mt={4}>
            Back to Dashboard?{" "}
            <ChakraLink as={Link} to="/" color="teal.500" fontWeight="bold">
              Dashboard
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Attendance;
