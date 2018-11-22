import React, { Component } from 'react'
import axios from'axios';

export default class Fib extends Component {


    state={
        seenIndexes : [],
        values:{},
        index:''
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchIndexes =async  ()=>{
        const seenIndexes = await axios("/api/values/all");
        this.setState({seenIndexes:seenIndexes.data})
     
    }

fetchValues =  async ()=>{
      const values = await axios("/api/values/current");
      this.setState({values:values.data})
     
}


renderSeenIndexes = ()=>{
  return   this.state.seenIndexes.map( ({number}) => number).join(', ');
}

renderValues = ()=>{
   const entries = [];
     for(let  key in this.state.values){
         entries.push(
             <div key={key} >
               For Index {key} I calculated {this.state.values[key]}
               </div>
         )
     }

     return entries;

}

onSubmit = async (e)=>{
    e.preventDefault();

    await axios.post("/api/values",{
        index:this.state.index
    })

    this.setState({index:''});

}
  render() {
    return (
      <div>
          <form>
         <label>  Enter your Index.</label>
         <input  
           value={this.state.index} 
          onChange={(e)=>this.setState({index:e.target.value})}
        placeholder=' eg :1 '
            />
         <button  onClick={this.onSubmit}> Submit .</button>

 <br />

         <h3>  Indexes I have already seen ...</h3>
         {this.renderSeenIndexes()}

<br/>

         <h3> Culculated values </h3>
         {this.renderValues()}



          </form>
        
      </div>
    )
  }
}
