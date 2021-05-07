const axios = require('axios')
const { checkAvailability } = require('../controllers/checkAvailability')
const checkAvailabilityRoute=require('express').Router()

checkAvailabilityRoute.get('/checkAvailability',async (req,res)=>{
    const {dist,age,stateId}=req.query
    let Response=await axios.get(`https://www.cowin.gov.in/api/v2/admin/location/districts/${stateId}`)
    let districts=Response.data.districts
    let distId

    for(let district of districts){
        if(district.district_name==dist){
            distId=district.district_id
            break
        }
    }
    const d=new Date()
    const day=d.getDate();
    const month=d.getMonth()+1;
    const year=d.getFullYear()
    const dateString=`${day}-${month}-${year}`
    //console.log(distId,dateString)
    
    Response=await axios.get(`https://www.cowin.gov.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distId}&date=${dateString}`)
    const data=Response.data
    const centers=data.centers

    const availableData=checkAvailability(centers,age)
    res.send(availableData)


})

module.exports={
    checkAvailabilityRoute
}