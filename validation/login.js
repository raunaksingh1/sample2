const isEmpty=require('../validation/isEmpty')
const validator=require('validator');

module.exports=function loginUser(data){
let errors={}
data.email=!isEmpty(data.email)?data.email:''
data.password=!isEmpty(data.password)?data.password:''

if(!validator.isEmail(data.email)){
    errors.email='email must be valid'
}
if(validator.isEmpty(data.email)){
    errors.email="email cannot be empty"
}
if(!validator.isLength(data.password,{min:6,max:30})){
    errors.password='password must be six character'
}
if(validator.isEmpty(data.password)){
    errors.password="password cant be empty"
}

return{
    errors,
    isValid:isEmpty(errors)
}
}