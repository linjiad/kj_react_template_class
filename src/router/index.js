// eslint-disable-next-line
import React from 'react';
import {HashRouter as Router, Route, Redirect,Link } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import RouteConfig from "./config";
import checkConfig from "./check";
import appLess from "./index.less";

class RouteMap extends RouteConfig {
    constructor() {
        super();
        this.Check = new checkConfig();
    }
    render() {
        return (
            <div>
                <Router>
                    <div className={appLess.mainTop}>
                        <Link className={appLess.TopTitle} to={
                            {
                                pathname:`/`,
                            }
                        }>框架模板</Link>
                        <div className={appLess.TopMenu}>
                            <Link to='/sub1/item1'>
                                <div className={appLess.btn}>sub1</div>
                            </Link>
                            <Link to='/sub2/item2'>
                                <div className={appLess.btn}>sub2</div>
                            </Link>
                        </div>
                    </div>
                    <div className={appLess.mainBottom}>
                        {
                            this.config.map((route, key) => {
                                if (route.exact) {
                                    return <Route key={key} exact path={route.path}
                                        render={props => (
                                            (!route.check) ? <route.component {...props}
                                                routes={route.routes}/> : (this.Check.loginCheck(route.path) ?
                                                <route.component {...props} routes={route.routes}/> :
                                                <Redirect to={{pathname: "/"}}/>)
                                        )}
                                    />;
                                } else {
                                    return <Route key={key} path={route.path}
                                        render={props => (
                                            (!route.check) ? <route.component {...props}
                                                routes={route.routes}/> : (this.Check.loginCheck(route.path) ?
                                                <route.component {...props} routes={route.routes}/> :
                                                <Redirect to={{pathname: "/"}}/>)
                                        )}
                                    />;
                                }
                            })
                        }
                    </div>
                </Router>
            </div>
        );
    }
}

export default RouteMap;