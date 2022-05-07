import { DiscordRequest } from "./utils.js";

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === "" || appId === "") return;

  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: "GET" });
    const data = await res.json();

    if (data) {
      const installedNames = data.map((c) => c["name"]);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command["name"])) {
        console.log(`Installing "${command["name"]}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        console.log(`"${command["name"]}" command already installed`);
        PatchGuildCommand(appId, guildId, command);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: "POST", body: command });
  } catch (err) {
    console.error(err);
  }
}

// Patches a command
export async function PatchGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // patch command
  try {
    await DiscordRequest(endpoint, { method: "PATCH", body: command });
  } catch (err) {
    console.error(err);
  }
}

// Command containing options
export const ROLL_COMMAND = {
  name: "roll",
  description: "Cast the dice of fate",
  options: [
    {
      type: 3,
      name: "mod",
      description: "Dose the outsider smile upon you?",
      required: true,
      choices: [
        {
          name: "None",
          value: "none",
        },
        {
          name: "Advantage",
          value: "advantage",
        },
        {
          name: "Disadvantage",
          value: "disadvantage",
        },
      ],
    },
  ],
  type: 1,
};
