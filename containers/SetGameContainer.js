import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import LoadGame from "./../components/LoadGame";

class SetGame extends Component{

	render(){

		return (
			<div>
				<LoadGame setGame={ this.props.setGame } />
			</div>
		)
	}
}

function mapStateToProps () {
	
	return {
		
	}
}

export default connect( mapStateToProps, {
		setGame: actions.setGame
	})(SetGame);
