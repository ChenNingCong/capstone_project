import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import VideoPlayer from "./components/VideoPlayer.tsx";
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import Login from "./Login.tsx";
import {AuthProvider, useAuth} from "./auth/auth.tsx";
import QueueImageGenerator from "./components/QueueVideoPlayer.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : '/queue',
        element : <>
            <h1>Video Generator</h1>
            <QueueImageGenerator/>
        </>
    }
]);

const queryClient = new QueryClient()
function Home() {
    const authContext = useAuth();
    if (authContext.user == null) {
        return <Navigate to="/login" replace={true} />
    }
    return <>
        <h1>Video Generator</h1>
        <VideoPlayer/>
    </>
}

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider><RouterProvider router={router} /></AuthProvider>
      </QueryClientProvider>
  )
}

export default App
