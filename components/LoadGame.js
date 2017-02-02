import React, {Component} from "react";
import store from "./../index"

export default class LoadGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            game: {},
            currentGame: "",
            error: ""
        }
    }

	loadGame(){

        this.props.setGame(this.state.game);
	}
    

    downloadGame(){

        this.setState({
            currentGame: JSON.stringify(store.getState())
        });
    }

    changeDownload(e){
        
        this.setState({
            currentGame: e.target.value
        });
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

        console.log("jkjh")

		return (
			<div>
                <div><span className="error">{ this.state.error }</span></div>
                <div>
                    <textarea cols="40" rows="40" id="load" onInput={ this.addGameToState.bind(this) } />
                    <textarea cols="40" rows="40" value={ this.state.currentGame } onChange={ this.changeDownload.bind(this) } id="download" />
                </div>
				<button type="button" onClick={ this.loadGame.bind(this) }>Load Game</button>
                <button type="button" onClick={ this.downloadGame.bind(this) }>Download Game</button>
			</div>
		)
	}
}

