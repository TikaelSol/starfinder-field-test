export function runOver(SingleCheckAction) {
    const PREFIX = "SF2E.Actions.RunOver";
    return new SingleCheckAction({
        cost: 3,
        description: `${PREFIX}.Description`,
        name: `${PREFIX}.Title`,
        notes: [{outcome: ["criticalFailure", "failure"], text: `${PREFIX}.Notes.failure`}],
        rollOptions: ["action:run-over"],
        section: "skill",
        slug: "run-over",
        statistic: "piloting",
        traits: ["move", "reckless"],
    });
}
