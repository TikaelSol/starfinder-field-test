import { accessInfosphere } from "./computers/access-infosphere.mjs";
import { hack } from "./computers/hack.mjs";
import { program } from "./computers/program.mjs";
import { drive } from "./piloting/drive.mjs";
import { navigate } from "./piloting/navigate.mjs";
import { plotCourse } from "./piloting/plot-course.mjs";
import { runOver } from "./piloting/run-over.mjs";
import { stop } from "./piloting/stop.mjs";
import { stunt } from "./piloting/stunt.mjs";
import { takeControl } from "./piloting/take-control.mjs";

export function initializeActions() {
    const SimpleAction = game.pf2e.actions.get("crawl")?.constructor;
    const SingleCheckAction = game.pf2e.actions.get("balance")?.constructor;

    [
        // Computers
        accessInfosphere(SingleCheckAction),
        hack(SingleCheckAction),
        program(SingleCheckAction),

        // Piloting
        drive(SingleCheckAction),
        navigate(SingleCheckAction),
        plotCourse(SingleCheckAction),
        runOver(SingleCheckAction),
        stop(SimpleAction),
        stunt(SingleCheckAction),
        takeControl(SingleCheckAction),
    ].forEach((action) => game.pf2e.actions.set(action.slug, action));
}
