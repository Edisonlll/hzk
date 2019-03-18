import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Login from './components/login/login'
import Home from './components/home/home'
class RouterCom extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (<Router>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/" component={Home}></Route>
                <Redirect to='/login'></Redirect>
            </Switch>
        </Router>)
    }
}

export default RouterCom
