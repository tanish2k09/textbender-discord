var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var ids = require('./id.json');
var msgOp = require('./helpers/msgOps.js');
var bend = require('./helpers/bender.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var blacklistRetrack = false;
var actDumb = false;
var selfID = ids.selfID;
var quantumID = ids.quantumID;
var briID = ids.briID;
var retracksID = ids.retracksID;
var devChannelID = ids.devChannelID;
var bebeID = ids.bebeID;

function isAdmin(userID) {
    return (userID == quantumID) || (userID = briID);
}

function isDev(userID) {
    return (userID == quantumID);
}

function isSelf(userID) {
    return (userID == selfID);
}

function isHydraChannel(channelID) {
    return (channelID == hydraChannel);
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('disconnect', function(errMsg, code) {
    console.log(new Date(), 'disconnected', errMsg, code);
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.length <= 1)
        return;
    
    if (isSelf(userID))
        return;
    
    if (message.substring(0, 1) == ';') {        
        // If textbender is on a break, don't do anything (except for media events)
        if (actDumb && !isAdmin(userID))
            return;
        
        // Check for the appropriate command type
        var cmd = msgOp.getCmd(message);

        // Bruh wyd, no command?
        if (cmd == null) {
            msgOp.nonsense(bot, channelID);
            return;
        }

        // Blacklist retrack if annoying, handle that here
        if (blacklistRetrack && userID == retracksID) {
            msgOp.blacklisted(bot, channelID, userID);
            return;
        }
        
        cmd = cmd.toLowerCase();

        // Main switch to control command flow (Grouped and then sorted alphabetically -> Length before case)
        switch(cmd) {
            // Utility commands
            case 'help':
                if (isAdmin(userID) && message.length > 6)
                    msgOp.sendHelp(bot, evt);
                else
                    msgOp.helpResponder(bot, userID);
                break;
                
            case 'helpme':
                msgOp.helpResponder(bot, userID);
                break;
                
            case 'ping':
                msgOp.pingResponder(bot, channelID);
                break;
                
            // Meme commands (pretty much)
            case 'aight':
                msgOp.post(bot, channelID, "<@" + userID + "> - Aight, imma head out");
                break;
                
            case 'bruh':
                msgOp.post(bot, channelID, "***B R U H*** *moment*");
                msgOp.postBruh(bot, userID); 
                break;
                
            case 'f':
                msgOp.postF(bot, channelID, 'F');
                break;
                
            case 'fs':
                msgOp.postF(bot, channelID, '<:fs:642609686746759169>');
                break;
                
            case 'fuck':
                msgOp.post(bot, channelID, "you.");
                break;
                
            case 'killme':
                msgOp.killResponder(bot, channelID, userID);
                break;
                
            case 'mood':
                msgOp.post(bot, channelID, "Damn you know shits real when someone hit you with mood");
                break;
                
            case 'muda':
                msgOp.postMuda(bot, channelID);
                break;

            case 'nice':
                msgOp.postNice(bot, userID);
                break;

            case 'ora':
                msgOp.postOra(bot, channelID);
                break;
                
            case 'quoteme':
                msgOp.postQuote(bot, message, userID);
                break;
                
            case 'tananana':
                msgOp.post(bot, channelID, "-*gasps*- Tu doo doo - doo du doo");
                break;
                
            case 'ogreattreegivewisdom':
				if (userID == bebeID)
					msgOp.post(bot, channelID, "My wisdom is only pure and simple: <@!" + retracksID + "> is gay primus OG");
				else
					msgOp.post(bot, channelID, "The presence of a sincere spirit is necessary to draw the wisdom, child");
                break;
                
            case '-;':
            case '_;':
                // Do nothing
                break;
                
            // Text's kitchen commands
            case 'inv':
                var invString = bend.getInvertedCaseString(msgOp.getArg(message, 4));
                msgOp.post(bot, channelID, invString);
                break;
                
            case 'invl':
                msgOp.postLastMsgCased(bot, evt, bend, 2);
                break;
                
            case 'low':
                var lowString = bend.getLowerCaseString(msgOp.getArg(message, 4));
                msgOp.post(bot, channelID, lowString);
                break;
                
            case 'lowl':
                msgOp.postLastMsgCased(bot, evt, bend, 0);
                break;
                
            case 'mock':
                var spongeBobString = bend.getSpongebobString(msgOp.getArg(message, 5));
                if (spongeBobString == null)
                    return msgOp.nonsense(bot, channelID);

                msgOp.post(bot, channelID, spongeBobString);
                break;

            case 'mockl':
            case 'mocklast':
                msgOp.postLastMsgMocked(bot, evt, bend);
                break;
                
            case 'space':
            case 'spacew':
            case 'biggspace':
            case 'biggspacew':
                msgOp.postMsgSpaced(bot, channelID, bend, cmd, message);
                break;
                
            case 'spacel':
            case 'biggspacel':
                msgOp.postLastMsgSpaced(bot, evt, bend, cmd);
                break;
                
            case 'upp':
                var uppString = bend.getUpperCaseString(msgOp.getArg(message, 4));
                msgOp.post(bot, channelID, uppString);
                break;
                
            case 'uppl':
                msgOp.postLastMsgCased(bot, evt, bend, 1);
                break;

            // Admin/Dev level commands:
            case 'blacklistRetrancc':
            case 'blacklistRetracc':
            case 'blacklistRetrack':
            case 'blacklistRent':
            case 'blr':
                if (isAdmin(userID))
                    blacklistRetrack = !blacklistRetrack;
                msgOp.post(bot, channelID, "Retracks blacklisted? " + blacklistRetrack);
                break;
                
            case 'getcid':
                if (isDev(userID))
                    msgOp.post(bot, userID, channelID);
                break;
                
            case 'id':
                if (isDev(userID))
                    msgOp.post(bot, userID, message.split('@')[1]);
                break;
                
            case 'spam':
                if (isDev(userID))
                    msgOp.spamPost(bot, channelID, msgOp.getArg(message, 5));
                else
                    msgOp.weakSpamPost(bot, channelID);
                break;
                
            case 'takeabreak':
                if (isAdmin(userID)) {
                    actDumb = true;
                    msgOp.post(bot, channelID, "Aight Imma go have lunch. Tesla makes real nice batteries ;);)");
                }
                break;
                
            case 'wakeupdawg':
                if (isAdmin(userID)) {
                    actDumb = false;
                    msgOp.post(bot, channelID, "Bet");
                }
                break;

            default:
                msgOp.nonsense(bot, channelID, userID);
         }
     }
});