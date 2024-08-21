import React, { useState } from "react";
import logo from './logo.svg'
import './App.css'
import { useQuery } from "react-query";

const fetcher = (repo)=>{
    console.log("REsss111=",repo)
    //return fetch(`https://api.github.com/repos/${repo}`)
    return fetch(`http://localhost:3000/${repo}`).then(res=>res.json())
    .then((response)=>console.log('Response==',response))
    .catch(error=>console.error('Error===',error))
   
    
}
function App(){
    const [repoName,setRepoName] = useState('react')
   //const {isLoading,data} = useQuery(['github-data','facebook/react'],()=>fetcher('facebook/react'))
   const {isLoading,data} = useQuery(['github-data',repoName],()=>fetcher(repoName))

   if(isLoading){
     <div className="App">
      <input type="text" value={repoName} onChange={(e)=>setRepoName(e.target.value)}/>
        <h2>Loading....</h2>
    </div>
    console.log("DAta==",data)
  }else{
    console.log("DAta222==",data)
    return(
        <div className="App">
           < input type="text" value={repoName} onChange={(e)=>setRepoName(e.target.value)}/>
       
            <h2>Name:{data.name}</h2>
            <h2>Desc:{data.description}</h2>
            <h2>Stars:{data.stargazers_count}</h2>
        </div>
    ) 
   }        
    
}

export default App