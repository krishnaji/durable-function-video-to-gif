const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

module.exports =  function (context) {
      context.log('@@@ Activity 3 @@@'); 
      const gifName = (context.bindings.name.split('.'))[0]+'.gif';
      const ffmpeg=   spawn(ffmpegPath, ['-i',context.bindings.name,'-vf','fps=12,scale=854:-1','-f','gif',gifName]);   
      ffmpeg.on('exit',()=>{
        context.done(null, {fileName:gifName});
      });
};