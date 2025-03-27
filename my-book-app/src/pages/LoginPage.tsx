import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../services/authService'; // Import the login service function
import { useAuth } from '../context/AuthContext'; // Add this import
// At the top of src/pages/LoginPage.tsx
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core'; 
// Also keep other imports like React, useState, Link, useNavigate, useAuth, loginUser
const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth(); // Add this line
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call the loginUser service function
      const response = await loginUser(email, password);

      console.log('Login successful:', response); // Log success response

      // --- Authentication Handling ---
      // 1. Store the token (e.g., in localStorage)
      localStorage.setItem('authToken', response.token); 
      // Note: We'll need a more robust way to manage auth state later (e.g., Context)

      // 2. TODO: Update global authentication state (e.g., using Context)
      login(response.token);
      // 3. Redirect to the main page
      navigate('/'); // Redirect to BookListPage (or dashboard)

    } catch (err: unknown) { // <--- Change 'any' to 'unknown'
      console.error('Operation failed:', err); // Keep logging the raw error for debugging
  
      // Determine the error message safely
      let message = 'An unexpected error occurred.'; // Default message
      if (err instanceof Error) {
          // If it's an Error object, use its message property
          message = err.message; 
      } else if (typeof err === 'string') {
          // If the caught value is just a string, use it directly
          message = err;
      } 
      // Add more checks here if errors could be other types
  
      setError(message); // Update the error state with the determined message
  
      // Make sure to reset loading state if applicable within the catch block
      if (typeof setIsLoading === 'function') { // Check if setIsLoading exists
           setIsLoading(false);
      }
  } finally {
      // Ensure loading state is turned off regardless of success or failure
      setIsLoading(false); 
    }
  };

  // Replace the existing return statement in LoginPage.tsx

 return (
    // Use Mantine Container for centering and padding
    <Container size="xs" px="xs" style={{ marginTop: '50px' }}> 
        {/* Use Paper for a card-like background */}
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {/* Use Mantine Title */}
            <Title order={2} ta="center" mb="xl">
                Login
            </Title>

            <form onSubmit={handleSubmit}>
                {/* Use Mantine TextInput */}
                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    required
                    id="email" // Keep id for label htmlFor if using Mantine Label component explicitly
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    error={error && error.includes('email') ? error : null} // Example conditional error
                    disabled={isLoading}
                    mb="md" // Add margin bottom
                />

                {/* Use Mantine PasswordInput */}
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    error={error && !error.includes('email') ? error : null} // Example conditional error
                    disabled={isLoading}
                    mb="lg" // Add larger margin bottom
                />

                {/* Display general errors */}
                {error && !error.includes('email') && !error.includes('password') && (
                     <Text c="red" size="sm" ta="center" mb="md">{error}</Text>
                )}

                {/* Use Mantine Button */}
                <Button type="submit" loading={isLoading} fullWidth mt="xl">
                    Login
                </Button>
            </form>

            <Text c="dimmed" size="sm" ta="center" mt="lg">
                Don't have an account?{' '}
                <Link to="/register">Register</Link>
            </Text>
        </Paper>
    </Container>
);
};

export default LoginPage;