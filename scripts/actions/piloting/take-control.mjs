export function takeControl(SingleCheckAction) {
    const PREFIX = "SF2E.Actions.TakeControl";
    return new SingleCheckAction({
        cost: 1,
        description: `${PREFIX}.Description`,
        name: `${PREFIX}.Title`,
        notes: [{outcome: ["criticalSuccess", "success"], text: `${PREFIX}.Notes.success`}],
        rollOptions: ["action:take-control"],
        section: "skill",
        slug: "take-control",
        statistic: "piloting",
        traits: ["manipulate"],
    });
}
