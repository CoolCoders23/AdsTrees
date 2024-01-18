/* eslint-disable no-unused-vars */
/* Code generated with AutoHTML Plugin for Figma */
import './StatsComponent.css';
import { StatsComponentHeader } from '../StatsComponentHeader/StatsComponentHeader.jsx';
import { StatsFigureCard } from '../StatsFigureCard/StatsFigureCard.jsx';
import { BonusCard } from '../BonusCard/BonusCard.jsx';
import { QUERY_USER } from '../../../utils/queries.js';
import Auth from '../../../utils/auth';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

export const StatsComponent = ({ className, watchedVideo, setWatchedVideo, ...props }) => {

    const profile = Auth.getProfile();
    const username = profile?.data.username;

    const { loading: userLoading, error: userError, data: userData, refetch } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    // Add a useEffect hook that listens for changes to watchedVideo
    useEffect(() => {

        if (watchedVideo) {
            refetch();
            setWatchedVideo(false);
        }

    }, [watchedVideo, setWatchedVideo, refetch, userData, userLoading, userError]);

    if (userLoading) {
        return <p>Loading...</p>;
    }
    if (userError) {
        return <p>Error: {userError.message}</p>;
    }

    return (
        <div className={'stats-component ' + className}>
            <div className="stats-component2">
                <StatsComponentHeader
                    statsComponentHeaderLabel="Stats"
                    className="stats-component-header-instance"
                />
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
            </div>
            <div className="frame">
                <StatsComponentHeader
                    statsComponentHeaderLabel="Bonuses"
                    className="stats-component-header-instance2"
                />
                <div className="frame-3365">
                    {userData && userData.user && (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
