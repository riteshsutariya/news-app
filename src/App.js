import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News'


//API key=65da7d4b84504639b12760520c59e415

export default class App extends Component {
  // apiKey='65da7d4b84504639b12760520c59e415';
  apiKey=process.env.REACT_NEWS_API_KEY;
  constructor()
  {
    super();
    console.log(this.apiKey);
  }

  /*constructor(props)
  {
   super(props)
   this.state={
     counter:0
   }
  }*/

  /*updateState=()=>{
    this.setState((PrevState)=>{
      return {counter:PrevState.counter+1}
    })
  }*/

  render() {
    return (
      <>
       <BrowserRouter>
       <Navbar/>
    <Routes>
        <Route exac path="/" element={<News key="general" apiKey={this.apiKey} pagesize={8} category={'general'}/>} /> 
        <Route exac path="/business" element={<News key="business" apiKey={this.apiKey}  pagesize={8} category={'business'}/>} /> 
        <Route exac path="/entertainment" element={<News key="entertainment" apiKey={this.apiKey}  pagesize={8} category={'entertainment'}/>} />
        <Route exac path="/general" element={<News key="general" apiKey={this.apiKey}  pagesize={8} category={'general'}/>} />
        <Route exac path="/health" element={<News key="health" apiKey={this.apiKey}  pagesize={8} category={'health'}/>} />
        <Route exac path="/science" element={<News key="science" apiKey={this.apiKey}  pagesize={8} category={'science'}/>} />
        <Route exac path="/sports" element={<News key="sports" apiKey={this.apiKey}  pagesize={8} category={'sports'}/>} />
        <Route exac path="/technology" element={<News key="technology" apiKey={this.apiKey}  pagesize={8} category={'technology'}/>} />   
    </Routes>
  </BrowserRouter>
      </>
    )
  }
}


//state example
/*
<div>this is class based component</div>
      <div className="counter">
      <p>Total counts {this.state.counter}</p>
      </div>
      <div className="btn">
        <button onClick={()=>{
          this.setState((PrevState)=>{
            return {counter:PrevState.counter+1}
          })
        }}>Increase Counter</button> 
      </div>
*/
