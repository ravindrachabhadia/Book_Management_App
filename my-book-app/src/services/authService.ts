import axios from 'axios'; // Ensure AxiosError is imported if not already

// Define the base URL of your backend API
// Make sure this matches where your backend is running (port 5000 based on previous logs)
const API_URL = 'http://localhost:5000/api/auth'; 

// --- Login ---

// Interface for the expected Login Response
interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Function to handle user login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed. Please check credentials.');
    } else {
      throw new Error('Login failed due to a network or server issue.');
    }
  }
};


// --- Registration ---

// Interface for the expected Register Response (same as LoginResponse)
interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Function to handle user registration
export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, { // Use the /register endpoint [cite: uploaded:src/routes/auth.routes.ts]
      name,
      email,
      password,
    });
    return response.data; // Return response data [cite: uploaded:src/controllers/auth.controller.ts]
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed.');
    } else {
      throw new Error('Registration failed due to a network or server issue.');
    }
  }
};