const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(message.author.id !== ayarlar.sahip) return message.reply('Bu komut bot sahibine özeldir!')
  let id = args[0];
  let gonderilecek = args.slice(1).join(` `)
  
  if(!id) return message.channel.send(`Bir kullanıcı veya kanal IDsi girmelisin! \nDoğru Kullanım:  \`${prefix}mesajat <id> <yazı>\``);
  if(isNaN(id) && !message.mentions.users.first()) return message.channel.send(`Bu bir ID değil! \nDoğru Kullanım:  \`${prefix}mesajat <id> <yazı>\``);
  if(!gonderilecek) return message.channel.send(`Gönderilecek yazıyı girmelisin! \nDoğru Kullanım:  \`${prefix}mesajat <id> <yazı>\``);
  
  let gonderilen
  if(client.channels.has(id)) gonderilen = client.channels.get(id)
  else if(client.users.has(id)) gonderilen = client.users.get(id) || client.users.get(message.mentions.users.first().id)
  if(!gonderilen) return message.channel.send(`Botun belirtilen ID'ye sahip kullanıcısı veya kanalı bulunamadı!`)
  
  gonderilen.send(gonderilecek);
  message.channel.send(`Belirttiğiniz yazı başarıyla belirtilen ID'ye gönderildi!`).then(a => a.delete(5000))
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mesaj', 'pm','dm'],
  permLevel: 4
};

exports.help = {
  name: 'm',
  description: 'Belirtilen ID numarasına belirtilen yazıyı gönderir.',
  usage: 'mesajat <id> <yazı>',
  kategori: 'sahip'
};