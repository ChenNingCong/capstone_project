import React, {createContext, PropsWithChildren, useContext, useState} from 'react';
import axios from 'axios';
const API_SERVER_URL= import.meta.env.VITE_API_SERVER_URL
interface User {
    email: string;
    password : string;
    token : string;
}

interface AuthContextType {
    user: User | null;
    login: (username : string, password : string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});


const AuthProvider: React.FC = ({ children } : PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(() => {
        let user : User | null = null;
        try {
            const item = localStorage.getItem('login')
            if (item != null) {
                user = JSON.parse(item);
            }
        } finally { /* empty */ }
        return user
    });
    const login = (username : string, password : string) => {
        // Perform login logic here, e.g. API call
        const bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password );
        bodyFormData.append("grant_type", "password");
        const options = {
            method: "post",
            url: API_SERVER_URL+"/api/token",
            data: bodyFormData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
        axios(options).then(r => {
            const token = r.data.access_token as string;
            const newUser : User = {email : username, password : password, token : token};
            localStorage.setItem('login', JSON.stringify(newUser));
            setUser(newUser);
        }).catch(e => {console.log(e);alert(e.message)});
    };

    const logout = () => {
        localStorage.removeItem('login');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};

const useAuth = (): AuthContextType => useContext(AuthContext);

export { AuthProvider, useAuth };