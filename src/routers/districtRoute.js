const districtRoute=require('express').Router()
const axios=require('axios')
districtRoute.get('/getDistrict/:stateName',async (req,res)=>{
    let Response=await axios.get('https://www.cowin.gov.in/api/v2/admin/location/states')
    let data=Response.data
    //console.log(data)
    let stateId
    for(let state of data.states){
        if(state.state_name==req.params.stateName){
            stateId=state.state_id
            break
        }
    }

    Response=await axios.get(`https://www.cowin.gov.in/api/v2/admin/location/districts/${stateId}`)
    console.log(Response)
    data=Response.data
    console.log(data)
    let districtArray=[]
    for(let district of data.districts){
        districtArray.push(district.district_name)
    }
    //console.log(districtArray)
    const wrapArrayAndStateId={stateId,districtArray}
    res.send(wrapArrayAndStateId)

})
module.exports={
    districtRoute
}