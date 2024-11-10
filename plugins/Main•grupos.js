
import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* 🍂

1- 𝑴𝑨𝑺𝑯𝑨 𝑲𝑼𝑱𝑶𝑼 𝑶𝑭𝑰𝑪𝑰𝑨𝑳🧸💫
*✰* ${grupo}

*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*

➠ Enlace anulado? entre aquí! 

☁ Tҽαɱ Cԋαɳɳҽʅ Iαɳ 🌸
*✰* ${channel}

> ${dev}`

await conn.sendFile(m.chat, imagen2, "akari.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = ['grupos', 'iangrupos', 'gruposian']
export default handler
