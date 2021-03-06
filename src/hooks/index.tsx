import React from 'react';
import { AuthProvider } from './modules/AuthContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
