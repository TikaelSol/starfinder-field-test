import { createAreaFireMessage, listenAreaFireMessage } from "./actions/area-fire.mjs";
import { initializeActions } from "./actions/index.mjs";

const MODULE_ID = "starfinder-field-test-for-pf2e";

function applyTheme(themeId) {
    const headEl = document.head;
    headEl.querySelector(`link[href*=${MODULE_ID}]`)?.remove();
    if (themeId !== "none") {
        const linkEl = document.createElement("link");
        linkEl.href = `modules/${MODULE_ID}/styles/${themeId}.css`;
        linkEl.rel = "stylesheet";
        linkEl.type = "text/css";
        linkEl.media = "all";
        headEl.querySelector("link:last-of-type").after(linkEl);
    }
}

Hooks.once("init", () => {
    game.settings.register(MODULE_ID, "theme", {
        name: "SF2E.SETTINGS.Theme.Name",
        config: true,
        scope: "client",
        type: new foundry.data.fields.StringField({
            required: true,
            nullable: true,
            blank: false,
            choices: {
                none: "SF2E.SETTINGS.Theme.None",
                dark: "SF2E.SETTINGS.Theme.Dark",
                "high-contrast": "SF2E.SETTINGS.Theme.HighContrast",
                light: "SF2E.SETTINGS.Theme.Light"
            },
            initial: "none",
        }),
        onChange: (themeId) => {
            applyTheme(themeId);
        },
    });

    initializeActions();
});

Hooks.once("setup", () => {
    applyTheme(game.settings.get(MODULE_ID, "theme"));
});

// Add Area Damage Aux Button to the character sheet
Hooks.on("renderCharacterSheetPF2e", (sheet, html) => {
    const actor = sheet.actor;
    for (const strikeRow of html.find("[data-strike]")) {
        const action = actor.system.actions[strikeRow.dataset.actionIndex];
        const item = action.item;
        const isArea = item.system.traits.value.some((t) => t.startsWith("area-"));
        const isAutomatic = item.system.traits.value.includes("automatic");
        if (!isArea && !isAutomatic) continue;

        const auxActions = strikeRow.querySelector(".auxiliary-actions.weapon-drawn");
        if (!auxActions) continue;

        const label = game.i18n.localize(`SF2E.Actions.${isArea ? "AreaFire" : "AutoFire"}.Title`);
        const button = $(`<button class="use-action" type="button"><span>${label}</span> <span class="action-glyph">2</span></button>`);
        $(auxActions).prepend(button);
        button.on("click", () => {
            createAreaFireMessage(item);
        });
    }
});


Hooks.on('renderChatMessage', (message, $html) => {
    listenAreaFireMessage(message, $html.get(0));
});
