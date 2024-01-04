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
    // const [userData, setUserData] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [holdStartTime, setHoldStartTime]= useState(null);
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
    console.log(currentVideo);

    const handleWatchVideo = async () => {
        if (currentVideo) {
            const ad = {

                title: currentVideo.title,
                watched: true,
                duration: currentVideo.duration,
                date: moment().toISOString(),

            };

            try {
                await addWatchedAd({
                    variables: { ad: ad },
                });
                await refetchUser();
            } catch (e) {
                console.error('Error executing mutation:', e);
            }
        }
    };

    // const onReady = (e) => {
    //     setPlayer(e.target);
    // };

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
        if (player) {
            setPlaying(true);
            setHoldStartTime(Date.now());
            player.playVideo();
        }
    };

    const handleMouseUp = () => {
        if (player) {
            setPlaying(false);
            player.pauseVideo();
        }
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

    useEffect(() => {
        console.log('use is in effect');
        if (playing && player && data && data.youtube && data.youtube.length > 0) {
            const videoDuration = player.getDuration() * 1000;
            timerRef.current = setTimeout(() => {
                if (playing) {
                    const currentIndex = data.youtube.findIndex((video) => video._id === currentVideo._id);
                    const nextIndex = (currentIndex + 1) % data.youtube.length;
                    setCurrentVideo(nextIndex);
                    alert(`you watched ${nextIndex} out of ${data.youtube.length} ads`);
                }
            }, videoDuration);
        }
        return () => clearTimeout(timerRef.current);
    }, [playing, player, currentVideo, data, timerRef]);

    useEffect(() => {
        // if the button is released before the end of the video clear the timeout
        //console.log('use was stopped')
        if (playing && holdStartTime && player) {
            const holdDuration = Date.now() - holdStartTime;
            const videoDuration = player.getDuration() * 1000;
            if (holdDuration < videoDuration){
                clearTimeout(timerRef.current);
            }
        }
    }, [playing, holdStartTime, player, timerRef]);

    if (queryLoading || mutationLoading) {
        return 'Loading...';
    }
    if (queryError) {
        return `Error! ${queryError.message}`;
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
            className="dashboard"
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
                    <button className="white-button" onClick={handlePlayPause}>
                        {playing ? 'Pause' : 'Play'}
                    </button>
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