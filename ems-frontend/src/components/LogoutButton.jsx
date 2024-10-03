import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      const res = await fetch('https://cap-emsbackend-1.onrender.com/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check for HTTP errors
      if (!res.ok) {
        const errorData = await res.json();
        showToast('error', errorData.error || 'Logout failed', 'error');
        return;
      }

      // Clear user data from localStorage
      localStorage.removeItem('user-details');
      localStorage.removeItem('leave-application');
      localStorage.removeItem('Attendance');
      localStorage.removeItem('user-profile');
      setUser(null); // Reset user state
      showToast('success', 'Logged out successfully', 'success');
    } catch (error) {
      showToast('error', error.message, 'error');
    }
  };

  return (
    <Button
      position="fixed"
      top="30px"
      right="30px"
      size="sm"
      colorScheme="cyan"
      onClick={handleLogout}
      leftIcon={<FiLogOut size={20} />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
