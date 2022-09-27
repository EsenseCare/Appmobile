import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import api, { authService } from '../services/api';
import jwtDecode, * as jwt_decode from 'jwt-decode';
import NetInfo from "@react-native-community/netinfo";

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    token: string;
    name: string;
    email: string;
}

interface AuthContextData {
 user: User | null;
 loading: boolean;
 isConnected: boolean;
 signIn: (credentials: SignInCredentials) => Promise<User>;
 signOut: () => void;
}

interface SignInCredentials {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : AuthProviderProps){
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            '@esenseCare:token',
            '@esenseCare:user'
        ]);
    
        setUserData(null);
        
    }, []);

    const checkConnection = () => {
        NetInfo.fetch().then((state) => {
            if(state.isConnected === false){
                return setIsConnected(false);
            }
        });
        setIsConnected(true);
    }

    async function signIn({email, password}: SignInCredentials): Promise<User>{
        //todo: login via digital
        checkConnection();

        const response = await authService.authenticate({email, password});

        const auth = response.data;

        await AsyncStorage.multiSet([
            ['@esenseCare:token', auth.content.token],
            ['@esenseCare:user', JSON.stringify(auth.content.user)],
        ]);

        setUserData({
            email: auth.content.user.email,
            name: auth.content.user.nome,
            token: auth.content.token
        });

        api.interceptors.request.use((config) => {
            if (config && config.headers) {
               config.headers.Authorization = auth.content.token
            }
            return config;
        });
    
        setLoading(false);

        return auth;
    }

    useEffect(() => {
        async function loadStoragedData(): Promise<void> {
            //todo: salvar dados do usuário mesmo se não tiver rede disponivel
            checkConnection();
           
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
            };          
            
            let validToken = token[1];

            const decoded : any = jwtDecode(validToken);

            const now = new Date();
            const expirationDate = new Date(Number(decoded.exp * 1000))

            // todo: ver erro
            if (token && now > expirationDate) {
                setLoading(false);  
                signOut();
                return;
            }

            api.interceptors.request.use((config) => {
                if (config && config.headers) {
                   config.headers.Authorization = validToken
                }
                return config;
            });

           const userFormatted = JSON.parse(user[1]); 
            
            setUserData({
                token: validToken,
                name: userFormatted.nome,
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
            isConnected,
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