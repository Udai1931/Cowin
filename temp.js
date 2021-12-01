const {spwan, spawn} = require('child_process');
const { log } = require('console');

// const childPython = spawn('python',['--version']);
const childPython = spawn('python',['script.py','110032','20']);

childPython.stdout.on('data',(data)=>{
    let ans = data.toString();
    // console.log(ans)
    ans=ans.split("***");
    console.log(ans[1]);
    
})

childPython.stderr.on('data',(data)=>{
    console.error("Error : ",data);
})

childPython.on('close',(code)=>{
    console.log("closed");
})