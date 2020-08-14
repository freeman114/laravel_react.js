// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../../components/PageTitle';
import Statistics from './Statistics';
import Status from './Status';
import Tasks from './Tasks';
import TasksChart from './TasksChart';
import Activity from './Activity';
import Calendar from './Calendar';

const CampaignDashboardPage = () => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: '/' },
                    { label: 'Campaign', path: '/dashboard/campaign', active: true },
                ]}
                title={'Campaign Dashboard'}
            />

            <Statistics />

            <Row>
                <Col lg={4}>
                    <Status />
                </Col>
                <Col lg={8}>
                    <Tasks />
                </Col>
            </Row>

            <Row>
                <Col>
                    <TasksChart />
                </Col>
            </Row>

            <Row>
                <Col xl={5}>
                    <Activity />
                </Col>
                <Col xl={7}>
                    <Calendar />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CampaignDashboardPage;
