const Discord = require("discord.js");
const bot = new Discord.Client();
const express = require('express');
const app = express();
const prefix = "!";

const token = 'your discord token here'; 


app.set('port', (process.env.PORT || 5000));

app.get(prefix, function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

bot.on("ready", () => {
    console.log(`${bot.user.tag} has connected to the server!`);
});


bot.on("message", msg => {
    if (msg.channel.id === "requested discord channel here") { 
        if (msg.author.bot) return;
        var command = msg.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];
        

        if (command === "test"){
            msg.channel.send("The Fee Calculator bot is up and running!");
        }

        if (command === "feecalc"){
            let messageArray = msg.content.split(" ");
            let args = messageArray.slice(1);
            if (!args[0])
                return msg.reply("Please insert a price ");
            

            var pricing = args[0];

            let payPal_US = ((pricing * 0.0299));
            let payPal_INT = ((pricing * 0.0449) + (pricing * 0.015))
            let ebay_over = (pricing * 0.08);
            let ebay_under = (pricing * 0.129);
            let goat = ((pricing * 0.095) + 5);
            let grailed_US = (((pricing * 0.09) + (pricing * 0.0349)) + 0.49);
            let grailed_INT = (((pricing * 0.09) + (pricing * 0.0499)) + 0.49);
            let stockx_one = (pricing * 0.10);
            let stockx_two = (pricing * 0.095);
            let stockx_three = (pricing * 0.090);
            let stockx_four = (pricing * 0.085);
            let stockx_five = (pricing * 0.080);

            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              })

            const embed = {
                title: "Your Payout of: " + ((pricing)),
                color: 0x08d0f8,
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                },
                thumbnail: {
                    url:
                        "https://i.dlpng.com/static/png/268736_preview.png"
                },
                author: {
                    name: "Sneaker Nerdz Dev Group",
                    icon_url: bot.displayAvatarURL
                },
                fields: [
                        
                        {name: 'StockX', value: 'Tier 1 (10%): ' + (formatter.format(stockx_one)) + ' | ' + (formatter.format(pricing - stockx_one)) + '\n'
                            + 'Tier 2 (9.5%): ' + (formatter.format(stockx_two)) + ' | ' + (formatter.format(pricing - stockx_two)) + '\n'
                            + 'Tier 3 (9.0%): ' + (formatter.format(stockx_three)) + ' | ' + (formatter.format(pricing - stockx_three)) + '\n'
                            + 'Tier 4 (8.5%): ' + (formatter.format(stockx_four)) + ' | ' + (formatter.format(pricing - stockx_four)) + '\n'
                            + 'Tier 5 (8.0%): ' + (formatter.format(stockx_five)) + ' | ' + (formatter.format(pricing - stockx_five))},                  
                        {
                            name: 'Goat Good Standing (9.5% + $5)',
                            value: (formatter.format(goat)) + ' | ' + (formatter.format(pricing - goat)),
                        },
                        {
                            name: 'eBay',
                            value: 'Over $150 (8.0%): ' + (formatter.format(ebay_over)) + ' | ' + (formatter.format(pricing - ebay_over)) + '\n' 
                            + 'Under $150 (12.9%): ' + (formatter.format(ebay_under)) + ' | ' + (formatter.format(pricing - ebay_under))
                        },
                        {
                            name: 'PayPal',
                            value: 'US (2.99%): ' + (formatter.format(payPal_US)) + ' | ' + (formatter.format(pricing - payPal_US)) + '\n'
                            + 'INT (4.49% + 1.5% INT trans fee): ' + (formatter.format(payPal_INT)) + ' | ' + (formatter.format(pricing - payPal_INT))
                        },
                        {
                            name: 'Grailed',
                            value: 'US (9% + 3.49% + $0.49): ' + (formatter.format(grailed_US)) + ' | ' + (formatter.format(pricing - grailed_US)) + '\n' 
                            + 'Grailed INT (9% + 4.99% + $0.49): ' + (formatter.format(grailed_INT)) + ' | ' + (formatter.format(pricing - grailed_INT))
                        },
                ],
               
                    
                   
                
                Image: {
                    url: "https://i.imgur.com/bmqQR2i.png"
                },
                footer: {
                    text: 'created by DrCheekSlayer'
                },
                timestamp: new Date(),
            };
            msg.channel.send({ embed });
        }

        if (command === "helpme"){

            const embed = {
                title: "Help",
                color: 0x08d0f8,
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                },
                thumbnail: {
                    url:
                        "https://i.imgur.com/bmqQR2i.png"
                },
                author: {
                    name: "Sneaker Nerdz Dev Group",
                    icon_url: bot.displayAvatarURL
                },
                fields: [
                    {
                        name: '!helpme',
                        value: ' The helpme command will show all possible commands that may be used with "Sneaker Nerdz Fee Bot".' 
                    },
                    {
                        name: '!feecalc <insert price here eg. 100>',
                        value: ' feecalc command should be used as follows "!feecalc 100". This command shows how much you will receive and how much in fees you pay for each transactional dollar amount. '
                    },
                    {
                        name: '!test',
                        value: ' This command shows that the bot is up and running. '
                    }
                ],
                footer: {
                    text: 'created by DrCheekSlayer'
                },
                timestamp: new Date(),
            };
            msg.channel.send({ embed });
        }
        
    }
});

bot.login(token);
