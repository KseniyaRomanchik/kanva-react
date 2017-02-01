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

		this.props.setFieldSize(this.state.width,this.state.width);
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
					<input type="number" id="width" placeholder="Width" onInput={ this.setWidth } />
					<input type="number" id="height" placeholder="Height" onInput={ this.setHeight } />
					<button type="button" onClick={ this.setFieldSize.bind(this) }></button>
				</form>
			</div>
		)
	}
}