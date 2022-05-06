const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const token = process.env.TOKEN;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in...`);
});

client.on("message", (msg) => {
  msg.reply("pong");
});

client.login(token);
