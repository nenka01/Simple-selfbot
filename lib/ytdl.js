const fetch = require('node-fetch')
const cheerio = require('cheerio')
const connect = require("./connect");
const lintod = connect.lintod
const {
  getBuffer
} = require("./help.js");
const {
  MessageType,
  Mimetype
} = require("@adiwajshing/baileys");
const axios = require("axios")

const y2mateV = async (linkyt, from, lin) => {
  var gett = await axios.get(`https://lindow-api.herokuapp.com/api/ytmp4?link=${linkyt}&apikey=LindowApi`)
  var { thumb, title, dl_link, filesizeF } = gett.data
  var b = await getBuffer(thumb)
  await lintod.sendMessage(from, b, MessageType.image, {
    caption: `── 「 YTMP4 」 ──

➸ Judul : ${title}
➸ Ukuran : ${filesizeF}
➸ Kualitas : 360p
➸ Nama File : ${title}.mp4
➸ Output : mp4

Tunggu sebentar sedang mengirim video`, quoted: lin
  })
  var a = await getBuffer(dl_link)
  lintod.sendMessage(from, a, MessageType.video, {
    quoted: lin, mimetype: Mimetype.mp4, filename: `${title}.mp4`
  })
}


const y2mateA = async (yutub, from, lin) => {
  function post(url, formdata) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: "*/*",
        'accept-language': "en-US,en;q=0.9",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: new URLSearchParams(Object.entries(formdata))
    })
  }
  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(yutub)
  url = 'https://youtu.be/' + ytId[1]
  let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  const mela = await res.json()
  const $ = cheerio.load(mela.result)
  let thumb = $('div').find('.thumbnail.cover > a > img').attr('src')
  let judul = $('div').find('.thumbnail.cover > div > b').text()
  let size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text()
  let tipe = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype')
  let output = `${judul}.` + tipe
  let quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality')
  let id = /var k__id = "(.*?)"/.exec(mela.result)[1]
  let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
    type: 'youtube',
    _id: id,
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: tipe,
    fquality: quality
  })
  const meme = await res2.json()
  const supp = cheerio.load(meme.result)
  let link = supp('div').find('a').attr('href')
  var a = await getBuffer(thumb)
  lintod.sendMessage(from, a, MessageType.image, {caption : `── 「 YTMP3 」 ──
  
➸ Judul : ${judul}
➸ Ukuran : ${size}
➸ Kualitas : ${quality}kbps
➸ Nama File : ${output}
➸ Output : ${tipe}
Tunggu sebentar sedang mengirim audio`})
  var b = await getBuffer(link)
  lintod.sendMessage(from, b, MessageType.audio, {mimetype: Mimetype.mp4Audio, quoted: lin})
}

module.exports = {
  y2mateV,
  y2mateA
}
