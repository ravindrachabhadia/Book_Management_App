import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Import Mantine components for layout and styling
import { Group, Button, Title, Box } from '@mantine/core'; 
import { IconBook, IconPlus, IconLogin, IconUserPlus, IconLogout } from '@tabler/icons-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
  };

  return (
    // Use Box for basic header structure with padding and border bottom
    <Box component="header" py="sm" mb="xl" style={{ borderBottom: '1px solid #dee2e6' }}>
      {/* Use Group for horizontal layout */}
      <Group justify="space-between" align="center">
        {/* App Title/Logo - Link to home if logged in, login if not */}
        <Link to={isAuthenticated ? "/" : "/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Group gap="xs">
             <IconBook size={28} />
             <Title order={3}>Book Manager</Title>
          </Group>
        </Link>

        {/* Conditional Buttons based on auth state */}
        <Group gap="xs">
          {isAuthenticated ? (
            // --- Buttons shown when logged IN ---
            <>
              <Button 
                 variant="default" 
                 leftSection={<IconPlus size={14} />}
                 onClick={() => navigate('/add-book')}
              >
                Add Book
              </Button>
              <Button 
                 variant="outline" 
                 color="gray" 
                 onClick={handleLogout}
                 leftSection={<IconLogout size={14} />}
               >
                Logout
              </Button>
            </>
          ) : (
            // --- Buttons shown when logged OUT ---
            <>
              <Button 
                variant="default" 
                component={Link} // Use Link for navigation
                to="/login"
                leftSection={<IconLogin size={14} />}
               >
                Login
              </Button>
              <Button 
                 component={Link} // Use Link for navigation
                 to="/register"
                 leftSection={<IconUserPlus size={14} />}
              >
                Register
              </Button>
            </>
          )}
        </Group>
      </Group>
    </Box>
  );
};

export default Navbar;