/* eslint-disable no-unused-vars */
/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the Dashboard page of the AdsTrees project.
// ===============================================================
// Import Dependencies
// ===============================================================
import './AddsTreesDashboard.css';
import { CkArrowRight } from './CkArrowRight/CkArrowRight.jsx';
import { ProgressSizeXsColorSchemeGreen } from './ProgressSizeXsColorSchemeGreen/ProgressSizeXsColorSchemeGreen.jsx';
import { StatsComponent } from './StatsComponent/StatsComponent.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player/lazy';
import { QUERY_YOUTUBE } from '../../utils/queries.js';
import { ADD_WATCHED_AD } from '../../utils/mutations.js';
import moment from 'moment';
// ===============================================================

// Define Component "Dashboard"
// ===============================================================
const Dashboard = ({ className, ...props }) => {

    const { loading: queryLoading, error: queryError, data } = useQuery(QUERY_YOUTUBE);
    const [addWatchedAd, { loading: mutationLoading }] = useMutation(ADD_WATCHED_AD);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isButtonHeld, setIsButtonHeld] = useState(false);
    const [watchedVideo, setWatchedVideo] = useState(false);

    const playerRef = useRef(null);

    useEffect(() => {
        if (data && data.youtube && data.youtube.length > 0) {
            setCurrentVideo(data.youtube[0]);
        }
    }, [data]);

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

    return (
        <div className={'adds-trees-dashboard ' + className}>
            <div className="dashboard-main-frame">
                <div className="dashboard-body">
                    <div className="client-video-interaction-frame">
                        <div className="client-video-interaction-subframe">
                            <div className="youtube-iframe-frame"></div>
                            <div className="client-controllers-frame">
                                <div className="video-information-frame">
                                    <div className="video-information-subframe">
                                        {currentVideo && (
                                            <>
                                                <ReactPlayer
                                                    ref={playerRef}
                                                    url={currentVideo.url}
                                                    playing={isButtonHeld}
                                                    onEnded={handleEnd}
                                                />
                                                <div className="video-title">{currentVideo.title}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="client-controllers">
                                    <div className="play-button">
                                        <div
                                            className="children"
                                            tabIndex={0}
                                            onMouseDown={onMouseDownHandler}
                                            onMouseUp={onMouseUpHandler}
                                        >
                                            Press to watch
                                        </div>
                                    </div>
                                    <div className="next-button" onClick={handleNext}>
                                        <CkArrowRight className="right-icon-instance" />
                                    </div>
                                </div>
                                <div className="reward-frame">

                                    <div className="reward-label">
                                        <p>Note that you have to watch the video until the end to count it as a watched video and get the reward.</p>
                                    </div>
                                    <div className="reward-frame-planted">
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
                                                d="M8.95006 16.992L8.49057 16.4845C7.95557 15.8935 7.82556 14.9895 8.16706 14.244C8.37406 13.793 8.41256 13.2705 8.27456 12.788L8.05356 12.015L8.50906 12.5185C9.03406 13.0985 9.17056 13.982 8.84906 14.7215L8.81506 14.7995C8.62156 15.2455 8.58956 15.7565 8.72656 16.2275L8.95006 16.992Z"
                                                fill="#9DFFCE"
                                            />
                                            <path
                                                d="M11.4115 12.925L10.952 12.4175C10.417 11.8265 10.287 10.9225 10.6285 10.177C10.8355 9.726 10.874 9.2035 10.736 8.721L10.515 7.948L10.9705 8.4515C11.4955 9.0315 11.632 9.915 11.3105 10.6545L11.2765 10.7325C11.083 11.1785 11.051 11.6895 11.188 12.1605L11.4115 12.925Z"
                                                fill="#9DFFCE"
                                            />
                                            <path
                                                d="M13.9535 18.4905L13.494 17.983C12.959 17.392 12.829 16.488 13.1705 15.7425C13.3775 15.2915 13.416 14.769 13.278 14.2865L13.057 13.5135L13.5125 14.017C14.0375 14.597 14.174 15.4805 13.8525 16.22L13.8185 16.298C13.625 16.744 13.593 17.255 13.73 17.726L13.9535 18.4905Z"
                                                fill="#9DFFCE"
                                            />
                                            <path
                                                d="M14.9435 11.507L14.484 10.9995C13.949 10.4085 13.819 9.50453 14.1605 8.75903C14.3675 8.30803 14.406 7.78553 14.268 7.30303L14.047 6.53003L14.5025 7.03353C15.0275 7.61353 15.164 8.49703 14.8425 9.23653L14.8085 9.31453C14.615 9.76053 14.583 10.2715 14.72 10.7425L14.9435 11.507Z"
                                                fill="#9DFFCE"
                                            />
                                            <path
                                                d="M12.3744 7.41304L11.9149 6.90553C11.3799 6.31453 11.2499 5.41054 11.5914 4.66504C11.7984 4.21404 11.8369 3.69154 11.6989 3.20904L11.4779 2.43604L11.9334 2.93954C12.4584 3.51954 12.5949 4.40303 12.2734 5.14253L12.2394 5.22054C12.0459 5.66654 12.0139 6.17753 12.1509 6.64853L12.3744 7.41304Z"
                                                fill="#9DFFCE"
                                            />
                                        </svg>

                                        <p className="reward-label">x{plantedTreesByWatching} trees will be planted after you watch this video.{' '}</p>

                                    </div>

                                </div>
                                <ProgressSizeXsColorSchemeGreen
                                    hasStripe={true}
                                    size="xs"
                                    colorScheme="green"
                                    className="progress-instance"
                                />
                            </div>
                        </div>
                    </div>
                    <StatsComponent
                        className="stats-component-instance"
                        watchedVideo={watchedVideo}
                        setWatchedVideo={setWatchedVideo}
                    />
                </div>
            </div>
        </div>
    );
};
// ===============================================================

// Export Component "Dashboard"
// ===============================================================
export default Dashboard;
// ===============================================================