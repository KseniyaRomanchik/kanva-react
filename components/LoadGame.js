import React, {Component} from "react";

export default class LoadGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            game: {},
            currentGame: this.props.store
        }
    }

	loadGame(){

        this.props.setGame(this.state.game);
	}

    downloadGame(){

        let textarea = document.getElementById("load");
        textarea.value = this.props.store

        // e.target.value = JSON.stringify(this.state.currentGame);
    }

    addGameToState(e){

        let json = JSON.parse(e.target.value);

        console.log(json);
        
        this.setState({
            game: json
        });
    }

	render(){

		return (
			<div>
                <textarea cols="40" rows="40" id="load "onInput={ this.addGameToState.bind(this) }></textarea>
				<button type="button" onClick={ this.loadGame.bind(this) }>Load Game</button>
                <button type="button" onClick={ this.downloadGame.bind(this) }>Download Game</button>
			</div>
		)
	}
}

