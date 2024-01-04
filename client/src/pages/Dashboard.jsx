/* eslint-disable no-unused-vars */
// Desc: This file contains Dashboard page of the app
// where users can see ads, Stats and plant trees :)
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player';
import { QUERY_YOUTUBE } from '../utils/queries';
import { ADD_WATCHED_AD } from '../utils/mutations';
import moment from 'moment';

const Dashboard = ({ user }) => {
    const { loading, error, data } = useQuery(QUERY_YOUTUBE);
    const [addWatchedAd, { data: mutationData }] = useMutation(ADD_WATCHED_AD);
    console.log(mutationData);
    console.log(addWatchedAd);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        if (data && data.youtube && data.youtube.length > 0) {
            setCurrentVideo(data.youtube[0]);
        }
    }, [data]);

    const handleWatchVideo = () => {
        if (currentVideo) {
            addWatchedAd({
                variables: {
                    ad: {
                        _id: currentVideo._id,
                        title: currentVideo.title,
                        watched: true,
                        duration: currentVideo.duration,
                        date: moment().toISOString(),
                    },
                },
            });
        }
    };

    const handleEnd = () => {
        handleWatchVideo();
        const currentIndex = data.youtube.findIndex((video) => video._id === currentVideo._id);
        const nextIndex = (currentIndex + 1) % data.youtube.length;
        setCurrentVideo(data.youtube[nextIndex]);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleMouseDown = () => {
        setPlaying(true);
    };

    const handleMouseUp = () => {
        setPlaying(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            setPlaying(true);
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowRight') {
            setPlaying(false);
        }
    };

    if (loading) {
        return 'Loading...';
    }
    if (error) {
        return `Error! ${error.message}`;
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
        >
            {currentVideo && (
                <>
                    <h2>{currentVideo.title}</h2>
                    <ReactPlayer
                        ref={playerRef}
                        url={currentVideo.url}
                        playing={playing}
                        onEnded={handleEnd}
                    />
                    <button onClick={handlePlayPause}>
                        {playing ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={handleEnd}>Next</button>
                </>
            )}
            {mutationData && mutationData.addWatchedAd && (
                <div>
                    <h3>Your Statistics</h3>
                    <p>Total Watched: {mutationData.addWatchedAd.totalWatched}</p>
                    <p>Total Trees Planted: {mutationData.addWatchedAd.totalTreesPlanted}</p>
                    <p>Watched Today: {mutationData.addWatchedAd.watchedToday}</p>
                    {/* Add more statistics as needed */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;