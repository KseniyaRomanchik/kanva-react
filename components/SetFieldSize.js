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

		this.setState({
			width: this.props.size.width,
			height: this.props.size.height
		})
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
					<input type="number" id="width" placeholder="Width" defaultValue={ this.state.width } onInput={ this.setWidth.bind(this) } />
					<input type="number" id="height" placeholder="Height" defaultValue={ this.state.height } onInput={ this.setHeight.bind(this) } />
					<button type="button" onClick={ this.setFieldSize.bind(this) }>Set size</button>
				</form>
				<span>{`Current Field Size: ${ this.props.size.width }-${ this.props.size.height }`}</span>
			</div>
		)
	}
}