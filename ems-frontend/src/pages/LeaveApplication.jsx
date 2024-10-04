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
  Select,
  Textarea,
  useColorModeValue,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; // For navigation
import * as Yup from "yup";
import useShowToast from "../hooks/useShowToast"; // Ensure this hook is available

const LeaveApplication = () => {
  const showToast = useShowToast(); // Custom hook for showing toast notifications

  // Retrieve the token from localStorage
  const token = localStorage.getItem("user-details"); // Ensure "user-threads" is the correct key

  const formik = useFormik({
    initialValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
    validationSchema: Yup.object({
      leaveType: Yup.string().required("Leave type is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date cannot be before start date"),
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Ensure token is present
        if (!token) {
          showToast("error", "Authentication token is missing.", "error");
          return;
        }

        const res = await fetch("https://cap-emsbackend-1.onrender.com/api/leaveapplications", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify(values), // Send form data
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "An error occurred");
        }

        showToast("success", "Leave application submitted successfully!", "success");
        resetForm();
        localStorage.setItem("leaveapplication",data.token)
      } catch (error) {
        showToast("error", error.message, "error");
      }
    },
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
      <Heading mb={6} textAlign="center">Apply for Leave</Heading>
      <Divider mb={6} />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl
            id="leaveType"
            isInvalid={formik.touched.leaveType && Boolean(formik.errors.leaveType)}
          >
            <FormLabel>Leave Type</FormLabel>
            <Select
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Select leave type"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            >
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </Select>
            <FormErrorMessage>{formik.errors.leaveType}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="startDate"
            isInvalid={formik.touched.startDate && Boolean(formik.errors.startDate)}
          >
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.startDate}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="endDate"
            isInvalid={formik.touched.endDate && Boolean(formik.errors.endDate)}
          >
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.endDate}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="reason"
            isInvalid={formik.touched.reason && Boolean(formik.errors.reason)}
          >
            <FormLabel>Reason</FormLabel>
            <Textarea
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
            <FormErrorMessage>{formik.errors.reason}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit Leave Application
          </Button>
          <p style={{ textAlign: "center" }}>
            Back to Dashboard? <Link to="/" color="teal.500">Dashboard</Link>
          </p>
        </Stack>
      </form>
    </Box>
  );
};

export default LeaveApplication;
