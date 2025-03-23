import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login/traveler" replace />;
  }

  if (!user.emailVerified) {
    // Redirect to email verification if email is not verified
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 