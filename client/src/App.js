import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route} from'react-router-dom'
import Fib from './Fib';
import OtherPage from './OtherPage';

import './App.css';


class App extends Component {
  render() {
    return (<Router>

<div  className='container'>
         <header >
 

     <Link to= '/'>Home </Link>
       
     <Link  to ='/other'> Other Page</Link>
          </header>

          <br />
 <div>

   <Route exact  path='/' component={Fib} />
    <Route path='/other' component={OtherPage} />
 </div>
          

          </div>

      </Router>);
     

   
   
    
  }
}

export default App;
