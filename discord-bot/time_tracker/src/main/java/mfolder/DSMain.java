package mfolder;

import cmds.cdefault;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.requests.GatewayIntent;

import javax.security.auth.login.LoginException;

public class DSMain {
    public static final String token = "MTA2Njc5ODQ1MTAxNjM0NzgxOQ.G0pnet.65VnHepcczuFXhV82NANsft3n4wanyHAUPeolk";
    public static void main(String[] args) throws LoginException, InterruptedException {
        JDA bot = JDABuilder.createLight(token, GatewayIntent.GUILD_MESSAGES, GatewayIntent.MESSAGE_CONTENT)
                .setActivity(Activity.listening("The Top G"))
                .addEventListeners(new DSListeners())
                .addEventListeners(new cdefault())
                .setBulkDeleteSplittingEnabled(false)
                .build()
                .awaitReady();

        Guild svhsp = bot.getGuildById("1066668147450585148");
        if(svhsp != null) {
            svhsp.upsertCommand("settimer","set a pomodoro timer")
                    .addOption(OptionType.INTEGER, "worktime", "time set to work",true)
                    .addOption(OptionType.INTEGER, "breaktime", "time set to break",true)
                    .addOption(OptionType.INTEGER, "cycles","number of cycles", true)
                    .queue();
        }
    }
}
