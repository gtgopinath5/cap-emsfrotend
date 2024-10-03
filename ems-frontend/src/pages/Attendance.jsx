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
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; 
import * as Yup from "yup";
import useShowToast from "../hooks/useShowToast";

const Attendance = () => {
  const showToast = useShowToast();

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
        const res = await fetch("https://cap-emsbackend-1.onrender.com/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "An error occurred");
        }

        showToast("success", "Attendance marked successfully!", "success");
        resetForm();
        localStorage.setItem("Attendance", JSON.stringify(data));
      } catch (error) {
        showToast("error", error.message, "error");
      }
    },
  });

  return (
    <Box
      maxW="md"
      mx="auto"
      bg={useColorModeValue("white", "gray.700")}
      p={6}
      rounded="lg"
      shadow="lg"
      mt={10}
      borderWidth={1}
      borderColor={useColorModeValue("gray.200", "gray.600")}
    >
      <Heading mb={4} fontSize="2xl" textAlign="center">
        Mark Attendance
      </Heading>
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
              variant="outline"
              focusBorderColor="blue.500"
              isRequired
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
              variant="outline"
              focusBorderColor="blue.500"
              isRequired
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
              variant="outline"
              focusBorderColor="blue.500"
              isRequired
            />
            <FormErrorMessage>{formik.errors.shift}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" mt={4}>
            Submit
          </Button>

          <Text textAlign="center" mt={4}>
            Get Back To Dashboard?{" "}
            <ChakraLink as={Link} to="/" color="blue.500" fontWeight="bold">
              Dashboard
            </ChakraLink>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Attendance;
