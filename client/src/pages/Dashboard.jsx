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
    // const [videos, setVideos] = useState([]);
    const [player, setPlayer] = useState(null);
    const [isButtonHeld, setIsButtonHeld] = useState(false);
    const [holdStartTime, setHoldStartTime] = useState(null);
    const [playVideo, setPlayVideo] = useState(false);

    const playerRef = useRef(null);
    let timerRef = useRef(null);

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

    const onReady = (e) => {
        setPlayer(e.target);
    };

    const handleEnd = () => {
        handleWatchVideo();
        const currentIndex = data.youtube.findIndex((video) => video._id === currentVideo._id);
        const nextIndex = (currentIndex + 1) % data.youtube.length;
        setCurrentVideo(data.youtube[nextIndex]);
    };

    const onMouseDownHandler = () => {
        setIsButtonHeld(true);
        setHoldStartTime(Date.now());
        setPlayVideo(true);
    };

    const onMouseUpHandler = () => {
        setIsButtonHeld(false);
        setPlayVideo(false);
    };

    useEffect(() => {
        // let timer;
        console.log('use is in effect');
        if (isButtonHeld && playVideo && player) {
            const videoDuration = player.getDuration() * 1000;
            timerRef.current = setTimeout(() => {
                if (isButtonHeld) {

                    alert('You have watched the whole video!');
                }
            }, videoDuration);
        }
        return () => clearTimeout(timerRef.current);
    }, [isButtonHeld, player, currentVideo, playVideo, timerRef]);

    useEffect(() => {
        // if the button is released before the end of the video clear the timeout
        //console.log('use was stopped')
        if (!isButtonHeld && !playVideo && holdStartTime && player) {
            const holdDuration = Date.now() - holdStartTime;
            const videoDuration = player.getDuration() * 1000;
            if (holdDuration < videoDuration){
                clearTimeout(timerRef.current);
            }
        }
    }, [isButtonHeld, holdStartTime, player, playVideo, timerRef]);


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
                        onReady={onReady}
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
                    <p>Total Watched: {userData.user.totalWatched}</p>
                    <p>Total Trees Planted: {userData.user.totalTreesPlanted}</p>
                    <p>Watched Today: {userData.user.watchedToday}</p>
                    {/* Add more statistics */}
                </div>
            )}

        </div>
    );
};

export default Dashboard;