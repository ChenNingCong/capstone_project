import {useState} from 'react';
// import ReactPlayer from 'react-player';
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import NumberInput from './SeedButton.tsx';
import axios from "axios";
import {useAuth} from "../auth/auth.tsx";
import {Navigate} from "react-router-dom";
// const API_SERVER_URL= import.meta.env.VITE_API_SERVER_URL
// Simulated function to fetch image URLs from the server
// function getVideoUrl(index : number){
//     const seed = Math.max(0, index)
//     return `${API_SERVER_URL}/api/video-generate/random/${seed}`
// };
const API_SERVER_URL= import.meta.env.VITE_API_SERVER_URL
const QueueImageGenerator = () => {
    const [videoType, setVideoType] = useState("random");
    const [seed, setSeed] = useState<number>(0);
    const user = useAuth().user;
    if (user == null) {
        return <Navigate to="/login" replace={true} />
    }
    const token = user.token;
    function handleClick() {
        const options = {
            method: "post",
            url: API_SERVER_URL+`/api/video-generate/${videoType}/${seed}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios(options).then(r => {
            console.log(r);
        }).catch(e => {console.log(e);alert(e.message)});
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <FormControl fullWidth style={{width: "60%"}}>
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
                style={{width: "60%"}}
            />
            <p style={{width:"70%"}}>Click the button to generate (may take several seconds):</p>
            <Button variant="outlined" href="#outlined-buttons" onClick={handleClick}>
                Generate
            </Button>
        </div>


    );
};

export default QueueImageGenerator;