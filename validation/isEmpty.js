// const isEmpty=(value)=>{
//     return(
//     value=== undefined||value===null||
//     (typeof value==='Object'&&value.keys().length===0)||
//     (typeof value==='String'&&value.trim().length===0)
//     )
// }

// module.exports=isEmpty




const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}
module.exports = isEmpty;

// var obj = {
//     key1: 'value1',
//     key2: 'value2',
//     key3: 'value3',
//     key4: 'value4'
//  }
//  var keys = Object.keys(obj);
//  console.log('obj contains ' + keys.length + ' keys: '+  keys);