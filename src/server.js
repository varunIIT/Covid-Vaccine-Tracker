const express=require('express')
const app=express()
const port=5000
const{stateRoute}=require('./routers/stateRoute')
const { checkAvailabilityRoute } = require('./routers/checkAvailabilityRoute')
const { districtRoute } = require('./routers/districtRoute')

app.use('/',stateRoute)
app.use('/',districtRoute)
app.use('/',checkAvailabilityRoute)
app.listen(port,(err)=>{
    if(err){
        console.log(`Error:${err}`)
    }
    else{
        console.log(`listening at http://localhost:${port}`)
    }
})