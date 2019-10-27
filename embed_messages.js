const Plugin = require('../plugin');

module.exports = new Plugin({
  name: 'Send embeds',
  author: 'lord_dashh & Darii-Chan',
  description: 'Send embedded messages by Ctrl-Enter or prefixing your message with `/embed `',
  preload: false,
  color: '#f44336',
  load: function() {
    // do shit on ctrl-enter
    document.onkeyup = (key) => {
      if (key.ctrlKey && key.which === 13) {
        const channelId = findModule('getChannelId');
        const cM = channelId.getChannelId();

        const message = document.getElementsByClassName('textArea-2Spzkt')[0].value;
        document.getElementsByClassName('textArea-2Spzkt')[0].value = ' '

        findModule('sendMessage').sendMessage(cM, {
          content: '/embed ' + message
        });
      }
    }

    // patch it up
    monkeyPatch(findModule('post'), 'post', function(args) {
      try {
        if (args.methodArguments[0].url.endsWith('/messages')) {
          if (args.methodArguments[0].body.content.startsWith('/embed ')) {
            const msg = args.methodArguments[0].body.content;
            args.methodArguments[0].body.embed = {
              type: 'rich',
              description: msg.slice(7),
              color: 186381
            };
            args.methodArguments[0].body.content = '';
          }
        }
      } catch (err) { // Most errors are with the .endsWith crap and dont seem to be an actual problem
      }

      return args.callOriginalMethod(args.methodArguments);
    });
  },
  unload: function() {
    document.onkeyup = null;

    findModule('post').post.unpatch();
  }
});
