export function stop(SimpleAction) {
    const PREFIX = "SF2E.Actions.Stop";
    return new SimpleAction({
        cost: 1,
        description: `${PREFIX}.Description`,
        name: `${PREFIX}.Title`,
        section: "skill",
        slug: "stop",
        traits: ["manipulate"],
    });
}
