const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos


client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("767370195559645195");
  let channel = await client.channels.cache.get("837145708821610556");
        if (guild != member.guild) {
        return console.log('Saiu');
    } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#f55b04")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Alguem saiu do server`)
      .setDescription(`**${member.user.username}** Saiu do servidor, Espero que um dia ele volte, agora estamos com **${member.guild.memberCount}** membros `)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setTimestamp();

    channel.send(embed);
    }
});


 client.on('guildMemberAdd', async member => {
    let guild = await client.guilds.cache.get('767370195559645195');
    let channel = await client.channels.cache.get('837145708821610556');
          if (guild != member.guild) {
        return console.log('Entrou');
    } else {
        let embed = await new Discord.MessageEmbed()
            .setColor('#f55b04')
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`Seja muito Bem vindo(a)`)
            .setImage('https://i.imgur.com/V9h2VaO.gif')
            .setDescription(
                `Olá **${member.user.username}** Bem vindo ao servidor Foox Rp 
                Vem te divertir connosco \n\n ** Le as regras antes de entrares no servidor** \n <#801802722591899648>`
            )
        channel.send(embed);
    }
});


client.on("message", async message => {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  if (regex.exec(message.content)) {
    await message.delete({timeout: 1000});
      await message.channel.send(
        `${message.author} **você não pode postar link de outros servidores aqui!**`
      );
  }
});


client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("767370195559645195");
  let channel = await client.channels.cache.get("767370195559645197");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "enter");
  if (guild != member.guild) {
    return console.log("Algum saco pela saiu do servidor. Mas não é nesse, então tá tudo bem :)");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Adeus! ${emoji}`)
      .setImage("https://imgur.com/3vYVlHb.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Código de Hyouka Discord")
      .setTimestamp();

    channel.send(embed);
  }
});


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});


client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token

h