import React, {useState} from 'react';
import './App.css'
import { useQuery,useMutation } from "react-query";
import Post from './Post'
import client from "./react-query-client";

const fetcher = (url,body) => fetch(url,{
    
    method:'POST',
    headers:{
        'Access-control-Allow-Origin':'no-corse',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
})

const  fetchget =(url) => fetch(url).then(response=>response.json())
       /*  .then(data=>console.log("Dddd==",data.lang))  */
        .catch(error=>console.error("Errorrrr==",error," Url==",url))


function App(){
    const {tempLang,setTempLang} = useState('')
    const mutation = useMutation((body)=>fetcher('http://localhost:3001/api/create-record',body),{
        
        onSuccess(data){
            console.log('Got response from backend ',data )  
            setTempLang('')
            client.invalidateQueries('favLangs')  
           },
        onError(error){
            console.log('Got error from backend ',error ) 
        }
    })
    
    const {data:favLangs,isLoading,isError} = useQuery('favLangs',()=>{
        
        return fetchget('http://localhost:3001/api/get-records')
        /* .then(t=>t.json()) */ 
        
 }  ,{
        select:data =>data.lang
        
    } 
) 

    function callMutation(){
        
         mutation.mutate({record:tempLang}) 
    }

     if(isLoading){
       
        return <p>Loading222....</p>
    } 
    if(isError){
        return <p>Error with request....</p>
    } 

    return (
        <div className="App">
            <h1>Some favourinte languages</h1>
           
     
            {favLangs.map(lang=>{
                return <li key={lang}>{lang}</li>
            })}
            <input type="text" value={tempLang} onChange={(e=>setTempLang(e.target.value))} />
            <p onClick={callMutation}>Submit</p>

        </div>
    )
}
export default App