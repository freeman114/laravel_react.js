import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import {fetchAuthJSON} from "../../../helpers/api";
import classNames from 'classnames';

import './styles.scss';

const shortOverviewLength = 30;

const SingleProject = props => {
    const project = props.project || {};
    const totalMembers = project.team.length;

    const [ expanded, setExpanded ] = React.useState(project.overview.length <= shortOverviewLength);
    const [ teamExpanded, setTeamExpanded ] = React.useState(false);

    const difference_in_time = (new Date(project.due_date)).getTime() -  (new Date(project.start_date)).getTime();
    const difference_in_days = difference_in_time / (1000 * 3600 * 24);

    return (
        <Card className="d-block">
            {project.avatar && (
                <React.Fragment>
                    <img className="card-img-top" src={project.avatar} alt="" />
                </React.Fragment>
            )}

            <CardBody className={project.avatar ? 'position-relative' : ''}>

                <UncontrolledDropdown className="card-widgets">
                    <DropdownToggle tag="a" className="arrow-none cursor-pointer">
                        <i className="dripicons-dots-3"></i>
                    </DropdownToggle>

                    <DropdownMenu right>
                        <Link to={`/dashboard/visitors/${project.id}/edit`}>
                            <DropdownItem>
                                <i className="mdi mdi-pencil mr-1"></i>Edit
                            </DropdownItem>
                        </Link>
                        <Link to={`/dashboard/visitors/report/${project.id}`}>
                            <DropdownItem>
                                <i className="mdi mdi-library-books mr-1"></i>Report
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <h4 className="mt-0">
                    <span className="text-title">
                        {project.name}
                    </span>
                </h4>

                <div
                    style={{marginBottom: 10}}
                    className={classNames(
                        'badge',
                        {
                            'badge-success': project.status === 1,
                            'badge-secondary': project.status === 0
                        },
                        'p-1'
                    )}>
                    {project.status === 0 ? 'Ongoing' : 'Finished'}
                </div>

                <p className="text-muted font-13 mb-3">
                    {expanded ? project.overview : project.overview.slice(0, shortOverviewLength)}{' '}
                    {expanded ? null : <a
                        onClick={() => setExpanded(true)}
                        style={{ cursor: 'pointer' }}
                        className="font-weight-bold text-muted"
                    >
                        view more
                    </a>}
                </p>
                {teamExpanded ? (<div className="expanded-users">
                    {project.team.map((t, i) => {
                        return (<div className="expanded-user">
                            <span className="team-member-avatar">
                                {t.first_name[0]}{t.last_name[0]}
                            </span>
                            {t.first_name} {t.last_name}
                        </div>)
                    })}
                </div>) : (<div>
                    {project.team.map((t, i) => {
                       if (i > 2 || !t.first_name || !t.last_name) {
                           return;
                       }

                       return (<span className="team-member-avatar" title={`${t.first_name} ${t.last_name}`}>
                           {t.first_name[0]}{t.last_name[0]}
                       </span>)
                    })}
                    {totalMembers - 3 > 0 && (
                        <span className="d-inline-block text-muted font-weight-bold ml-2" onClick={() => setTeamExpanded(true)}>
                            +{totalMembers - 3} more
                        </span>
                    )}
                </div>)}
                <div className="project-stats">
                    {difference_in_days} {`day${difference_in_days !== 1 ? 's' : ''}`}
                </div>
            </CardBody>
        </Card>
    );
};



class Visitors extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        projects: [],
        statusFilter: 'all'
    };

    fetchProjects = (status) => {
        fetchAuthJSON('/visitor-projects', {
            body: JSON.stringify({ status }),
            method: 'POST'
        }).then(json => {
            this.setState({
                projects: json.projects,
            });
        }).catch(error => {
            this.setState({response: {...error}});
        });
    };

    setFilterStatus = (status) => {
        this.setState({ statusFilter: status });
        this.fetchProjects(status !== 'all' ? status : undefined);
    };

    componentDidMount() {
        this.fetchProjects();
    }

    render() {
        const { statusFilter } = this.state;

        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        {label: 'Visitors', path: '/dashboard/visitors', active: true},
                    ]}
                    title="Visitors"
                />

                <Row className="mb-2">
                    <Col sm={4}>
                        <Link to="/dashboard/visitors/new">
                            <Button color="danger" className="btn-rounded mb-3">
                                <i className="mdi mdi-plus"></i> Create Project
                            </Button>
                        </Link>
                    </Col>
                    <Col sm={8}>
                        <div className="text-sm-right">
                            <div className="btn-group mb-3">
                                <Button
                                    onClick={() => this.setFilterStatus('all')}
                                    color={statusFilter === 'all' ? 'primary' : 'light'}
                                >
                                    All
                                </Button>
                            </div>
                            <ButtonGroup className="btn-group mb-3 ml-1">
                                <Button color={statusFilter === 0 ? 'primary' : 'light'} onClick={() => this.setFilterStatus(0)}>Ongoing</Button>
                                <Button color={statusFilter === 1 ? 'primary' : 'light'} onClick={() => this.setFilterStatus(1)}>Finished</Button>
                            </ButtonGroup>

                            <div className="btn-group mb-3 ml-2 d-none d-sm-inline-block">
                                <Button color="secondary">
                                    <i className="dripicons-view-apps"></i>
                                </Button>
                            </div>
                            <div className="btn-group mb-3 d-none d-sm-inline-block">
                                <Button color="link" className="text-muted">
                                    <i className="dripicons-checklist"></i>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-2">
                    {this.state.projects.sort((a,b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    }).map((project, i) => {
                        return (
                            <Col md={6} xl={3} key={'proj-' + project.id}>
                                <SingleProject project={project} />
                            </Col>
                        );
                    })}
                </Row>
            </React.Fragment>
        );
    }
}

export default Visitors;




