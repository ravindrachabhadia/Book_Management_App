import { Routes, Route } from 'react-router-dom';

// Import page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import NotFoundPage from './pages/NotFoundPage';

// Import layout/utility components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // <-- Import Navbar

function App() {
  return (
    <div>
      <Navbar /> {/* <-- Render Navbar here, outside Routes */}
      
      {/* Routes remain the same */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BookListPage />} /> 
          <Route path="/add-book" element={<AddBookPage />} /> 
          <Route path="/edit-book/:id" element={<EditBookPage />} /> 
        </Route>

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;