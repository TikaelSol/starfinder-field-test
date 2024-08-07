export function accessInfosphere(SingleCheckAction) {
    const PREFIX = "SF2E.Actions.AccessInfosphere";
    return new SingleCheckAction({
        description: `${PREFIX}.Description`,
        name: `${PREFIX}.Title`,
        notes: [
            { outcome: ["criticalSuccess"], text: `${PREFIX}.Notes.criticalSuccess` },
            { outcome: ["success"], text: `${PREFIX}.Notes.success` },
            { outcome: ["criticalFailure"], text: `${PREFIX}.Notes.criticalFailure` },
        ],
        rollOptions: ["action:access-infosphere"],
        section: "skill",
        slug: "access-infosphere",
        statistic: "computers",
        traits: ["concentrate", "exploration", "secret"],
    });
}
