import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '𝑴𝑬𝑵𝑼×𝑰𝑵𝑭𝑶 ',
  'buscador': '𝑴𝑬𝑵𝑼×𝑩𝑼𝑺𝑸𝑼𝑬𝑫𝑨𝑺',
  'fun': '𝑴𝑬𝑵𝑼×𝑱𝑼𝑬𝑮𝑶𝑺',
  'gacha': '𝑴𝑬𝑵𝑼×𝑮𝑨𝑪𝑯𝑨',
  'serbot': '𝑴𝑬𝑵𝑼×𝑺𝑼𝑩 𝑩𝑶𝑻𝑺',
  'rpg': '𝑴𝑬𝑵𝑼×𝑹𝑷𝑮',
  'rg': '𝑴𝑬𝑵𝑼×𝑹𝑬𝑮𝑰𝑺𝑻𝑹𝑶',
  'xp': '𝑴𝑬𝑵𝑼×𝑬𝑿𝑷',
  'sticker': '𝑴𝑬𝑵𝑼×𝑺𝑻𝑰𝑪𝑲𝑬𝑹𝑺',
  'anime': '𝑴𝑬𝑵𝑼×𝑨𝑵𝑰𝑴𝑬𝑺',
  'database': '𝑴𝑬𝑵𝑼×𝑫𝑨𝑻𝑨𝑩𝑨𝑺𝑬',
  'fix': '𝑴𝑬𝑵𝑼×𝑭𝑰𝑿𝑴𝑺𝑮𝑬𝑺𝑷𝑬𝑹𝑨',
  'grupo': '𝑴𝑬𝑵𝑼×𝑮𝑹𝑼𝑷𝑶𝑺',
  'nable': '𝑴𝑬𝑵𝑼×𝑶𝑵/𝑶𝑭𝑭', 
  'descargas': '𝑴𝑬𝑵𝑼×𝑫𝑬𝑺𝑪𝑨𝑹𝑮𝑨𝑺',
  'tools': '𝑴𝑬𝑵𝑼×𝑯𝑬𝑹𝑹𝑨𝑴𝑰𝑬𝑵𝑻𝑨𝑺',
  'info': '𝑴𝑬𝑵𝑼×𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑪𝑰𝑶𝑵',
  'nsfw': '𝑴𝑬𝑵𝑼×𝑵𝑺𝑭𝑾', 
  'owner': '𝑴𝑬𝑵𝑼×𝑶𝑾𝑵𝑬𝑹', 
  'audio': '𝑴𝑬𝑵𝑼×𝑨𝑼𝑫𝑰𝑶𝑺', 
  'ai': '𝑴𝑬𝑵𝑼×𝑨𝑰',
  'transformador': '𝑴𝑬𝑵𝑼×𝑪𝑶𝑵𝑽𝑬𝑹𝑻𝑰𝑫𝑶𝑹𝑬𝑺',
}

const defaultMenu = {
  before: `🎁 𝐌𝐞𝐧𝐮 𝐎𝐟𝐢𝐜𝐢𝐚𝐥 𝐃𝐞 𝐌𝐚𝐬𝐡𝐚 𝐊𝐮𝐣𝐨𝐮 🧸

⋅˚₊‧ ୨୧ ‧₊˚ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑 ⋅˚₊‧ ୨୧ ‧₊˚

🦋 🄲ʟɪᴇɴᴛᴇ » \`\`\`%name\`\`\`
✨ 🄴xᴘ » \`\`\`%exp\`\`\`
💴 🅈ᴇɴᴇs » \`\`\`%yenes\`\`\`
🛡 🄽ɪɴᴠᴇʟ » \`\`\`%level\`\`\`
💫 🅁ᴀɴɢᴏ » \`\`\`%role\`\`\`

˚₊‧ ୨୧ ‧₊˚ ⋅ 𝐈𝐍𝐅𝐎 𝐃𝐄 𝐋𝐀 𝐁𝐎𝐓 ⋅˚₊‧ ୨୧ ‧₊˚

🍓 🄴ᴅɪᴛᴏʀ » \`\`\`Legna\`\`\`
🍓 🄱ᴏᴛ » \`\`\`%botofc\`\`\`
🍓 🄵ᴇᴄʜᴀ » \`\`\`%fecha\`\`\`
🍓 🄰ᴄᴛɪᴠɪᴅᴀᴅ » \`\`\`%muptime\`\`\`
🍓 🅄sᴜᴀʀɪᴏs » \`\`\`%totalreg\`\`\`

\t*L I S T A  -  D E  -  C O M A N D O S* 
`.trimStart(),
    header: '✨🎄 %category 🎄✨ \n',
  body: '𓍢ִ໋🧡͙֒ %cmd',
  footer: '',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, yenes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        yenes: plugin.yenes,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? 'Oficial' : 'SubBot'), 
fecha: moment.tz('America/Bogota').format('DD/MM/YY'), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, yenes, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

let category = "video"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const rlink = db_.links[category][random]
global.vid = rlink
const response = await fetch(vid)
const gif = await response.buffer()

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/TcfhE.jpg')

//await conn.reply(m.chat, '*Próximamente se remitirá el menú.*', fkontak, { contextInfo:{ forwardingScore: 2022, isForwarded: true, externalAdReply: {title: packname, body: dev, sourceUrl: redeshost, thumbnail: await (await fetch(pp)).buffer() }}})

await m.react('🍁') 

await conn.sendMessage(m.chat, { video: { url: vid }, caption: text.trim(), contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363318758721861@newsletter', newsletterName: 'Tҽαɱ Cԋαɳɳҽʅ Iαɳ 🌸', serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: 'MashaBot :3', body: dev, thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: fkontak })

//await conn.sendMessage(m.chat, {text: text, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: 'Tҽαɱ Cԋαɳɳҽʅ Iαɳ 🌸', newsletterJid: "120363318758721861@newsletter", }, externalAdReply: { title: 'Aƙαɾι Bσƚ ༊', body: dev, thumbnailUrl: 'https://qu.ax/HHXnW.jpg', sourceUrl: redeshost, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: fkontak})

  } catch (e) {
    await m.react(error)
    conn.reply(m.chat, '「✘」 *Ocurrió un error al enviar el menú*', m, fake, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'allmenu', 'menucompleto'] 
handler.register = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;
