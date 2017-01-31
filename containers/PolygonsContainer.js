import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
// import { Layer } from "react-konva";
import Polygons from "./../components/Polygons";

class PolygonsContainer extends Component{

    constructor(props){
        super(props)
    }

	render(){	

		return (   
            
            <Polygons player={ 0 } 
                dots={ this.props.dots } 
                move={ this.props.move.player } 
                polygons={ this.props.polygons }
                step={ this.props.step } 
                setNewDotProperty={ this.props.setNewDotProperty }
                clickedDot={ this.props.move.clickedDot.color ? {} : this.props.move.clickedDot } 
                setPolygons={ this.props.setPolygons }
                polygons = { this.props.polygons }/>
		)
	}
}

function mapStateToProps (state) {
	
	return {
		dots: state.dots.dots,
		size: state.dots.size,
		step: state.dots.step,
		move: state.dots.move,
		polygons: state.dots.polygons
	}
}

export default connect( mapStateToProps, {
    setNewDotProperty: actions.setNewDotProperty,
    setPolygons: actions.setPolygons
})(PolygonsContainer);

// connect store
