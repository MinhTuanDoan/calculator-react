import React, {Component} from 'react'
import './Cell.css'

// import Picture from '../picture/Picture'
class Cell extends Component {
  constructor (props){
    super(props);
    this.clickMe = this.clickMe.bind(this);
    this.loadState = this.loadState.bind(this);
    this.state = {
      value:'',
      clicked: false
    };
  }

  loadState(){
    this.setState({value: this.props.src});
  }

  clickMe(e){
    this.setState({clicked: !this.state.clicked});
    this.props.getData(this.state.value);
  }
  render() {
    return(
      <div className={this.props.style} onMouseOver={this.loadState} onClick={this.clickMe}>
        {this.props.src}
      </div>
    );
  }
}

export default Cell;