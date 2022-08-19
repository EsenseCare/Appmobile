import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { authService } from '../services/api'

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    token: string
    name: string;
    email: string;
}

interface AuthContextData {
 user: User | null
 loading: boolean
 signIn: (credentials: SignInCredentials) => Promise<User>
 signOut: () => void
}

interface SignInCredentials {
    email: string;
    password: string;
}


const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : AuthProviderProps){
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            '@esenseCare:token',
            '@esenseCare:user'
        ]);

        console.log("saiu", userData);
    
        setUserData(null);
        
    }, []);

    async function signIn({email, password}: SignInCredentials): Promise<User>{
        // todo: verificar como deslogar o usuário automaticamente quando o token expirar
        const response = await authService.authenticate({email, password})

        const user = response.data;

        await AsyncStorage.multiSet([
            ['@esenseCare:token', user.content.token],
            ['@esenseCare:user', JSON.stringify(user)],
        ]);

        setUserData(user);
        
        console.log("user", user);

        return user;
    }

    useEffect(() => {
        async function loadStoragedData(): Promise<void> {
            //todo: salvar dados do usuário mesmos se não tiver rede disponivel
          const [
            token,
            user,
          ] = await AsyncStorage.multiGet([
            '@esenseCare:token',
            '@esenseCare:user'
          ]);
    
          if (!token[1] || !user[1]) {
            setLoading(false);
            signOut();
            return;
            }
    
            //api.defaults.headers = { 'x-access-token': token[1] };
            let validToken = token[1];

           const userFormatted = JSON.parse(user[1]);

            setUserData({
                token: validToken,
                name: userFormatted,
                email: userFormatted.email,
            });
    
            setLoading(false);      
        }
    
        loadStoragedData();
    }, [signOut]);

    
    return(
        <AuthContext.Provider value={{
            user: userData,
            loading,
            signIn, 
            signOut
        }}>
            {children}
        </AuthContext.Provider> 
    )
}

function useAuth(){
    const context = useContext(AuthContext); //criando o hook e inserindo o authContext 
    return context;
}

export { useAuth, AuthProvider }