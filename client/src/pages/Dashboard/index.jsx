/* eslint-disable no-unused-vars */
/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the Dashboard page of the
// ==============================================================

// Import Packages and Components
// ===============================================================
import './AddsTreesDashboard.css';
import { Progress } from './Progress/Progress.jsx';
import { CkArrowRight } from './CkArrowRight/CkArrowRight.jsx';
import { StatsComponentHeader } from './StatsComponentHeader/StatsComponentHeader.jsx';
import { StatsFigureCard } from './StatsFigureCard/StatsFigureCard.jsx';
import { BonusCard } from './BonusCard/BonusCard.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player/lazy';
import { QUERY_YOUTUBE } from '../../utils/queries.js';
import { ADD_WATCHED_AD } from '../../utils/mutations.js';
import { QUERY_USER } from '../../utils/queries.js';
import Auth from '../../utils/auth.js';
import moment from 'moment';
import { Button } from '@chakra-ui/react';
// ===============================================================

// Define Component "Dashboard"
// ===============================================================
const Dashboard = ({ className, ...props }) => {

    const [currentVideo, setCurrentVideo] = useState(null);
    const [isButtonHeld, setIsButtonHeld] = useState(false);
    const [watchedVideo, setWatchedVideo] = useState(false);
    const [played, setPlayed] = useState(0);
    const profile = Auth.getProfile();
    const username = profile?.data.username;
    const playerRef = useRef(null);

    const { loading: queryLoading, error: queryError, data } = useQuery(QUERY_YOUTUBE);
    const [addWatchedAd, { loading: mutationLoading }] = useMutation(ADD_WATCHED_AD);
    const { loading: userLoading, error: userError, data: userData, refetch } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    useEffect(() => {
        if (data && data.youtube && data.youtube.length > 0) {
            setCurrentVideo(data.youtube[0]);
        }
    }, [data]);

    // Add a useEffect hook that listens for changes to watchedVideo
    useEffect(() => {

        if (watchedVideo) {
            refetch();
            setWatchedVideo(false);
        }

    }, [watchedVideo, setWatchedVideo, refetch, userData, userLoading, userError]);

    const plantedTreesByWatching = Math.floor(currentVideo?.duration / 30);

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
            });
            setWatchedVideo(true);
        }
    };

    const handleNext = () => {
        const currentIndex = data.youtube.findIndex((video) => video._id === currentVideo._id);
        const nextIndex = (currentIndex + 1) % data.youtube.length;
        setCurrentVideo(data.youtube[nextIndex]);
    };

    const handleEnd = () => {
        handleWatchVideo();
        handleNext();
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
    if (userLoading) {
        return <p>Loading...</p>;
    }
    if (userError) {
        return <p>Error: {userError.message}</p>;
    }

    return (
        <div className={'adds-trees-dashboard ' + className}>
            <div className="dashboard-main-frame">
                <div className="dashboard-body">
                    <div className="client-video-interaction-frame">
                        <div className="video-information-frame">
                            <div className="video-information-subframe">
                                {currentVideo && (
                                    <>
                                        <div className="video-title">{currentVideo.title}</div>
                                        <div style={{
                                            border: '2px solid #081c15',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            marginBottom: '10px',
                                            minWidth: '100%',
                                            minHeight: '100%',
                                        }}>
                                            <ReactPlayer
                                                ref={playerRef}
                                                url={currentVideo.url}
                                                playing={isButtonHeld}
                                                onEnded={handleEnd}
                                                config={{
                                                    youtube: {
                                                        playerVars: {
                                                            autoplay: 0,
                                                            controls: 0,
                                                            modestbranding: 1,
                                                            rel: 0,
                                                            showinfo: 0,
                                                        },
                                                    },
                                                }}
                                                onProgress={({ played }) => {
                                                    setPlayed(played);
                                                }}
                                                onPause={() => {
                                                    setIsButtonHeld(false);
                                                }}
                                                volume={0.9}
                                                muted={false}
                                                fallback={
                                                    <div className='video-title'>
                                                                Failed to load media
                                                    </div>
                                                }
                                                width="100%"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="client-video-interaction-subframe">
                            <div className="video-player-frame"></div>
                            <div className="client-controllers-frame">
                                <Progress
                                    hasStripe={true}
                                    size="xs"
                                    colorScheme="blue"
                                    className="progress-instance"
                                    value={played}
                                    max={1}
                                />
                                <div className="client-controllers">
                                    <Button
                                        className="play-button"
                                        variant="dashboard"
                                        tabIndex={0}
                                        onMouseDown={onMouseDownHandler}
                                        onMouseUp={onMouseUpHandler}
                                    >
                                        <div className="children">
                                            Press to watch
                                        </div>
                                    </Button>
                                    <Button className="next-button" onClick={handleNext} variant= "next">
                                        <CkArrowRight className="right-icon-instance" />
                                    </Button>
                                </div>
                                <div className="reward-frame">

                                    <div className="reward-label">
                                        <p>Note that you have to watch the video until the end to count it as a watched video and get the reward.</p>
                                    </div>

                                    <svg
                                        className="trees"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.975 15.975L10.5 23L9 24H14.5L13 23L12.0185 15.975H10.975Z"
                                            fill="#E29D86"
                                        />
                                        <path
                                            d="M12.648 0.8665C12.4175 0.633 12.0915 0.5 11.75 0.5C11.4085 0.5 11.0825 0.633 10.852 0.8665C9.235 2.5755 6 7.013 6 15.1665C6 18.11 8.5765 20.5 11.75 20.5C14.9235 20.5 17.5 18.11 17.5 15.1665C17.5 7.013 14.265 2.5755 12.648 0.8665Z"
                                            fill="#33C481"
                                        />
                                        <path
                                            d="M8.94836 16.992L8.48886 16.4845C7.95386 15.8935 7.82386 14.9895 8.16536 14.244C8.37236 13.793 8.41086 13.2705 8.27286 12.788L8.05186 12.015L8.50736 12.5185C9.03236 13.0985 9.16886 13.982 8.84736 14.7215L8.81336 14.7995C8.61986 15.2455 8.58786 15.7565 8.72486 16.2275L8.94836 16.992Z"
                                            fill="#9DFFCE"
                                        />
                                        <path
                                            d="M11.4132 12.925L10.9537 12.4175C10.4187 11.8265 10.2887 10.9225 10.6302 10.177C10.8372 9.726 10.8757 9.2035 10.7377 8.721L10.5167 7.948L10.9722 8.4515C11.4972 9.0315 11.6337 9.915 11.3122 10.6545L11.2782 10.7325C11.0847 11.1785 11.0527 11.6895 11.1897 12.1605L11.4132 12.925Z"
                                            fill="#9DFFCE"
                                        />
                                        <path
                                            d="M13.9523 18.4905L13.4928 17.983C12.9578 17.392 12.8278 16.488 13.1693 15.7425C13.3763 15.2915 13.4148 14.769 13.2768 14.2865L13.0558 13.5135L13.5113 14.017C14.0363 14.597 14.1728 15.4805 13.8513 16.22L13.8173 16.298C13.6238 16.7441 13.5918 17.255 13.7288 17.726L13.9523 18.4905Z"
                                            fill="#9DFFCE"
                                        />
                                        <path
                                            d="M14.9444 11.507L14.4849 10.9995C13.9499 10.4085 13.8199 9.50453 14.1614 8.75903C14.3684 8.30803 14.4069 7.78553 14.2689 7.30303L14.0479 6.53003L14.5034 7.03353C15.0284 7.61353 15.1649 8.49703 14.8434 9.23653L14.8094 9.31453C14.6159 9.76053 14.5839 10.2715 14.7209 10.7425L14.9444 11.507Z"
                                            fill="#9DFFCE"
                                        />
                                        <path
                                            d="M12.3741 7.41304L11.9146 6.90553C11.3796 6.31453 11.2496 5.41054 11.5911 4.66504C11.7981 4.21404 11.8366 3.69154 11.6986 3.20904L11.4776 2.43604L11.9331 2.93954C12.4581 3.51954 12.5946 4.40303 12.2731 5.14253L12.2391 5.22054C12.0456 5.66654 12.0136 6.17753 12.1506 6.64853L12.3741 7.41304Z"
                                            fill="#9DFFCE"
                                        />
                                    </svg>

                                    <p className="reward-label">
                                        x{plantedTreesByWatching} trees will be planted after you watch this video.{' '}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stats-component">
                        <div className="stats-sub-component">
                            <StatsComponentHeader className="stats-component-header-instance" />
                            <div className="stats-component-body">
                                <div className="stats-component-body-trees-planted">
                                    <StatsFigureCard
                                        statTitle="Trees you planted"
                                        statFigure={userData.user.totalTreesPlanted}
                                        className="stats-figure-card-instance"
                                    />
                                    <StatsFigureCard
                                        statFigure={userData.user.treesPlantedInYear}
                                        statTitle="This year"
                                        className="stats-figure-card-instance"
                                    />
                                </div>
                            </div>
                            <div className="stats-component-body-performance">
                                <StatsFigureCard
                                    statFigure={userData.user.bestWeek}
                                    statTitle="Best week"
                                    className="stats-figure-card-instance"
                                />
                                <StatsFigureCard
                                    statFigure={userData.user.treesPlantedInWeek}
                                    statTitle="This week"
                                    className="stats-figure-card-instance"
                                />
                            </div>
                        </div>
                        <div className="bonus-sub-component">

                            <StatsComponentHeader
                                statsComponentHeaderLabel="Bonuses"
                                className="stats-component-header-instance"
                            />

                            {userData && userData.user && (
                                <div className="bonus-holder-frame">
                                    <div className="bonus-holder-subframe-1-a">
                                        <BonusCard
                                            reward="x 16"
                                            userProgress={`${userData.user.watchedInMonth}/3000s`}
                                            bonusCardTitle="3000s videos this month"
                                            className="bonus-card-instance"
                                        />
                                        <BonusCard
                                            reward="x 8"
                                            userProgress={`${userData.user.watchedInWeek}/1500s`}
                                            bonusCardTitle="1500s videos this week"
                                            className="bonus-card-instance"
                                        />
                                    </div>
                                    <div className="bonus-holder-subframe-1-b">
                                        <BonusCard
                                            reward="x 4"
                                            userProgress={`${userData.user.watchedToday}/240s`}
                                            bonusCardTitle="240s videos today"
                                            className="bonus-card-instance"
                                        />
                                        <BonusCard
                                            reward="x 2"
                                            userProgress={`${userData.user.watchedToday}/150s`}
                                            bonusCardTitle="150 videos combo"
                                            className="bonus-card-instance"
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ========================================================

// Export Component
// ========================================================
export default Dashboard;
// ========================================================