import React, {Component} from 'react'
import './GridView.css'
import Cell from '../cell/Cell'
import style from '../cell/Cell.css'

function isOperator(e)
{
  return e === '+' || e === '-' || e === 'x' || e === ':';
}

function isAssign(e){
  return e === '=';
}

function isNumber(e)
{
  console.log(`Debug function isNumber: ${e}`);
  console.log(!isNaN(parseInt(e, 10)));
  return !isNaN(parseInt(e, 10));
}

class GridView extends Component 
{
  constructor(props) 
  {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      session: '',
      screen:'',
      summary: [],
      currentSize: 0,
      maxSize: 30, 
      message: '',
      isOperator:false
    };
  }


  getData(e) {
    console.log(`Debug input ${e}`);
    if (this.state.currentSize < this.state.maxSize)
    {
      if (e === 'AC')
      {
        this.setState({screen: '', session: '' , summary: [], currentSize: 0, maxSize: 30, message:''});
      } else if(isAssign(e))
      {
        //calculate elements from summary
      } else
      {
        if(isNumber(e))
        {
          console.log(`Debug check isNumber with ${e}`);
          //send e to valueSession and valueScreen
          this.setState({screen: this.state.screen + e});
          this.setState({session: this.state.session + e});
          this.setState({currentSize: this.state.currentSize + 1})
          console.log(`Current size ${this.state.currentSize}`)
          this.setState({isOperator: false})
        } else if(isOperator(e))
        {
          console.log(`Debug line 55: isOperator with ${e}`);
          //check after input is not operator
          if(this.state.isOperator === false)
          {
            let summary = this.state.summary;
            //send session to summary,
            const arr = [...summary, this.state.session, e];
            console.log(`Debug line 63: ${arr}`)
            this.setState({summary: arr});
            //then reset session
            this.setState({session: ''})
            //send operator to screen
            this.setState({screen: this.state.screen + e});
            this.setState({isOperator: true})
            console.log(`Current size ${this.state.currentSize}`)
            this.setState({currentSize: this.state.currentSize + 1})
          }
        }
      } 
    } else {
      console.log('Debug out side')
    }
  }
  render () 
  {
    return (
      <div align="center">
        <h1>Mini Calculator</h1>
        <input type="text" className="screenStyle" value={this.state.screen} disabled/>
        <br/>
        <div>{this.state.message}</div>
        <br/>
        <table>
          <tbody>
            <tr>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="1" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="2" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="3" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src="+" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.clear} src="AC" /></td>
            </tr>
            <tr>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="4" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="5" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="6" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src="-" /></td>
            </tr>
            <tr>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="7" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="8" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="9" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src="x" /></td>
            </tr>
            <tr>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src="." /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.number} src="0" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src="=" /></td>
              <td><Cell getData={this.getData} style={style.cell + " " + style.operator} src=":" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GridView;