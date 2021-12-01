// let check = false;
// let i=0;
// let id = setInterval(()=>{
//     i++;
//     console.log(i);
//     if(i==5){
//         clearInterval(id);
//     }
// },1000)

// let ans=""
// if(ans=="")console.log(true)

// let str = "[]";
// // let size = str.length;
// str=str.slice(1,str.length-1);
// console.log(str);

let str = "{'SKV Nehru Vihar, Central Delhi, Delhi, 110054': '47', 'BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054': '80', 'ARUNA NAGAR MAJNU KA TILA, Central Delhi, Delhi, 110054': '81', 'Timarpur Delhi Adm. Flat Complex Timarpur Delhi-110054, Central Delhi, Delhi, 110054': '69', 'Majnu Ka Tilla, Central Delhi, Delhi, 110054': '95', '2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054': '193', '5-Rajpur Road Delhi-110054, Central Delhi, Delhi, 110054': '49', 'DGD Majnu Ka Tilla, Central Delhi, Delhi, 110054': '39'}";
str.replace("'","\"");
let obj = JSON.parse(str);
console.log(obj);