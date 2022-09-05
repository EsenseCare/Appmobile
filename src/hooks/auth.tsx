import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import api, { authService } from '../services/api';
import jwtDecode, * as jwt_decode from 'jwt-decode'
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    token: string
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
                Alert.alert("Verifique sua conexão com a internet");
                return setIsConnected(false);
            }
        });
        setIsConnected(true);
    }

    async function signIn({email, password}: SignInCredentials): Promise<User>{
        checkConnection();

        const response = await authService.authenticate({email, password});

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
            checkConnection();
            let loginDate = new Date();

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
            
            let validToken = token[1];

            const decoded : any = jwtDecode(validToken);
            console.log("decoded", decoded);

            if (token && decoded.exp < loginDate.getDate() / 1000) {
                signOut();
                return;
            }

            //api.defaults.headers['Authorization'] = validToken;

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