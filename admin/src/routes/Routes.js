import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import { allFlattenRoutes as routes } from './index';
import { isUserAuthenticated } from '../helpers/authUtils';
import * as layoutConstants from '../constants/layout';

// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>;

// All layouts/containers
const AuthLayout = Loadable({
    loader: () => import('../layouts/Auth'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const VerticalLayout = Loadable({
    loader: () => import('../layouts/Vertical'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const HorizontalLayout = Loadable({
    loader: () => import('../layouts/Horizontal'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const DetachedLayout = Loadable({
    loader: () => import('../layouts/Detached'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

class Routes extends Component {
    // returns the layout
    getLayout = () => {
        if (!isUserAuthenticated()) return AuthLayout;

        let layoutCls = VerticalLayout;

        switch (this.props.layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };

    shouldComponentUpdate(nextProps, nextState) {
        let oldLayout = { ...this.props.layout };
        delete oldLayout.showRightSidebar;
        let newLayout = { ...nextProps.layout };
        delete newLayout.showRightSidebar;
        return (
            JSON.stringify(oldLayout) !== JSON.stringify(newLayout) ||
            JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)
        );
    }

    render() {
        const Layout = this.getLayout();
        // rendering the router with layout
        return (
            <BrowserRouter basename={'/admin'}>
                <Layout {...this.props}>
                    <Switch>
                        {routes.map((route, index) => {
                            return (
                                !route.children && (
                                    <route.route
                                        key={index}
                                        path={route.path}
                                        roles={route.roles}
                                        exact={route.exact}
                                        component={route.component}></route.route>
                                )
                            );
                        })}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.Layout,
        user: state.Auth.user,
    };
};

export default connect(
    mapStateToProps,
    null
)(Routes);
