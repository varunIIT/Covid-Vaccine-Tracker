const axios = require('axios')

const stateRoute=require('express').Router()

stateRoute.get('/states',async (req,res)=>{
    const {data}=await axios.get('https://www.cowin.gov.in/api/v2/admin/location/states')
    let statesArray=[]
    for(let state of data.states){
        statesArray.push(state.state_name)
    }
    //console.log(statesArray)
    res.send(statesArray)


})

module.exports={
    stateRoute
}