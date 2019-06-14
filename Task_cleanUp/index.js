const rimraf = require('rimraf');

module.exports = async function (context) {
    context.log('@@@ Activity 5 @@@'); 
    const filesToBeDeleted=(context.bindings.name.fileName.split('.'))[0];
    rimraf(filesToBeDeleted+'.*',(error)=>{
        if(error){
            throw error;
        }
        return `Hello ${context.bindings.name}!`;
    });

    
};