const {
  MessageType,
  mentionedJid,
  processTime
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require('fs');
const chalk = require("chalk");

const {
  setppig,
  block,
  unblock,
  komen,
  login,
  logout,
  follow,
  upinstastory,
  unfollow,
  likepost,
  unlikepost
} = require("./lib/handlerIg.js");
const {
  Log,
  LogError
} = require("./lib/log.js");
const {
  downloadig,
  igstory
} = require("./lib/instadl.js");
const {
  uptotele,
  uptonaufal,
  uploadFile
} = require('./lib/uploadimage');
const {
  menu
} = require("./lib/menu");
const {
  getBuffer
} = require ("./lib/help");

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
    lin.message = (Object.keys(lin.message)[0] === 'ephemeralMessage') ? lin.message.ephemeralMessage.message: lin.message
    if (!lin.key.fromMe) return;
    const content = JSON.stringify(lin.message)
    const from = lin.key.remoteJid
    const type = Object.keys(lin.message)[0]
    const {
      text,
      extendedText,
      contact,
      location,
      liveLocation,
      image,
      video,
      sticker,
      document,
      audio,
      product
    } = MessageType
    const quoted = type == 'extendedTextMessage' && lin.message.extendedTextMessage.contextInfo != null ? lin.message.extendedTextMessage.contextInfo.quotedMessage || []: []
    const typeQuoted = Object.keys(quoted)[0]
    const body = lin.message.conversation || lin.message[type].caption || lin.message[type].text || ""
    let userMsg = (type === 'conversation' && lin.message.conversation) ? lin.message.conversation: (type == 'imageMessage') && lin.message.imageMessage.caption ? lin.message.imageMessage.caption: (type == 'videoMessage') && lin.message.videoMessage.caption ? lin.message.videoMessage.caption: (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text ? lin.message.extendedTextMessage.text: ''

    prefix = /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_•\/\\Â©^<+]/.test(userMsg) ? userMsg.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_+•\/\\Â©^<+]/gi)[0]: '-'
    
    chats = (type === 'conversation') ? lin.message.conversation: (type === 'extendedTextMessage') ? lin.message.extendedTextMessage.text: ''
    
    budy = (type === 'conversation' && lin.message.conversation.startsWith(prefix)) ? lin.message.conversation: (type == 'imageMessage') && lin.message.imageMessage.caption.startsWith(prefix) ? lin.message.imageMessage.caption: (type == 'videoMessage') && lin.message.videoMessage.caption.startsWith(prefix) ? lin.message.videoMessage.caption: (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text.startsWith(prefix) ? lin.message.extendedTextMessage.text: ''

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
      var ids = text.includes('@') ? text.split('@'): []
      let semdertag = [];
      for (var con of ids) {
        semdertag.push(con.split(' ')[0]+'@s.whatsapp.net')
      }
      lintod.sendMessage(from, text, MessageType.text, {
        quoted: lin, contextInfo: {
          "mentionedJid": semdertag
        }});
    }

    const command = comm
    const args = body.trim().split(/ +/).slice(1)
    const isCmd = cmd
    const isGroup = from.endsWith('@g.us')
    const sender = lin.key.fromMe ? lintod.user.jid: isGroup ? lin.participant: lin.key.remoteJid
    const senderNumber = sender.split("@")[0]
    const groupMetadata = isGroup ? await lintod.groupMetadata(from): ''
    const groupName = isGroup ? groupMetadata.subject: ''

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
      encmediaa = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: lin
      encmediaa = isQuotedSticker ? JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: lin
      encmediaa = isQuotedAudio ? JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: lin
      encmediaa = isQuotedVideo ? JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: lin
      encmediaa = JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
      if (save) return await lintod.downloadAndSaveMediaMessage(encmediaa)
      return await lintod.downloadMediaMessage(encmediaa)
    }

    Log(isGroup, isCmd, typeMessage, senderNumber, groupName)

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
        var usernamea = args.join(" ")
        await unfollow(usernamea, from, prefix)
        break
      case "follow":
        if (!args.length) return reply('Masukan username yang mau di follow')
        var usernamea = args.join(" ")
        await follow(usernamea, from, prefix)
        break
      case "upinstastory":
        if (!isQuotedImage) return reply("baru support image kak")
        var media = await downloadM()
        var uplii = await uptotele(media)
        var ini = args.join(" ")
        await upinstastory(uplii, ini, from, prefix)
        break
      case "help":
        reply(menu(prefix))
        break
      case "likepost":
        if (!args.length) return reply("Link postingan yang mau di like mana?")
        var id = args.join(" ")
        await likepost(id, from, lin, prefix)
        break
      case "unlikepost":
        if (!args.length) return reply("Link postingan yang mau di like mana?")
        var id = args.join(" ")
        await unlikepost(id, from, lin, prefix)
        break
      case "komen":
        if (!args.length) return reply("Link yang mau di add komen mana")
        var gh = body.slice(7)
        var link = gh.split("|")[0];
        var caption = gh.split("|")[1];
        if (!link) return reply("link nya mana?")
        if (!caption) return reply(`tambahin caption example ${prefix}komen https://www.instagram.com/p/CREaysLgeG4/?utm_medium=copy_link|komen mu`)
        await komen(link, caption, from, lin, prefix)
        break
      case "blockig":
        if (!args.length) return reply("Username akunnya mana?")
        var username = args.join(" ")
        await block(username, from, lin, prefix)
        break
      case "unblockig":
        if (!args.length) return reply("Username akunnya mana?")
        var username = args.join(" ")
        await unblock(username, from, lin, prefix)
        break
      case "igdl":
        if (!args.length) return reply("link nya mana dek?")
        await downloadig(args[0], from, lin, prefix)
        break
      case "igstory":
        if (!args.length) return reply("username nya mana dek?")
        await igstory(args[0], from, lin, prefix)
        break
      case "tictactoe":
        var Tictac = require('./lib/tiktaktu.js')
        await Tictac.startSolo(sender, from)
        break
    }
  } catch (e) {
    LogError(e)
  }
})