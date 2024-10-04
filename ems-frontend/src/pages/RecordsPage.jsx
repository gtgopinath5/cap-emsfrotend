import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Link as ChakraLink,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useShowToast from "../hooks/useShowToast";

const RecordsPage = () => {
  const showToast = useShowToast();
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("user-details");

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const res = await fetch("https://cap-emsbackend-1.onrender.com/api/leaveapplications", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch leave applications");
        }
        setLeaveApplications(data);
        setError(""); // Reset error if fetch is successful
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAttendanceRecords = async () => {
      try {
        const res = await fetch("https://cap-emsbackend-1.onrender.com/api/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch attendance records");
        }
        setAttendanceRecords(data);
        setError(""); // Reset error if fetch is successful
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchLeaveApplications(), fetchAttendanceRecords()]);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={8}
      bg={useColorModeValue( 'white',"gray.800")}
      rounded="lg"
      shadow="2xl"
      mt={10}
    >
      <Heading
        mb={6}
        textAlign="center"
        color={useColorModeValue("teal.500", "teal.300")}
        fontWeight="extrabold"
      >
        Records
      </Heading>
      <Divider mb={6} />

      {error && (
        <Alert status="error" mb={6} rounded="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Stack spacing={8}>
        <Box>
          <Heading size="md" mb={4} color="teal.400">
            Leave Applications
          </Heading>
          <Table variant="striped" colorScheme="teal" size="md">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Reason</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaveApplications.map((application) => (
                <Tr key={application.id}>
                  <Td>{application.leaveType}</Td>
                  <Td>{new Date(application.startDate).toLocaleDateString()}</Td>
                  <Td>{new Date(application.endDate).toLocaleDateString()}</Td>
                  <Td>{application.reason}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Divider my={6} />

        <Box>
          <Heading size="md" mb={4} color="teal.400">
            Attendance Records
          </Heading>
          <Table variant="striped" colorScheme="teal" size="md">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Shift</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attendanceRecords.map((record) => (
                <Tr key={record.id}>
                  <Td>{new Date(record.date).toLocaleDateString()}</Td>
                  <Td>{record.status}</Td>
                  <Td>{record.shift}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>

      <Flex justify="center" mt={8}>
        <Button colorScheme="teal" size="lg" leftIcon={<ArrowBackIcon />}>
          <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
            Back to Dashboard
          </ChakraLink>
        </Button>
      </Flex>
    </Box>
  );
};

export default RecordsPage;
