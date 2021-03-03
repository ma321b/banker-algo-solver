import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goClicked: false
        };
    }

    onGoClicked(e) {
        this.setState({
            goClicked: true
        });
    }

    render() {
        const basicInput = (
            <div class="home-page">
            <h1>Banker's Algorithm solver</h1>
            <br />
            <br />
            <label for="procs">How many processes?</label>
            <input id="procNum" name="procs" type="text"></input><br /><br />
            <label for="res">How many resoure types?</label>
            <input id="resNum" name="res" type="text"></input><br /><br />
            <button onClick={this.onGoClicked}>
                GO!
            </button>
        </div>
        );

        const inputMatrix = (
            <div class="input-table">

            </div>
        )

        return (
            this.state.goClicked ? inputMatrix : basicInput
        )
    }

    
}

export default Home