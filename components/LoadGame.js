import React, {Component} from "react";
import store from "./../index"

export default class LoadGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            loadedGame: "",
            currentGame: "",
            error: ""
        }
    }

	loadGame(){

        if(this.state.loadedGame){

            this.props.setGame(this.state.loadedGame);
        }
	}

    downloadGame(){

        this.setState({
            currentGame: JSON.stringify(store.getState())
        });
    }

    changeDownload(e){

        if(e.target.value){

            this.setState({
                currentGame: e.target.value
            });
        } 
    }

    addGameToState(e){

        if(e.target.value){
            try{
                let json = JSON.parse(e.target.value);                
                this.setState({
                    loadedGame: json,
                    error: ""
                });
            }
            catch(err){
                
                this.setState({
                    error: "Invalid JSON"
                });
            }  
        }
    }

	render(){

		return (
			<div>
                <div>
                    <span className="error">
                        { this.state.error }
                    </span>
                </div>
                <div>
                    <textarea cols="40" 
                                placeholder="Load your game" 
                                rows="40" id="load" 
                                onInput={ this.addGameToState.bind(this) } />
                    <textarea cols="40" 
                                placeholder="Download current game" 
                                rows="40" 
                                readOnly 
                                value={ this.state.currentGame } 
                                onChange={ this.changeDownload.bind(this) } 
                                id="download" />
                </div>
				<button type="button" 
                        onClick={ this.loadGame.bind(this) }>
                        Load Game
                </button>
                <button type="button" 
                        onClick={ this.downloadGame.bind(this) }>
                        Download Game
                </button>
			</div>
		)
	}
}

