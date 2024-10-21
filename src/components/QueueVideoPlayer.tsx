import { useState } from 'react';
// import ReactPlayer from 'react-player';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NumberInput from './SeedButton.tsx';
import axios from "axios";
import { useAuth } from "../auth/auth.tsx";
import { Navigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';

const API_SERVER_URL= import.meta.env.VITE_API_SERVER_URL
function getVideoUrl(path : string){
    return `${API_SERVER_URL}/${path}`
};

const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const QueueImageGenerator = () => {
    const [videoType, setVideoType] = useState("random");
    const [seed, setSeed] = useState<number>(0);
    
    async function fetchData() {
        const options = {
            method: "post",
            url: API_SERVER_URL + `/api/video-generate/${videoType}/${seed}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        const result = await axios(options)
        return result.data["path"]
    }

    const { data, error, isLoading, isError, refetch } = useQuery('video', fetchData, {
        enabled: false, // This prevents the query from running automatically
    });
    

    const user = useAuth().user;

    if (user == null) {
        return <Navigate to="/login" replace={true} />
    }
    const token = user.token;
   

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormControl fullWidth style={{ width: "60%" }}>
                <InputLabel id="demo-simple-select-label">type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={videoType}
                    onChange={(event: SelectChangeEvent) => {
                        setVideoType(event.target.value as string)
                    }}
                >
                    <MenuItem value={"random"}>random</MenuItem>
                    <MenuItem value={"cloud"}>cloud</MenuItem>
                    <MenuItem value={"maze"}>maze</MenuItem>
                </Select>
            </FormControl>
            <p>Enter the seed for video generation:</p>
            <NumberInput
                aria-label="Demo number input"
                placeholder="Enter a seed number..."
                onChange={(_, val) => val != null && setSeed(val)}
                style={{ width: "60%" }}
            />
            <p style={{ width: "70%" }}>Click the button to generate (may take several seconds):</p>
            <Button variant="outlined" href="#outlined-buttons" onClick={() => refetch()} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Generate'}
            </Button>
            <div className="p-4">
                {isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
                {data && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Data:</h2>
                        <pre className="bg-gray-100 p-2 rounded mt-2">{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
            {isLoading || <ReactPlayer
                controls={true}
                url={getVideoUrl(data)}
            />}
        </div>


    );
};

export default QueueImageGenerator;