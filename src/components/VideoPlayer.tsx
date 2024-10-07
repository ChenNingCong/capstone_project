import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

// Simulated function to fetch image URLs from the server
function getVideoUrl(index : number){
    const seed = Math.max(0, index)
    return `http://0.0.0.0:8080/api/video-generate/random/${seed}`
};

const ImageGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoType, setVideoType] = useState("random");
    useEffect(() => {
        const handleKeyPress = (event : KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setCurrentIndex(prev => prev + 1);
            } else if (event.key === 'ArrowLeft') {
                setCurrentIndex(prev => Math.max(0, prev - 1));
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Prefetch next image
    // useEffect(() => {
    //     queryClient.prefetchQuery(['image', currentIndex + 1], () => fetchImageUrl(currentIndex + 1));
    // }, [currentIndex, queryClient]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div>
                <div className="relative">
                    <FormControl fullWidth>
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
                    <p className="mt-4 text-lg font-semibold">Video with seed {currentIndex + 1}</p>
                    <p className="mt-2 text-sm text-gray-600">Use arrow keys or buttons to navigate</p>
                    <button
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24}/>
                    </button>
                    <button
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24}/>
                    </button>
                </div>

            </div>
            <ReactPlayer
                controls={true}
                url={getVideoUrl(currentIndex)}
            />
        </div>
    );
};

export default ImageGallery;