package cmds;

import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.OptionMapping;
import org.jetbrains.annotations.NotNull;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;

public class cdefault extends ListenerAdapter {

    public static LocalDate date = LocalDate.now(ZoneId.of("America/Los_Angeles"))
            .with(TemporalAdjusters.previous(DayOfWeek.SUNDAY));

    public void onSlashCommandInteraction(@NotNull SlashCommandInteractionEvent event) {
            event.deferReply().queue();
            if (event.getName().equals("settimer")) {
                OptionMapping m = event.getOption("worktime");
                OptionMapping c = event.getOption("breaktime");
                OptionMapping n = event.getOption("cycles");
                int worktime = m.getAsInt();
                int breaktime = c.getAsInt();
                int cycles = n.getAsInt();
                TextChannel textChannel = event.getGuild().getTextChannelsByName("general",true).get(0);

                event.getHook().sendMessage("You have set a new timer for " +cycles+" cycles of "+ worktime +" minutes of work and " + breaktime + " minutes of break.").queue();
                cycle.cycleTimer(worktime, breaktime, cycles, textChannel, event.getUser());
        }
    }
}
