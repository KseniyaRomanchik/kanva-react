import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import { Layer } from "react-konva";
import Polygons from "./../components/Polygons";

class PolygonsContainer extends Component{

    constructor(props){
        super(props)
    }

	render(){	

		return (   
            <Layer>
                <Polygons player={ 1 } 
                    dots={ this.props.dots } 
                    move={ this.props.move.player } 
                    polygons={ this.props.polygons }
                    step={ this.props.step } 
                    setNewDotProperty={ this.props.setNewDotProperty }
                    clickedDot={ this.props.move.clickedDot.color ? this.props.move.clickedDot : {} } 
                    setPolygons={ this.props.setPolygons }
                    setEmptyPolygon={ this.props.setEmptyPolygon }
                    polygons = { this.props.polygons }/>
                <Polygons player={ 0 } 
                    dots={ this.props.dots } 
                    move={ this.props.move.player } 
                    polygons={ this.props.polygons }
                    step={ this.props.step } 
                    setNewDotProperty={ this.props.setNewDotProperty }
                    clickedDot={ this.props.move.clickedDot.color ? {} : this.props.move.clickedDot } 
                    setPolygons={ this.props.setPolygons }
                    setEmptyPolygon={ this.props.setEmptyPolygon }
                    polygons = { this.props.polygons }/>
            </Layer>
		)
	}
}



function mapStateToProps (state) {
	
	return {
		dots: state.dots.dots,
		size: state.dots.fieldSize,
		step: state.dots.fieldSize.step,
		move: state.dots.currentMove,
		polygons: state.dots.polygons
	}
}

export default connect( mapStateToProps, {
    setNewDotProperty: actions.setNewDotProperty,
    setPolygons: actions.setPolygons,
    setEmptyPolygon: actions.setEmptyPolygon
})(PolygonsContainer);

// connect store
