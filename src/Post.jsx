import React from "react";
import { useQuery } from "react-query";

const fetcher = url => fetch(url).then(res=>res.json())
const newData ="";
const Post = ({postID,goBack}) =>{
    const {data,isLoading}=useQuery(["post",postID],
        ()=>fetcher('data/posts.json'),
        //{cacheTime:2}
        {staleTime:Infinity})
        
    //console.log("Data====",data)
    if(data !== undefined){
     console.log("ID:==",postID,"Data====",data[postID])   
    }   
      
    if(isLoading){
        return <p>Loading post...</p>
    } 
    return <div>
    <a href="#" onClick={goBack}>Go back</a>
     <h1>Post ID:{postID}</h1>
    <h1>{data[postID].title}</h1>
    <p>{data[postID].body}</p> 
    </div> 
}

export default Post