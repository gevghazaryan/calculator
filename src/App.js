import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Screen extends Component {
  render() {
    return(
      <input type='text' value={this.props.value} readOnly={true} className='screen'/>
    )
  }
}

class Key extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.type = 'numkey'
  }
  handleClick(event) {
    this.props.click(event.target.value,this.props.type)
  }
  render() {1
    return(
      <input type='submit' value={this.props.valueX} onClick={this.handleClick}/>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {scrValue: '0',action: false,actionType: undefined,varA: undefined,varB: undefined};
  }
  makeAction() {
    console.log(this.state.actionType)
    if(this.state.actionType === '+') {
      let res = parseFloat(this.state.varA,10) + parseFloat(this.state.scrValue,10);
      return res
    } else if(this.state.actionType === '-') {
      let res = parseFloat(this.state.varA,10) - parseFloat(this.state.scrValue,10);
      return res
    } else if(this.state.actionType === '*') {
      let res = parseFloat(this.state.varA,10) * parseFloat(this.state.scrValue,10);
      return res      
    } else if(this.state.actionType === '/') {
      if(this.scrValue !== '0') {
        let res = parseFloat(this.state.varA,10) / parseFloat(this.state.scrValue,10);
        return res
      } else {
        return '0'
      }     
    }
  }
  makeMemory() {

  }
  handleclick(value,type) {
    let {scrValue,action} = this.state;
    console.log(action,value,scrValue)
    if(action === false) {
      if(type === 'numkey') {
        if((scrValue !== '0' && value === '0') || value !== '0') {
          if(scrValue === '0') {
            this.setState({scrValue: value})
          } else {
            this.setState({scrValue: scrValue.toString().concat(value)})
          }
        }
      } else if(type === 'action') {
        this.setState({action: true,actionType: value,varA: scrValue});
      } else if(type === 'state') {
        if(this.state.actionType !== undefined && value === '=') {
          let res = this.makeAction();
          console.log(res)
          this.setState({scrValue: res,varA: undefined,varB: undefined,action: false,actionType: undefined})
        } else if(value === 'C') {
          this.setState({scrValue: '0',varA: undefined,varB: undefined,action: false,actionType: undefined})
        }
      }
    } else {
      if(type === 'numkey') {
        this.setState({action: false,scrValue: value})        
      }
    }
  }
  render() {
    return(
      <div className='calculator'>
        <Screen value={this.state.scrValue}/>
        <div className='main-keys'>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='1'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='2'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='3'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='4'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='5'/>                        
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='6'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='7'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='8'/>
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='9'/>                                
          <Key click={this.handleclick.bind(this)} type='state' valueX='='/>        
          <Key click={this.handleclick.bind(this)} type='numkey' valueX='0'/>                  
          <Key click={this.handleclick.bind(this)} type='state' valueX='C'/>        
        </div>
        <div className='actions'>
          <Key click={this.handleclick.bind(this)} type='action' valueX='+'/>
          <Key click={this.handleclick.bind(this)} type='action' valueX='-'/>
          <Key click={this.handleclick.bind(this)} type='action' valueX='*'/>
          <Key click={this.handleclick.bind(this)} type='action' valueX='/'/>                        
        </div>
        <div className='extras'>
          <Key click={this.handleclick.bind(this)} type='memory' valueX='M'/>
          <Key click={this.handleclick.bind(this)} type='memory' valueX='MC'/>          
          <Key click={this.handleclick.bind(this)} type='memory' valueX='M+'/>                    
          <Key click={this.handleclick.bind(this)} type='memory' valueX='M-'/>          
        </div>
      </div>
    )
  }
}

export default App;
