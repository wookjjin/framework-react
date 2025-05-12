
import './App.css'
import { Provider } from 'react-redux';

import Auth from './components/Auth';
import UserManagement from './components/UserManagement';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { store } from './store/store';

const AuthenticatedContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      <p>
        환영합니다, {user.email}님!
      </p>
      <UserManagement />
    </div>
  );
};

function App() {

  return (
      <Provider store={store}>
        <AuthProvider>
          <div>
            <h1>Login</h1>
            <AuthenticatedContent />
          </div>
      </AuthProvider>
    </Provider>
  )
}

export default App
