const { MessageType, mentionedJid, processTime } = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require('fs');
const chalk = require("chalk");
const { convertSticker } = require("./lib/sticker.js");
const { setppig, block, unblock, komen, login, logout, follow, upinstastory, unfollow, likepost, unlikepost } = require("./lib/handlerIg.js");
const { y2mateV, y2mateA } = require("./lib/ytdl.js");
const { Log, LogError } = require("./lib/log.js");
const { downloadig, igstory } = require("./lib/instadl.js");
const { uptotele, uptonaufal, uploadFile } = require('./lib/uploadimage');
const { menu } = require("./lib/menu");
const { getBuffer, getRandom } = require ("./lib/help");
const util = require("util");
const { exec } = require("child_process");
const conn = require("./lib/connect");
const yts = require("yt-search");

conn.connect()
const lintod = conn.lintod

let multipref = true;
let self = true;
let noprefix = false;
let author = "@linlxn.8"
let pack = "github.com/mccnlight"

lintod.on('chat-update', async(lin) => {
  try {
    if (!lin.hasNewMessage) return
    if (!lin.messages) return
    if (lin.key && lin.key.remoteJid == 'status@broadcast') return
    lin = lin.messages.all()[0]
    if (!lin.message) return
    lin.message = (Object.keys(lin.message)[0] === 'ephemeralMessage') ? lin.message.ephemeralMessage.message: lin.message
    if (self) {
    if (!lin.key.fromMe) return;
    }
    const content = JSON.stringify(lin.message)
    const from = lin.key.remoteJid
    const type = Object.keys(lin.message)[0]
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
    const quoted = type == 'extendedTextMessage' && lin.message.extendedTextMessage.contextInfo != null ? lin.message.extendedTextMessage.contextInfo.quotedMessage || []: []
    const typeQuoted = Object.keys(quoted)[0]
    const body = lin.message.conversation || lin.message[type].caption || lin.message[type].text || ""
    let userMsg = (type === 'conversation' && lin.message.conversation) ? lin.message.conversation: (type == 'imageMessage') && lin.message.imageMessage.caption ? lin.message.imageMessage.caption: (type == 'videoMessage') && lin.message.videoMessage.caption ? lin.message.videoMessage.caption: (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text ? lin.message.extendedTextMessage.text: ''

    if (multipref) {
      var prefix = /^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_•\/\\Â©^<+]/.test(userMsg) ? userMsg.match(/^[Â°â€¢Ï€Ã·Ã—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢âœ“=|~!?@#%^&.zZ_+•\/\\Â©^<+]/gi)[0]: '-'
    } else {
      if (noprefix) {
        prefix = ""
      }
    }

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
    
    const sendContact = async(jid, number, name, bio = "Kontak", quoted, options) => {
      // TODO: Business Vcard
      number = number.replace(/[^0-9]/g, '')
      let njid = number + '@s.whatsapp.net'
      let { isBusiness } = await lintod.isOnWhatsApp(njid) || { isBusiness: false }
      let vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + name + '\n' + 'ORG:'+bio+'\n' + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' + 'END:VCARD'.trim()
      return await lintod.sendMessage(jid, {
         displayName: name,
         vcard
      }, MessageType.contact, { quoted, ...options })
    } // example use await sendContact(from, "0", "WhatsApp", "a simple bot made with nodejs", lin)
    
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
    
    var idButton = type === "buttonsResponseMessage" ? lin.message.buttonsResponseMessage.selectedButtonId: ""
    var idButton = `${idButton}`
    switch (idButton) {
      case "example":
        reply("this response button 1");
        break
      case "example2":
        reply("this response button 2");
        break
    }

    switch (command) {
      case "soundcloud":
      case "scdl":
        if (!args.length) return reply("Masukan lin yang ingin di download, contoh #soundcloud link")
          var q = args.join(" ")
          var a = await axios.get(`https://megayaa.herokuapp.com/api/soundcloud?url=${q}`)
          var { title, result } = a.data
          await lintod.sendMessage(from, {url: a.data.image}, image, {caption: title, quoted: lin})
          await lintod.sendMessage(from, {url: result}, audio, {quoted: lin})
        break
      case "ytsearch":
        if (!args.length) return reply("Masukan query yang ingin dicari, contoh #ytsearch billie eilish")
          var q = args.join(" ")
          var a = await axios.get(`https://megayaa.herokuapp.com/api/ytsearch?judul=${q}`)
          var urut = 1
          var captin = `*Youtube Search*`
          for (let i = 0; i < a.data.result.length; i++) {
             captin += `\n\n*Urutan ${urut++}*\n📜 *Title :* ${a.data.result[i].title}\n📬 *ID :* ${a.data.result[i].id}\n📺 *Author :* ${a.data.result[i].author}\n⌚ *Upload at :* ${a.data.result[i].ago}\n🎞️ *Views :* ${a.data.result[i].views}\n⏱️ *Duration :* ${a.data.result[i].timestamp}\n🖇️ *Url :* ${a.data.result[i].url}`
          }
          captin += "\n\n"
          for (let i = 0; i < a.data.result.length; i++) {
             captin += `(#)${a.data.result[i].id}`
          }
          lintod.sendMessage(from, {url: a.data.result[0].thumb}, image, {thumbnail: Buffer.alloc(0), caption: captin})
        break
      case "sticker":
        if (type === "imageMessage" || isQuotedImage){
          var dlfile = await downloadM();
          var bas64 = `data:image/jpeg;base64,${dlfile.toString('base64')}`
          var mantap = await convertSticker(bas64, `${author}`, `${pack}`);
          var imageBuffer = new Buffer.from(mantap, 'base64');
          lintod.sendMessage(from, imageBuffer, sticker, {quoted: lin});
          } else {
	    reply("Reply foto dengan caption "+prefix+"sticker")
          }
        break
      case "button":
        var buttons = [{ buttonId: 'example', buttonText: { displayText: 'yes' }, type: 1 }, { buttonId: 'example2', buttonText: { displayText: 'no' }, type: 1 }]
        var buttonsMessage = { contentText: `Do you love me?`, footerText: 'click this', buttons: buttons, headerType: 1 }
        var sendMsg = await lintod.prepareMessageFromContent(from, { buttonsMessage }, {})
        lintod.relayWAMessage(sendMsg, { waitForAck: true })
        break
      case "ytdl":
        if (!args.length) return reply(`Masukan link\n\nExample : ${prefix}ytdl https://youtu.be/oitBJxR9UUE -video`)
        argz = args.join(" ")
        if (!argz.endsWith("-video") && !argz.endsWith("-audio")) return reply("Masukan option\n\nOption :\n\n- audio\n- video\n\nExample : !ytdl link -video")
        if (argz.endsWith("-video")) {
          await y2mateV(args[0], from, lin)
        } else if (argz.endsWith("-audio")) {
          await y2mateA(args[0], from, lin)
        }
        break
      case "prefix":
        if (!args.length) return reply(`Opsi prefix\n\n- noprefix\n- multi\n\nExample : ${prefix}prefix noprefix`)
        if (args[0] === "multi") {
          multipref = true;
          reply("berhasil mengubah ke multi prefix")
        } else if (args[0] === "noprefix") {
          multipref = false;
          noprefix = true;
          reply("berhasil mengubah ke no prefix")
        } else {
          reply("pilih multi atau norefix")
        }
        break
      case "test":
        if (!args[0].match(/a|b|c/)) return reply("pilih a b atau c");
        break
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
      case "mode":
        if (!args.length) return reply("Masukan option\n\n1. -public\n2. -self\n\nExample : #mode -public")
        if (args[0] === "-public") {
        self = false;
        reply(`Succes`)
        } else if (args[0] === "-self") {
        self = true;
        reply(`Succes`)
        }
        break
      case "toimg":
	if (!isQuotedSticker) return reply("send sticker and reply with caption " + prefix + "toimg");
	if (lin.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated === true){
          reply("Maaf tidak mendukung sticker gif");
        } else {
          var media2 = await downloadM("save")
	  var ran = getRandom('.png')
          exec(`ffmpeg -i ${media2} ${ran}`, (err) => {
	  fs.unlinkSync(media2)
            if (err) {
	      reply(util.format(err))
              fs.unlinkSync(ran)
	    } else {
	      var buffer = fs.readFileSync(ran)
	      lintod.sendMessage(from, buffer, MessageType.image, {quoted: lin, caption: 'success'})
	      fs.unlinkSync(ran)
	    }
	  })
	 }
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
