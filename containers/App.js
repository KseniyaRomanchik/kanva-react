import React, {Component} from "react";
import GameFieldContainer from "./GameFieldContainer";
import SetFieldSizeContainer from "./SetFieldSizeContainer";
import SetGameContainer from "./SetGameContainer";

class App extends Component{

	render(){

		return (
			<div>
				<SetFieldSizeContainer /> {/* <gameField> -- container*/}
				<GameFieldContainer /> {/* <form choose size> -- container*/}			
				<SetGameContainer /> {/* <textarea for json> -- container*/}
			</div>
		)
	}
}
export default App;
