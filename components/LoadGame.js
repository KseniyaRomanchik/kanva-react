import React, {Component} from "react";

export default class LoadGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            game: {}
        }
    }

	loadGame(){

        this.props.setGame(this.state.game);
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
                <textarea cols="40" rows="40" onInput={ this.addGameToState.bind(this) }></textarea>
				<button type="button" onClick={ this.loadGame.bind(this) }>Load Game</button>
			</div>
		)
	}
}

