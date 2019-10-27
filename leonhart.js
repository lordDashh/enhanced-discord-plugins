const Plugin = require("../plugin");
let contM = {}, iteM = {}, buttM = {}, cM, eM, dM, ree;
module.exports = new Plugin({
	name: "Leonhart", /* Human-readable plugin name. */
	author: "Darii", /* [Optional] Put your name here to give yourself credit for making it :) */
	description: "Does your timers on Cntr + b", /* Description of what this plugin does. */
	preload: false, /* [Optional] If true, load this before Discord has finished starting up */
	color: "#f44336", /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */
	load: () => document.onkeyup = (key) => {
if (key.ctrlKey && key.which === 13) {
        const channelId = findModule('getChannelId');
        const cM = channelId.getChannelId();

        findModule('sendMessage').sendMessage(cM, {
          content: '/embed ' + document.getElementsByClassName('textArea-2Spzkt')[0].value
        });
        document.getElementsByClassName('textArea-2Spzkt')[0].value = ''
      }
    


    monkeyPatch(findModule('post'), 'post', function(b) {
      //console.log(b.methodArguments);
      if (b.methodArguments[0].url.endsWith('/messages')) {
        if (b.methodArguments[0].body.content.startsWith('/embed ')) {
          b.methodArguments[0].body.embed = {
            type: 'rich',
            description: b.methodArguments[0].body.content.slice(7),
            color: 4188607
          };
          b.methodArguments[0].body.content = ''
        }
      }

      return b.callOriginalMethod(b.methodArguments);
    });
},
	unload: function() {
    findModule('sendMessage').sendMessage('426719417473171456', {content: '&claim'});
} 
});
