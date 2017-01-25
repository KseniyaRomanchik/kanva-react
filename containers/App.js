import React, {Component} from "react";
import GameFieldContainer from "./GameFieldContainer";
import LoadingAreaContainer from "./LoadingAreaContainer";
import SizeFormContainer from "./SizeFormContainer";

class App extends Component{

	render(){

		return (
			<div>
				<GameFieldContainer />{/ <form choose size> -- container/}
				<LoadingAreaContainer />{/ <gameField> -- container/}
				<SizeFormContainer />{/ <textarea for json> -- container/}
			</div>
		)
	}
}
export default App;
