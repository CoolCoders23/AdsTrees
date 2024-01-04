/* eslint-disable no-unused-vars */
// Desc: This file contains Dashboard page of the app
// where users can see ads, Stats and plant trees :)
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player';
import { QUERY_YOUTUBE } from '../utils/queries';
import { ADD_WATCHED_AD } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import moment from 'moment';
import Auth from '../utils/auth';
import './Dashboard.css';

const Dashboard = ({ user }) => {

    const { loading: queryLoading, error: queryError, data } = useQuery(QUERY_YOUTUBE);
    console.log(data);
    const [addWatchedAd, { loading: mutationLoading }] = useMutation(ADD_WATCHED_AD);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isButtonHeld, setIsButtonHeld] = useState(false);

    const playerRef = useRef(null);

    const profile = Auth.getProfile();
    const username = profile?.data.username;

    const { loading: userLoading, error: userError, data: userData, refetch: refetchUser } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    useEffect(() => {
        if (data && data.youtube && data.youtube.length > 0) {
            setCurrentVideo(data.youtube[0]);
        }
    }, [data]);

    const handleWatchVideo = async () => {
        if (currentVideo) {
            addWatchedAd({
                variables: {
                    ad: {
                        title: currentVideo.title,
                        watched: true,
                        duration: currentVideo.duration,
                        date: moment().toISOString(),
                    },
                },
            })
                .then(() => {
                    refetchUser();
                })
                .catch((error) => {
                    console.error('Error executing mutation:', error);
                });
        }
    };


    const handleEnd = () => {
        handleWatchVideo();
        const currentIndex = data.youtube.findIndex((video) => video._id === currentVideo._id);
        const nextIndex = (currentIndex + 1) % data.youtube.length;
        setCurrentVideo(data.youtube[nextIndex]);
    };

    const onMouseDownHandler = () => {
        setIsButtonHeld(true);
    };

    const onMouseUpHandler = () => {
        setIsButtonHeld(false);
    };


    if (queryLoading || mutationLoading) {
        return 'Loading...';
    }
    if (queryError) {
        return `Error! ${queryError.message}`;
    }

    return (
        <div
            className="dashboard"
        >
            {currentVideo && (
                <>
                    <h2>{currentVideo.title}</h2>
                    <ReactPlayer
                        ref={playerRef}
                        url={currentVideo.url}
                        playing={isButtonHeld}
                        onEnded={handleEnd}
                    />
                    <div className="white-button">
                        <button tabIndex={0} onMouseDown={onMouseDownHandler}
                            onMouseUp={onMouseUpHandler}> Press to watch </button>
                    </div>
                    <button className="white-button" onClick={handleEnd}>Next</button>
                </>
            )}

            {userData && userData.user && (
                <div>
                    <h3>Your Statistics</h3>
                    <p>Total Watched: {userData.user.totalWatched} Seconds</p>
                    <p>Total Trees Planted: {userData.user.totalTreesPlanted}Seconds</p>
                    <p>Watched Today: {userData.user.watchedToday} Seconds</p>
                    <p>Watched This Week: {userData.user.watchedInWeek} Seconds</p>
                    <p>Watched This Month: {userData.user.watchedInMonth} Seconds</p>
                    <p>Trees Planted This Week: {userData.user.treesPlantedInWeek} Seconds</p>
                    <p>Trees Planted This year: {userData.user.treesPlantedInYear} Seconds</p>
                    <p>Best Week: {userData.user.bestWeek} Seconds</p>
                </div>
            )}

        </div>
    );
};

export default Dashboard;