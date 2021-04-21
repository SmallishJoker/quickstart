import React, { Component } from 'react';
import { Router, Route, Switch } from 'dva/router';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "HomePage"
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        )
    }
}

export default HomePage;