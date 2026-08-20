import { Navigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';

export default function ProtectedRoute({ children }) {
  const { state } = useAppState();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
