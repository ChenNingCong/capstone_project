import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import VideoPlayer from "./components/VideoPlayer.tsx";
const queryClient = new QueryClient()
function Home() {
    return <>
        <h1>Video Generator</h1>
        <VideoPlayer/>
    </>
}

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <Home />
      </QueryClientProvider>
  )
}

export default App
