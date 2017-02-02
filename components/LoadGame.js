import React, {Component} from "react";

export default class LoadGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            game: {},
            currentGame: this.props.store,
            error: ""
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
        
        let span = document.createElement("span");
        span.remove();

        if(e.target.value){
            try{
                let json = JSON.parse(e.target.value);                
                this.setState({
                    game: json,
                    error: ""
                });
            }
            catch(err){
                
                this.setState({
                    error: "Incorrect JSON"
                });
            }  
        }
    }

	render(){

		return (
			<div>
                <div><span className="error">{ this.state.error }</span></div>
                <div>
                    <textarea cols="40" rows="40" id="load" onInput={ this.addGameToState.bind(this) }></textarea>
                </div>
				<button type="button" onClick={ this.loadGame.bind(this) }>Load Game</button>
                <button type="button" onClick={ this.downloadGame.bind(this) }>Download Game</button>
			</div>
		)
	}
}

