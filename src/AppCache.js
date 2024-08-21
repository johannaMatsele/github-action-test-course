import React,{useState} from "react";
import './App.css';
import { useQuery } from "react-query";
import Post from './Post'
import client from './react-query-client'

const fetcher = url => fetch(url).then(res=>res.json())

function App(){
    const [postID,setPostID]= useState(undefined)
    const {isLoading,data:posts} = useQuery('posts',()=>fetcher('data/posts.json'),
{
    //select:result=>result.slice(0,5)
   
    //select:result=>[result[0]]
})
    
    if(isLoading) return <h1>Loading....</h1>
    
    if(postID !== undefined){

       return <Post postID={postID} goBack={()=>setPostID()} />
    }

    

    function mutateTitle(id){
        client.setQueryData(['post',id],oldData=>{
            
            if(oldData[id]){
                console.log("###OldDtat=",oldData[id])
                
                //const oneData = oldData[id]
                return{
                    ...oldData,
                    title:'boom boom mutated'
                }
                console.log("###OldDtat2=",oldData)
                console.log("Title==",oldData.title)
            }
        })
    }
    return  (
        <div className="App">
            {posts.map(post=>{
                const cachedPost = client.getQueryData(['post',post.id])
                console.log("CachePost==",client.getQueryData(['post',post.id]))
                return <p key={post.id}><b>{cachedPost ?'visited':''}</b>
                    <a onClick={()=>setPostID(post.id)} href="#">
                        {post.id}-{post.title}</a>
                    <button onClick={()=>mutateTitle(post.id)}>Mutate the title</button>
                    </p>
           })}
        </div>
    )          
}
export default App
