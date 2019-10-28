const Plugin = require('../plugin');

module.exports = new Plugin({
  name: 'Echo',
  description: 'Echo a message by it\'s message id.',
  author: 'lord_dashh#9912',
  color: '#123',
  preload: false,
  load: function() {
    monkeyPatch(findModule('sendMessage'), 'sendMessage', (args) => {
      const content = args.methodArguments[1].content;

      if (content.startsWith('/echo ')) {
        console.log(content.slice(6));
        const message = findModule('getMessage').getMessage(args.methodArguments[0], content.slice(6));
        args.methodArguments[1].content = ''
        if (message.content) {
          args.methodArguments[1].content = message.content;
        }
        if (message.embed) {
          args.methodArguments[1] = {
            content: args.methodArguments[1].content,
            tts: args.methodArguments[1].tts,
            nonce: args.methodArguments[1].nonce,
            embed: message.embed
          }
        }
      }

      return args.callOriginalMethod(args.methodArguments);
    })
  },
  unload: function() {
    findModule('sendMessage').sendMessage.unpatch();
  }
})
