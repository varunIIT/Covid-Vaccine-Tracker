const inquirer=require('inquirer')
let response
async function RunQuery(){
   response=await inquirer.prompt([{
    name: "user_name",
    type: "list",
    message: "What is your name?",
    choices: ["Thin Crust", "Stuffed Crust", "Pan"],
   }])
   console.log(response.user_name)
}
RunQuery()