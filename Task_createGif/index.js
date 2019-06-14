const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

module.exports =  function (context) {
      const gifName = (context.bindings.name.split('.'))[0]+'.gif';
      const ffmpeg=   spawn(ffmpegPath, ['-i',context.bindings.name,'-f','gif',gifName]);   
      context.log(`AAAAAAAAAAAA3333333`);
      ffmpeg.on('exit',()=>{
        context.done(null, {fileName:gifName});
      });
};