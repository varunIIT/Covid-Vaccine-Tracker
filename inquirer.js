const inquirer=require('inquirer')
const axios=require('axios')
let response
async function RunQuery(){
    const {data}=await axios.get('http://localhost:5000/states') //get a list of all states
    const states=data
    console.log(states)

    response=await inquirer.prompt([{
    name: "user_state",
    type: "list",
    message: "What is your state?",
    choices: states
   }])
   console.log(response.user_state)

   const {data}=await axios.get(`http://localhost:5000/:${response.user_state}`)  // get all districts of a given state
}
RunQuery()