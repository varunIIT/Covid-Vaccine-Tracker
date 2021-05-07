const inquirer=require('inquirer')
const axios=require('axios')
const chalk = require('chalk')
const beep = require('beepbeep')

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
   
   // first time response to user 
   Response=await axios.get(`http://localhost:5000/checkAvailability?dist=${choosenDist}&age=${choosenAge}&stateId=${stateId}`)
    const availableData=Response.data
    if(availableData.length>0){
            
            for(let item of availableData){
                beep()
                console.log(chalk.green(JSON.stringify(item)))
                console.log('---------------------------------------------------------------------------------------------------------------')
            }
    }
    else{
        console.log(chalk.red('unavailable'))
    }

    // further subsequent responses
   setInterval(async()=>{
    Response=await axios.get(`http://localhost:5000/checkAvailability?dist=${choosenDist}&age=${choosenAge}&stateId=${stateId}`)
    const availableData=Response.data
    if(availableData.length>0){
            
            for(let item of availableData){
                 beep()
                console.log(chalk.green(JSON.stringify(item)))
                console.log('---------------------------------------------------------------------------------------------------------------')
            }
    }
    else{
        console.log(chalk.red('unavailable'))
    }
   },6000)




}
RunQuery()