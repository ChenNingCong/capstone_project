import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import {useAuth} from "./auth/auth.tsx";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useAuth();
    const user = authContext.user;
    const login = authContext.login;
    const navigate = useNavigate();
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(email, password);
        console.log('Login attempt with:', { email, password });
    };
    if (user != null) {
        return (<Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Welcome, {user.email}!
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                    You have successfully logged in.
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={authContext.logout}
                        sx={{ mr: 2 }}
                    >
                        Logout
                    </Button>
                    <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="secondary"
                        onClick={()=>navigate("/")}
                    >
                        Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;