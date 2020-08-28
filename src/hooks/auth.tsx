// Hook de Contexto para mostrar/prover os dados do usuário logado na aplicação
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(creditials: SignInCredentials): Promise<void>;
  updateUser(user: User): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  // AsyncStorage
  useEffect(() => {
    // Criar um AsyncStorage (descomentar esse código p/ ir direto para a home)
    const token = 'c72b7c32037a4082062c1c6b566296c1';
    const user = {
      id: '1',
      name: 'Nelson dos Santos Mandela',
      email: 'nelson@africa.com',
      avatarUrl:
        'https://www.estudarfora.org.br/app/uploads/2018/07/Nelson-Mandela-em-Harvard-1.jpg',
    };

    // setData({ token, user });
    setLoading(false);
  }, []);

  // Login
  const signIn = useCallback(async ({ email, password }) => {
    const token = 'c72b7c32037a4082062c1c6b566296c1';
    const user = {
      id: '1',
      name: 'Nelson dos Santos Mandela',
      email: 'nelson@africa.com',
      avatarUrl:
        'https://www.estudarfora.org.br/app/uploads/2018/07/Nelson-Mandela-em-Harvard-1.jpg',
    };

    setData({ token, user });
    setLoading(false);
  }, []);

  // Atualiza os dados do usuário
  const updateUser = useCallback(
    async (user: User) => {
      const token = 'c72b7c32037a4082062c1c6b566296c1';

      setData({
        token,
        user,
      });
    },
    [setData],
  );

  // Logout
  const signOut = useCallback(async () => {
    // Removendo da variável:
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, updateUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Criando hook de autenticação
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
