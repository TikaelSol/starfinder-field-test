export function program(SingleCheckAction) {
    const PREFIX = "SF2E.Actions.Program";
    return new SingleCheckAction({
        description: `${PREFIX}.Description`,
        name: `${PREFIX}.Title`,
        notes: [
            { outcome: ["criticalSuccess"], text: `${PREFIX}.Notes.criticalSuccess` },
            { outcome: ["success"], text: `${PREFIX}.Notes.success` },
            { outcome: ["failure"], text: `${PREFIX}.Notes.failure` },
            { outcome: ["criticalFailure"], text: `${PREFIX}.Notes.criticalFailure` },
        ],
        rollOptions: ["action:program"],
        section: "skill",
        slug: "program",
        statistic: "computers",
        traits: ["downtime", "manipulate"],
    });
}
