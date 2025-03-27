import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
// Import Mantine components
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Alert } from '@mantine/core'; 
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'; // Optional: Icons for alerts

const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await registerUser(name, email, password);
      console.log('Registration successful:', response);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); 
      }, 1500); 
    } catch (err: any) {
      console.error('Registration failed:', err.message);
      setError(err.message || 'An unexpected error occurred during registration.');
      setIsLoading(false); 
    } 
  };

  return (
    <Container size="xs" px="xs" style={{ marginTop: '50px' }}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mb="xl">
          Register
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            disabled={isLoading}
            mb="md"
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            type="email" // Ensure email type validation
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            disabled={isLoading}
            mb="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            error={password && password.length < 6 ? 'Password must be at least 6 characters' : null} // Example validation
            disabled={isLoading}
            mb="lg"
          />

          {/* Display Success/Error Messages using Mantine Alert */}
          {error && (
            <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" withCloseButton onClose={() => setError(null)} mb="md">
              {error}
            </Alert>
          )}
          {successMessage && (
             <Alert icon={<IconCheck size="1rem" />} title="Success" color="green" mb="md">
               {successMessage}
             </Alert>
          )}
          
          <Button type="submit" loading={isLoading} fullWidth mt="xl">
            Register
          </Button>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt="lg">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </Text>
      </Paper>
    </Container>
  );
};

export default RegisterPage;