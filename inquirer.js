const inquirer=require('inquirer')
const axios=require('axios')
let response
async function RunQuery(){
    let Response=await axios.get('http://localhost:5000/states') //get a list of all states
    let data=Response.data
    const states=data
    //console.log(states)

    response=await inquirer.prompt([{            //state input from user
    name: "user_state",
    type: "list",
    message: "What is your state?",
    choices: states
   }])
   console.log(response.user_state)

    Response=await axios.get(`http://localhost:5000/${response.user_state}`)  // get all districts of a given state
    data=Response.data
    const districts=data

    response=await inquirer.prompt([{           //district input from user
    name: "user_district",
    type: "list",
    message: "What is your district?",
    choices: districts
   }])
   console.log(response.user_district)
   const choosenDist=response.user_district

    response=await inquirer.prompt([{           //age group input from user
    name: "user_age",
    type: "list",
    message: "What is your age group?",
    choices: ['18-45','45+']
   }])
   console.log(response.user_age)




}
RunQuery()