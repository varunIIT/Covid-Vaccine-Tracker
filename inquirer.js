const inquirer=require('inquirer')
const axios=require('axios')
let  UserResponse
async function RunQuery(){
    let Response=await axios.get('http://localhost:5000/getStates') //get a list of all states
    let data=Response.data
    const states=data
    //console.log(states)

    UserResponse=await inquirer.prompt([{            //state input from user
    name: "user_state",
    type: "list",
    message: "What is your state?",
    choices: states
   }])
   console.log(UserResponse.user_state)

    Response=await axios.get(`http://localhost:5000/getDistrict/${UserResponse.user_state}`)  // get all districts of a given state
    data=Response.data
    const districts=data.districtArray
    const stateId=data.stateId

    UserResponse=await inquirer.prompt([{           //district input from user
    name: "user_district",
    type: "list",
    message: "What is your district?",
    choices: districts
   }])
   console.log(UserResponse.user_district)

   const choosenDist=UserResponse.user_district

   UserResponse=await inquirer.prompt([{           //age group input from user
    name: "user_age",
    type: "list",
    message: "What is your age group?",
    choices: ['18-45','45+']
   }])
   console.log(UserResponse.user_age)

   const choosenAge=UserResponse.user_age
   
   setInterval(async()=>{
    Response=await axios.get(`http://localhost:5000/checkAvailability?dist=${choosenDist}&age=${choosenAge}&stateId=${stateId}`)
    const available=Response.data
    if(available){
            console.log('available')
    }
    else{
        console.log('unavailable')
    }
   },10000)




}
RunQuery()