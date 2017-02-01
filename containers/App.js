import React, {Component} from "react";
import GameFieldContainer from "./GameFieldContainer";
import LoadAreaSizeContainer from "./LoadAreaSizeContainer";
import SetGameContainer from "./SetGameContainer";

class App extends Component{

	render(){

		return (
			<div>
				<GameFieldContainer /> {/* <form choose size> -- container*/}
				<LoadAreaSizeContainer /> {/* <gameField> -- container*/}
				<SetGameContainer /> {/* <textarea for json> -- container*/}
			</div>
		)
	}
}
export default App;
