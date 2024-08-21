import React,{useState} from "react";
import './App.css';
import { useMutation, useQuery } from "react-query";
import Post from './Post'
import client from './react-query-client'

const fetcher = url => fetch(url).then(res=>res.json())
const timer = (duration,param) =>{
    
   return  new Promise((resolve,reject)=>{
        
        setTimeout(()=>{
            reject('yooooo')
            console.log('I was runn!!!!!',{param} )
        },duration)})
}
    function App(){
    const mutation = useMutation((param)=>timer(1000,param),{
        onSuccess(data){
            console.log('request is completed',{data})
        },
        onError(error){
            console.log('Error with the req ',error)
        },
        onSettled(data,error){
            console.log('request either erred of successful')
        }
    })

    async function callMutation(){
        console.log('Updating post...')
       mutation.mutate('dsfsfsfsf',{
            onSuccess(data){
                console.log('request is completed',{data})
            },
            onError(error){
                console.log('Error with the req ',error)
            },
            onSettled(data,error){
                console.log('request either erred of successful mutate')
            }
    
       })
        console.log('Post updated...')
    }
    return (
        <div className="App">
            <h1>Mutation</h1>
            <p onClick={callMutation}>Submit</p>
        </div>
    )
    
}
export default App