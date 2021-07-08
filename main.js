const { 
  MessageType,
  mentionedJid,
  processTime
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require('fs');
const chalk = require("chalk");

const { setppig, login, logout, follow, upinstastory, unfollow } = require("./lib/handlerIg.js");
const { uptotele, uptonaufal, uploadFile } = require('./lib/uploadimage');
const conn = require("./lib/connect");

conn.connect()
const lintod = conn.lintod

lintod.on('chat-update', async(lin) => {
    try {
        if (!lin.hasNewMessage) return
        if (!lin.messages) return
        if (lin.key && lin.key.remoteJid == 'status@broadcast') return
        lin = lin.messages.all()[0]
        if (!lin.message) return
        lin.message = (Object.keys(lin.message)[0] === 'ephemeralMessage') ? lin.message.ephemeralMessage.message : lin.message
        if (!lin.key.fromMe) return;
        const content = JSON.stringify(lin.message)
        const from = lin.key.remoteJid
        const type = Object.keys(lin.message)[0]
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const quoted = type == 'extendedTextMessage' && lin.message.extendedTextMessage.contextInfo != null ? lin.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
        const typeQuoted = Object.keys(quoted)[0]
        const body = lin.message.conversation || lin.message[type].caption || lin.message[type].text || ""
        let userMsg = (type === 'conversation' && lin.message.conversation) ? lin.message.conversation : (type == 'imageMessage') && lin.message.imageMessage.caption ? lin.message.imageMessage.caption : (type == 'videoMessage') && lin.message.videoMessage.caption ? lin.message.videoMessage.caption : (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text ? lin.message.extendedTextMessage.text : ''
        prefix = /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_•\/\\Â©^<+]/.test(userMsg) ? userMsg.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_+•\/\\Â©^<+]/gi)[0] : '-'
        chats = (type === 'conversation') ? lin.message.conversation : (type === 'extendedTextMessage') ? lin.message.extendedTextMessage.text : ''
        budy = (type === 'conversation' && lin.message.conversation.startsWith(prefix)) ? lin.message.conversation : (type == 'imageMessage') && lin.message.imageMessage.caption.startsWith(prefix) ? lin.message.imageMessage.caption : (type == 'videoMessage') && lin.message.videoMessage.caption.startsWith(prefix) ? lin.message.videoMessage.caption : (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text.startsWith(prefix) ? lin.message.extendedTextMessage.text : ''
       
        if (prefix != "") {
            if (!body.startsWith(prefix)) {
                cmd = false
                comm = ""
            } else {
                cmd = true
                comm = body.slice(1).trim().split(" ").shift().toLowerCase()
            }
        } else {
            cmd = false
            comm = body.trim().split(" ").shift().toLowerCase()
        }
        
        const reply = (text) => {
        var ids = text.includes('@') ? text.split('@') : []
        let semdertag = [];
        for(var con of ids){
        semdertag.push(con.split(' ')[0]+'@s.whatsapp.net')
        }
        lintod.sendMessage(from, text, MessageType.text, {quoted: lin, contextInfo: {"mentionedJid": semdertag}});
        }
        
        const command = comm
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = cmd
        const isGroup = from.endsWith('@g.us')
        const sender = lin.key.fromMe ? lintod.user.jid : isGroup ? lin.participant : lin.key.remoteJid
        const senderNumber = sender.split("@")[0]
        const groupMetadata = isGroup ? await lintod.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        
        const isImage = type == 'imageMessage'
        const isVideo = type == 'videoMessage'
        const isAudio = type == 'audioMessage'
        const isSticker = type == 'stickerMessage'
        const isContact = type == 'contactMessage'
        const isLocation = type == 'locationMessage'
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        
        typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = "Image"
        else if (isVideo) typeMessage = "Video"
        else if (isAudio) typeMessage = "Audio"
        else if (isSticker) typeMessage = "Sticker"
        else if (isContact) typeMessage = "Contact"
        else if (isLocation) typeMessage = "Location"

        const isQuoted = type == 'extendedTextMessage'
        const isQuotedImage = isQuoted && typeQuoted == 'imageMessage'
        const isQuotedVideo = isQuoted && typeQuoted == 'videoMessage'
        const isQuotedAudio = isQuoted && typeQuoted == 'audioMessage'
        const isQuotedSticker = isQuoted && typeQuoted == 'stickerMessage'
        const isQuotedContact = isQuoted && typeQuoted == 'contactMessage'
        const isQuotedLocation = isQuoted && typeQuoted == 'locationMessage'
        
        const downloadM = async(save) => {
        encmediaa = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
        encmediaa = isQuotedSticker ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
        encmediaa = isQuotedAudio ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
        encmediaa = isQuotedVideo ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
        encmediaa = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
        if (save) return await lintod.downloadAndSaveMediaMessage(encmediaa)
        return await lintod.downloadMediaMessage(encmediaa)
        }
        
        if (!isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ COMMAND ]"), chalk.whiteBright(typeMessage), chalk.greenBright("from"), chalk.keyword("yellow")(senderNumber))
        if (isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ COMMAND ]"), chalk.whiteBright(typeMessage), chalk.greenBright("from"), chalk.keyword("yellow")(senderNumber), chalk.greenBright("in"), chalk.keyword("yellow")(groupName))
      
        switch (command) {
          case "setppig":
          if (!isQuotedImage) return reply('Reply foto yang ingin dijadikan pp ig')
          var media = await downloadM()
          var photo = await uptotele(media)
          await setppig(from, `${photo}`, prefix) 
          break
          case "logininsta":
          await login(from)
          break
          case "logoutinsta":
          await logout(from)
          break
          case "unfollow":
          if (!args.length) return reply('Masukan username yang mau di unfollow')
          usernamea = args.join(" ")
          await unfollow(usernamea, from, prefix)
          break
          case "follow":
          if (!args.length) return reply('Masukan username yang mau di follow')
          usernamea = args.join(" ")
          await follow(usernamea, from, prefix)
          break
          case "upinstastory":
          if (!isQuotedImage) return reply("baru support image kak")
          media = await downloadM()
          const uplii = await uptotele(media)
          ini = args.join(" ")
          await upinstastory(uplii, ini, from, prefix) 
          break
          case "help":
          reply(`Simple selfbot
  
Author : lintod
  
[ Instagram Tools ]

Note : Harap pakai ${prefix}logininsta dahulu sebelum memakai fitur Instagram

1. *${prefix}logininsta*
Untuk login Instagram
Usage : ${prefix}logininsta

2. *${prefix}logoutinsta*
Untuk login Instagram
Usage : ${prefix}logininsta

3. *${prefix}setppig*
Untuk mengubah profile picture Instagram
Usage : ${prefix}setppig

4. *${prefix}upinstastory*
Untuk upstory image
Usage : ${prefix}upinstastory <reply image>

5. *${prefix}follow*
Untuk follow user Instagram
Usage : ${prefix}follow <username>

6. *${prefix}unfollow*
Untuk unfollow user Instagram
Usage : ${prefix}unfollow <username>

More? Nanti, tunggu update aja 😁
`)
          break
        }
    } catch (e) {
      console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[  ERROR  ]"), chalk.keyword("red")(e))
    }
})

nocache('./main.js', module => console.log(`${module} is now updated!`))

function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}