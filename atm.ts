import inquirer from "inquirer";
type anstype = {
    userId:string,
    userpin:number,
    transcationtype:string,
    accounttype:string,
    amount:number
}
const answer:anstype=await inquirer.prompt([
    {
        type:"input",
        name:"userId",
        message:"kindly enter your Id"
    },
    {
        type:"number",
        name:"userpin",
        message:"Please enter your PIN"
    },
    {
        type:"list",
        name:"accounttype",
        choices:["current","saving"],
        message:"Please enter your account"
    },
    {
        type:"list",
        name:"transcationtype",
        choices:["withdraw","fast cash"],
        message:"Please enter your transcationtype",
        when(answer){
            return answer.accounttype
        }
    },
    {
        type:"list",
        name:"amount",
        choices:[1444,2000,4000000,10000],
        message:"select your amount",
        when(answer) {
            return answer.transcationtype == "fast cash"
        },
    },
    {
        type:"number",
        name:"amount ",
        message:"enter your amount",
        when(answer) {
            return answer.transcationtype == "withdraw"
        },
    }
])

if(answer.userId && answer.userpin ){
    const balance=Math.floor(Math.random()*10000000);
    console.log(balance);
  const enteramount=answer.amount;
    if( balance >= enteramount){
    const remiaing =balance - enteramount;
    console.log("your remianig balance is:", remiaing);
    }
    else{
console.log("insuficient balance");
    }
  }
