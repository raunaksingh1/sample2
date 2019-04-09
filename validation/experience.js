const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    
    if(Validator.isEmpty(data.title)) {
        errors.title = 'title is required';
    }

   

    if(Validator.isEmpty(data.company)) {
        errors.email = 'company is required';
    }
    if(Validator.isEmpty(data.from)) {
        errors.from = 'from time  is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}