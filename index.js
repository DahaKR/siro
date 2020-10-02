const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json');

client.on('ready', () => {
    console.log('BOT IS READY.')
    client.user.setActivity('시로는 노래', { type: 'LISTENING' });
});

client.on('message', message => {
    if(message.content == '시로야 도움') {
        const embed = new Discord.MessageEmbed()
        .setColor('#91d18b')
        .setTitle('시로의 도움말이에요!')
        .setDescription(`<@${message.author.id}> 님이 도움을 요청하셨어요!`)
        .setDescription('시로야 핑\n시로야 봇 정보\n시로야 입장\n==========\n\n"시로야 음성방 도움"으로 음성방의 기능을 알아보세요! :)')
        message.channel.send({ embed: embed })
    }

    if(message.content == '시로야 입장') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.green)
        .setTitle('시로봇 서포트서버 입장하기!')
        .setURL('https://discord.gg/tzcazxW')
        message.channel.send({ embed: embed })
    }

    if(message.content == '시로야 음성방 도움') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.green)
        .setTitle('음성방 도움이에요!')
        .setDescription('시로야 들어와\n시로야 나가\n==========\n\n시로는 10살이에요! 음치라서 노래를...ㅎ')
        message.channel.send({ embed: embed })
    }

    if(message.content == '시로야 핑') {
        const embed = new Discord.MessageEmbed()
        .setColor('#91d18b')
        .setTitle('시로의 핑이에요! 😀')
        .setDescription(client.ws.ping +"ms 입니다!")
        .setImage('https://pbs.twimg.com/profile_images/1112382427182174209/kk8LFTRf_400x400.jpg')
        message.channel.send({ embed: embed })
    }

    if(message.content == '시로야 봇 정보') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.green)
        .setTitle('시로 봇 정보!')
        .setDescription(`
<@${message.author.id}> 님이 봇 정보를 알고 싶데요!\n
봇 개발자 : 다하#0001\n
개발 시작 : 2020년 9월 27일 오후 2시\n
서버 갯수 : ${client.guilds.cache.size}\n\n
봇 호스팅 정보를 알고 싶다면 "시로야 호스팅 정보"를 해 보세요! 😀`)
        message.channel.send({ embed: embed })
    }

    if(message.content == '시로야 호스팅 정보') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.green)
        .setTitle('시로의 호스팅 정보를 알려드릴께요!')
        .setDescription(`
서버 : 개인 노트북\n
램 : 4GB\n
CPU : Intel(R) Celeron(R) N4000 CPU @ 1.10GHz\n
GPU(그래픽카드) : Intel(R) UHD Graphics 600\n\n
노트북이라 핑이 높을 수 있습니다.
`)
        message.channel.send({ embed: embed })
    }

    if(message.cotent == '시로야 테스트-2') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.green)
        .setTitle('시로봇 초대 링크')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=759641419378982922&permissions=8&scope=bot')
        message.channel.send({ embed: embed })
    }

    if(message.content.startsWith("시로야 들어와")) {
        try {
            message.member.voice.channel.join();
            message.react(config.accept_emoji)
        } catch (error) {
            console.log(error)
            const embed = new Discord.MessageEmbed()
            .setColor(config.red)
            .setDescription('음성채널에 들어간뒤, 시로에게 다시 말씀해 주세요!\n계속 치시면 오류나서 서버 멈춰요ㅠㅠ')
            message.channel.send({ embed: embed })
        }
    }
    
    if(message.content.startsWith("시로야 나가")) {
        try {
            message.member.voice.channel.leave();
            message.react(config.accept_emoji)
        } catch (error) {
            console.log(error)
            const embed = new Discord.MessageEmbed()
            .setColor(config.red)
            .setDescription('음성채널에 들어가서 "시로야 나가"를 해주세요.\n계속 치시면 오류나서 서버 멈춰요ㅠㅠ')
            message.channel.send({ embed: embed })
        }
    }


    if(message.content.startsWith("시로야 실행")) {
        if(config.owners.some(word => message.author.id.includes(word))) {
            let embed2 = new (Discord.MessageEmbed)
                embed2.setAuthor(message.author.username, message.author.avatarURL())
                embed2.setTitle("오류")
                embed2.setDescription("잘못된 클라이언트 종료 방식입니다.")
                embed2.setColor(config.green)
    
            let text = message.content.split("시로야 실행 ")[1] // 하드코딩, 나중에 커맨드 핸들러 사용할 것 권고함
            if(text === undefined) return message.reply('시로야 실행 <command>')
            if(text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
                return message.channel.send(embed2)
            } else {
                const result = new Promise(resolve => resolve(eval(text)))
                return result.then(output => {
                    if(typeof output !== "string")
                        output = require('util').inspect(output, {
                        depth: 0
                    })
                                    
                    if(output.includes(client.token))
                        output = output.replace(client.token, "토큰")
                    if(output.length > 1010)
                        output = (output.slice(0, 1010)+"\n...")
                                
                    let embed = new (Discord.MessageEmbed)
                        embed.setColor(config.green)
                        embed.setDescription(`입력 :\n\`\`\`js\n${text}\n\`\`\`\n출력 :\`\`\`js\n${output}\n\`\`\``) 
                    message.channel.send({ embed: embed })
                }).catch(error => {
                    error = error.toString()
                    error = error.replace(client.token, "토큰")
                            
                    if(error.includes(client.token))
                        error = error.replace(client.token, "토큰")
                            
                    let embed = new (Discord.MessageEmbed)
                        embed.setAuthor(message.author.username, message.author.avatarURL())
                        embed.setTitle("오류")
                        embed.setDescription(error)
                        embed.setColor("#FF0000")
                    message.channel.send({ embed: embed })
                })
            }
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(config.green)
            .setTitle('Error 😕')
            .setDescription(`<@${message.author.id}> 님..이 명령어는 봇 관리자만 사용할 수 있어요..\n죄송합니다..ㅠ`)
            message.channel.send({ embed: embed })
        }
    }

    if(message.content == '시로야 안녕') {
        message.channel.send(`<@${message.author.id}>님 안녕하세요 <a:rainbow_party:760318663852163163>`)
    }

    // 더 이상 사용하지 않는 구문. 

    /* 
    if(message.content == '시로야 업데이트') {
        if(message.author.id == '694036482436104204') {
        const embed = new Discord.MessageEmbed()
        .setColor(config.red)
        .setDescription('현재 시로봇의 오류가 발생했습니다.\n3시까지 고칠수있도록 하겠습니다.\n(봇은 안꺼집니다)\n사용에 불편을 드려 죄송합니다 - 시로 개발자 드림\n<a:rainbow_party:760318663852163163>')
        message.channel.send({ embed: embed })
        } else {
            return message.channel.send('봇 개발자만 가능한 명령어 입니다.')
        }
    }
    */
});

client.login(config.token)
