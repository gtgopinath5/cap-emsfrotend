import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Button,
  useToast,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StatusPage = () => {
  const [leaveApplication, setLeaveApplication] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const toast = useToast();

  // Retrieve data from localStorage when the component mounts
  useEffect(() => {
    const leaveData = JSON.parse(localStorage.getItem("leave-application"));
    const attendanceData = JSON.parse(localStorage.getItem("Attendance"));

    setLeaveApplication(leaveData);
    setAttendance(attendanceData);

    // Display a toast message if data is found
    if (leaveData || attendanceData) {
      toast({
        title: "Data Loaded",
        description: "Leave application and attendance data retrieved successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  return (
    <Box
      maxW="md"
      mx="auto"
      bg={useColorModeValue("white", "gray.700")}
      p={6}
      rounded="md"
      shadow="md"
      mt={10}
    >
      <Heading mb={4} textAlign="center" fontSize="2xl" color="teal.600">
        Status Page
      </Heading>
      <VStack spacing={6}>
        {/* Display Leave Application Details */}
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" width="100%">
          <Heading size="md" mb={2} color="blue.500">
            Leave Application
          </Heading>
          {leaveApplication ? (
            <Box>
              <Text>
                <strong>Leave Type:</strong> {leaveApplication.leaveType}
              </Text>
              <Text>
                <strong>Start Date:</strong> {leaveApplication.startDate}
              </Text>
              <Text>
                <strong>End Date:</strong> {leaveApplication.endDate}
              </Text>
              <Text>
                <strong>Reason:</strong> {leaveApplication.reason}
              </Text>
            </Box>
          ) : (
            <Text>No Leave Application Submitted</Text>
          )}
        </Box>

        <Divider />

        {/* Display Attendance Details */}
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" width="100%">
          <Heading size="md" mb={2} color="blue.500">
            Attendance
          </Heading>
          {attendance ? (
            <Box>
              <Text>
                <strong>Date:</strong> {attendance.date}
              </Text>
              <Text>
                <strong>Status:</strong> {attendance.status}
              </Text>
            </Box>
          ) : (
            <Text>No Attendance Data Submitted</Text>
          )}
        </Box>

        <Button colorScheme="teal" mt={4}>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </VStack>
    </Box>
  );
};

export default StatusPage;
