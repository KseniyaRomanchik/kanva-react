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

        // let textarea = document.getElementById("load");
        // textarea.value = JSON.stringify(this.props.store)
    }

    addGameToState(e){

        let json = JSON.parse(e.target.value);
        
        this.setState({
            game: json
        });
    }

	render(){

		return (
			<div>
                <textarea cols="40" rows="40" id="load" defaultValue={ JSON.stringify(this.props.store) } onInput={ this.addGameToState.bind(this) }></textarea>
				<button type="button" onClick={ this.loadGame.bind(this) }>Load Game</button>
                <button type="button" onClick={ this.downloadGame.bind(this) }>Download Game</button>
			</div>
		)
	}
}

