const express=require('express')
const app=express()
const port=5000

app.listen(port,(err)=>{
    if(err){
        console.log(`Error:${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})