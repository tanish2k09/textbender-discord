function getCommandDescriptions1() {
    desc = ";aight - Posts a reference to the 'aight imma head out' meme\n";
    desc += ";biggspace - Same as ;space but with more spacing probability\n";
    desc += ";biggspacew - Same as ;spacew but with more spacing probability\n";
    desc += ";biggspacel - Same as ;spacel but with more spacing probability\n";
    desc += ";bruh - Declares a bruh moment by replying 'bruh' and sending a notice to the bruh-moments channel\n";
    desc += ";f - Posts a string of 'F's shaped like F\n";
    desc += ";fs - Posts a sequence of the server's :fs: emoji shaped like F\n";
    desc += ";fuck - replies 'you.'\n";
    desc += ";help mention - Send the help response to the mentioned person's DM (Needs admin access in-bot)\n";
    desc += ";helpme - DMs you a helpful message about the bot, just like this one. I just became self-aware didn't I?\n";
    desc += ";inv message - Inverts the message's case\n";
    desc += ";invl - Inverts the last message's case\n";
    desc += ";killme - A meme command that replies that I understand your situation";
    desc += ";low message - Converts the message into lower case\n";
    desc += ";lowl - Converts the last message into lower case\n";
    return desc;
}

function getCommandDescriptions2() {
    desc = ";mock message - Outputs a spongebob-mock version of message with random capped alphabets\n";
    desc += ";mockl - Outputs a ;mock of the last message\n";
    desc += ";mocklast - Same as ;mockl\n";
    desc += ";muda - Sends a long MUDA string\n";
    desc += ";nice - Sends a Nice string to the nice channel with your user tag\n";
    desc += ";ora - Sends a long ORA string\n";
    desc += ";ping - Outputs a string to let you know if the bot is up and active\n";
    desc += ";quoteme message - Puts the message in the just-quotes channel (with wrapped quotation and a credit tag)\n";
    desc += ";space message - Spreads the letters in the message apart with a probability bias (emoji and tags will not be preserved)\n";
    desc += ";spacew message - Spreads the words in the message apart with a probability bias\n";
    desc += ";spacel - Spreads the letters in the previous message apart with a probability bias (emoji and tags will not be preserved)\n";
    desc += ";spam message - Spams the 'message' at max 10 times ONLY if you have dev access\n";
    desc += ";takeabreak - Pauses all command responses unless the user is an in-bot admin (needs in-bot admin access)\n";
    desc += ";tananana - Imitates the Illuminati sound in... text... yea idk\n";
    desc += ";upp message - Converts the message into upper case\n";
    desc += ";uppl - Converts the last message into upper case\n";
    desc += ";wakeupdawg - Resumes command responses, removes the ;takeabreak effect (needs in-bot admin access\n";
    desc += "\n\nBot built by <@!328440224130793472>";
    return desc;
}

module.exports = {
    nonsense: function (bot, ID, userID) {
        
        var msg = 'Hey <@!' + userID + '> ';
        
        if (userID == '328440224130793472')
            msg += 'UwU daddy-san I\'m sorry I can\'t quite understand';
        else
            msg += 'you little shit, use ;helpme';
        
        bot.sendMessage({
            to: ID,
            message: msg
        });
    },
    
    blacklisted: function (bot, ID, userID) {
        bot.sendMessage({
            to: ID,
            message: 'Hey <@!' + userID + '> you little shit, you\'re blacklisted'
        });
    },

    post: function (bot, ID, msg) {
        if (ID == null || msg == null)
            return;

        bot.sendMessage({
            to: ID,
            message: msg
        });
    },

    pingResponder: function (bot, ID) {
        bot.sendMessage({
            to: ID,
            message: '***Jörmungandr*** *would like to know your location!*'
        });
    },

    helpResponder: function (bot, ID) {
        bot.sendMessage({
            to: ID,
            message: 'Hey there! The bot command prefix is \';\'\n\nCommands (case insensitive):\n' + getCommandDescriptions1()
        });
        setTimeout(function() {
            bot.sendMessage({
                to: ID,
                message: getCommandDescriptions2()
            });
        }, 500);
    },

    getCmd: function (message) {
        if (message.length < 2) {
            return null;
        }
        
        if (message.indexOf(' ') == -1)
            return message.substring(1, message.length);

        return message.substring(1, message.indexOf(' '));
    },

    getArg: function (message, cmdLength) {
        return message.substring(cmdLength, message.length);
    },

    postLastMsgMocked: function (bot, event, bender) {
        var msgOp = this;
        bot.getMessages({
            channelID: event.d.channel_id,
            before: event.d.id,
            limit: 1
        }, function (err, res) {
            msgOp.post(bot, event.d.channel_id, bender.getSpongebobString(res[0].content));
        });
    },
    
    postLastMsgCased: function (bot, event, bender, type) {
        var msgOp = this;
        bot.getMessages({
            channelID: event.d.channel_id,
            before: event.d.id,
            limit: 1
        }, function (err, res) {
            msgOp.post(bot, event.d.channel_id, bender.getCasedString(res[0].content, type));
        });
    },

    spamPost: function (bot, id, message) {
        var i;
        for (i = 0; i < 10; ++i) {
            this.post(bot, id, message);
        }
    },

    weakSpamPost: function (bot, id) {
        this.post(bot, id, "Lmao this dude thinks he can exploit me to spam, I'm fresh outta fucks to give");
    },

    postNice: function (bot, userID) {
        this.post(bot, '624836797045801008', "Nice - <@!" + userID + '>');
    },

    postOra: function (bot, id) {
        this.post(bot, id, "ORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORAORA");
    },

    postMuda: function (bot, id) {
        this.post(bot, id, "MUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDA");
    },
    
    postQuote: function (bot, message, userID) {
        var quote = this.getArg(message, 8);
        
        if (quote == null || quote.length == 0)
            return;
        
        quote.trim();

        if (quote.length == 0)
            return;

        this.post(bot, '560626863731507236', '"' + quote + "\"\n- <@!" + userID + ">");
    },
    
    postBruh: function (bot, userID) {
        this.post(bot, '631528865134673930', "*Ladies and gentlemen, a* ***bruh moment*** *has been declared by <@" + userID + ">*");
    },
    
    postF: function (bot, channelID, symbol) {
        fText = symbol.repeat(5) + '\n' + symbol + '\n' + symbol.repeat(3) + ('\n' + symbol).repeat(2);
        this.post(bot, channelID, fText);
    },
    
    killResponder: function (bot, channelID, userID) {
        this.post(bot, channelID, "Look <@" + userID + ">, I understand what you be goin thru but it do be like that sometimes");
    },
    
    sendHelp: function (bot, event) {
        userID = event.d.content.split('@')[1];
        userID = userID.split('>')[0];
        if (userID.charAt(0) == '!')
            userID = userID.substring(1, userID.length);
        
        this.helpResponder(bot, userID);
    },
    
    postMsgSpaced: function (bot, channelID, bender, cmd, msg) {
        message = this.getArg(msg, cmd.length + 1);
        if (message == null)
            return this.nonsense(bot, channelID);
        
        this.post(bot, channelID, bender.getSpacedMsg(message, cmd));
    },
    
    postLastMsgSpaced: function (bot, event, bender, cmd) {
        var msgOp = this;
        bot.getMessages({
            channelID: event.d.channel_id,
            before: event.d.id,
            limit: 1
        }, function (err, res) {
            msgOp.post(bot, event.d.channel_id, bender.getSpacedMsg(res[0].content, cmd));
        });
    },
};