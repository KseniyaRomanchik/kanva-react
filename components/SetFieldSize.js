import React, {Component} from "react";

export default class SetFieldSize extends Component{

	constructor(props) {
		super(props);

		this.state = {
			width: this.props.size.width,
			height: this.props.size.height,
			timer: this.props.size.timer
		}		
		this.timer = {
			move: {},
			global: {}
		};

		this.time = this.props.size.timer;			
	}

	setFieldSize(){

		this.props.setFieldSize(this.state.width,this.state.height,this.props.step,this.state.timer);

		this.setState({
			width: this.props.size.width,
			height: this.props.size.height
		});
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

	setTime(e){

		this.setState({
			timer: e.target.value * 60 * 1000
		});
	}

	decreaseTimer(){

		this.timer.move = setTimeout(() => {
			this.setState({
				timer: this.state.timer - 1000
			});
		}, 1000);	

		if(this.state.timer <= 0){
			this.setState({
				timer: this.props.size.timer
			});
		}
	}

	render(){

		clearTimeout(this.timer.global);
		clearTimeout(this.timer.move);
		this.decreaseTimer();

		let timer = {};
		let time = new Date(this.state.timer);
		timer.min = time.getMinutes();
		timer.sec = time.getSeconds();

		return (
			<div>
				<form>
					<input type="number" max="2" id="width" placeholder="Width" defaultValue={ this.state.width } onInput={ this.setWidth.bind(this) } />
					<input type="number" max="2" id="height" placeholder="Height" defaultValue={ this.state.height } onInput={ this.setHeight.bind(this) } />
					<button type="button" onClick={ this.setFieldSize.bind(this) }>Set size</button>
				</form>
				<span>{`Current Field Size: ${ this.props.size.width }-${ this.props.size.height }, timer - ${ timer.min }:${ timer.sec }`}</span>
			</div>
		)
	}
}