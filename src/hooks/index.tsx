import React from 'react';
import { AuthProvider } from './auth';

// Componente global de providres (contexto)
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
