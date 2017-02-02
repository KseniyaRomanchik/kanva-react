import React, {Component} from "react";

export default class SetFieldSize extends Component{

	constructor(props) {
		super(props);

		this.state = {
			width: this.props.size.width,
			height: this.props.size.height
		}					
	}

	setFieldSize(){

		this.props.setFieldSize(this.state.width,this.state.height,this.props.step);
		// this.props.setEmptyPolygon(move)
		// this.props.setPolygons(coordLine, player)
	}

	setWidth(e){

		this.setState({
			width: e.target.value
		});
	}

	setHeight(e){

		this.setState({
			height: e.target.value
		});
	}

	render(){

		return (
			<div>
				<form>
					<input type="number" id="width" placeholder="Width" defaultValue={ this.props.size.width } onInput={ this.setWidth.bind(this) } />
					<input type="number" id="height" placeholder="Height" defaultValue={ this.props.size.height } onInput={ this.setHeight.bind(this) } />
					<button type="button" onClick={ this.setFieldSize.bind(this) }>Set size</button>
				</form>
			</div>
		)
	}
}