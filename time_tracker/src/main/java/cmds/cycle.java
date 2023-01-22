package cmds;

import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.entities.User;

import java.util.Date;
import java.util.Timer;

public class cycle {
    Timer timer = new Timer();
    static long startTime = System.currentTimeMillis();
    static long elapsedTime = 0L;
    public static void cycleTimer(int worktime, int breaktime, int numcycles, TextChannel textChannel, User user) {
        int timeseconds;
        worktime *= 60;
        breaktime *= 60;
        boolean working = true;
        int counter = 0;
        while(true) {
            elapsedTime = (new Date()).getTime() - startTime;
            timeseconds = (int) (elapsedTime/1000);
            if(working) {
                if(timeseconds > worktime) {
                    working = false;
                    startTime = System.currentTimeMillis();
                    elapsedTime = 0L;
                    textChannel.sendMessage("<@"+user.getId()+"> Your work period is over. Time to take a break!").queue();
                }
            } else {
                if(timeseconds > breaktime) {
                    working = true;
                    startTime = System.currentTimeMillis();
                    elapsedTime = 0L;
                    textChannel.sendMessage("<@"+user.getId()+"> Your break period is over. Time to get back to work!").queue();
                    counter++;
                }

            }
            if(counter == numcycles) break;
        }

    }
}
