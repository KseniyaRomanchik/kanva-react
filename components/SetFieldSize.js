import React, {Component} from "react";

export default class SetFieldSize extends Component{

	constructor(props) {
		super(props);

		this.state = {
			width: "",
			height: ""
		}		
		this.timer = { };			
	}

	setFieldSize(){

		this.props.setFieldSize(this.state.width,
								this.state.height,
								this.props.step,
								this.state.timer);
		this.setState({
			width: "",
			height: ""
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

	decreaseTimer(){

		this.timer = setTimeout(() => {
			this.props.setPlayer({
				currentMove: {
					player: this.props.currentMove.player,
					clickedDot: this.props.currentMove.clickedDot,
					timer: this.props.currentMove.timer - 1000
				}
			});
		}, 1000);	

		if(this.props.currentMove.timer <= 0){

			this.props.setPlayer({
				currentMove: {
					player: this.props.currentMove.player ? 0 : 1,
					clickedDot: { },
					timer: this.props.size.timer
				}
			});
		}
	}

	render(){

		clearTimeout(this.timer);
		this.decreaseTimer();

		let timer = {};
		let time = new Date(this.props.currentMove.timer);
		timer.min = time.getMinutes();
		timer.sec = time.getSeconds();

		return (
			<div>
				<form>
					<input type="number" 
							min="1"
							max="2" id="width" 
							placeholder="Width"  
							onInput={ this.setWidth.bind(this) } />
					<input type="number" 
							min="1"
							max="2" id="height" 
							placeholder="Height"  
							onInput={ this.setHeight.bind(this) } />
					<button type="button" 
							onClick={ this.setFieldSize.bind(this) }>
						Set size
					</button>
				</form>
				<span>
					{`Current Field Size: ${ this.props.size.width }x${ this.props.size.height }, timer - ${ timer.min }:${ timer.sec }`}
				</span>
			</div>
		)
	}
}