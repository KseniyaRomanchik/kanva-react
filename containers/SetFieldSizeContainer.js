import React, {Component} from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import SetFieldSize from "./../components/SetFieldSize";

class SetFieldSizeContainer extends Component{

	render(){

		return (
			<div>
				<SetFieldSize size={ this.props.size }
								step={ this.props.step }
								setFieldSize={ this.props.setFieldSize }
								currentMove={ this.props.currentMove }
								setPlayer = { this.props.setPlayer }
								/>
			</div>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		size: state.dots.fieldSize,
		step: state.dots.fieldSize.step,
		currentMove: state.dots.currentMove
	}
}

export default connect( mapStateToProps, {
		setFieldSize: actions.setFieldSize,
		setPlayer: actions.setPlayer
	})(SetFieldSizeContainer);

// connect store
