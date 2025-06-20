const MODULE_ID = "starfinder-field-test-for-pf2e";
const EXTRA_AREA_OPTIONS = ["damaging-effect", "area-damage", "area-effect"];

/** Posts a new area fire or auto fire weapon to the chat depending on the weapon */
async function createAreaFireMessage(weapon) {
    const actor = weapon.actor;
    const isArea = weapon.system.traits.value.some((t) => t.startsWith("area-"));
    const key = isArea ? "AreaFire" : "AutoFire";

    const savingThrow = calculateSaveDC(weapon);
    const areaLabel = createAreaLabel(calculateArea(weapon));
    const templatePath = "/modules/starfinder-field-test-for-pf2e/templates/area-fire-message.hbs";
    const content = await foundry.applications.handlebars.renderTemplate(templatePath, {
        actor,
        item: {
            img: weapon.img,
            name: game.i18n.localize(`SF2E.Actions.${key}.Title`),
            traits: ["area", "attack"].map((t) => ({
                name: t,
                label: CONFIG.PF2E.actionTraits[t],
                description: CONFIG.PF2E.traitsDescriptions[t]
            })),
            actionCost: 2,
            description: game.i18n.localize(`SF2E.Actions.${key}.Description`),
        },
        areaLabel,
        saveLabel: game.i18n.format("PF2E.SaveDCLabelBasic", {
            dc: savingThrow.dc.value,
            type: game.i18n.localize(CONFIG.PF2E.saves.reflex)
        }),
        saveBreakdown: savingThrow.dc.breakdown,
    });

    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content,
        flags: {
            pf2e: {
                origin: weapon.getOriginData(),
            },
            [MODULE_ID]: {
                type: "area-fire"
            }
        }
    })
}

/** Listens to a message for area or auto fire buttons */
function listenAreaFireMessage(message, html) {
    const type = message.flags[MODULE_ID]?.type;
    if (type !== "area-fire") return;

    html.querySelector("[data-action=roll-area-save]").addEventListener("click", async () => {
        const item = message.item;
        const savingThrow = calculateSaveDC(item);
        const tokens = game.user.getActiveTokens();
        if (tokens.length === 0) {
            ui.notifications.error("PF2E.ErrorMessage.NoTokenSelected", { localize: true });
            return;
        }
        for (const token of tokens) {
            await token.actor.saves?.reflex?.roll({
                extraRollOptions: EXTRA_AREA_OPTIONS,
                dc: savingThrow.dc
            });
        }
    });

    html.querySelector("[data-action=roll-area-damage]").addEventListener("click", async () => {
        const actor = message.actor;
        const item = message.item;
        const action = actor?.system.actions.find((a) => a.item.uuid === item?.uuid);
        if (!action) return;

        const roll = await action.damage({
            options: EXTRA_AREA_OPTIONS,
        });

        // If PF2e Toolbelt is enabled, edit the created message to add save buttons for target damage
        if (roll && game.modules.get("pf2e-toolbelt")?.active) {
            const savingThrow = calculateSaveDC(item);
            const damageMessage = game.messages.contents.at(-1);
            if (damageMessage.actor?.uuid === actor.uuid) {
                damageMessage.update({
                    "flags.pf2e-toolbelt.targetHelper": {
                        save: {
                            author: actor.uuid,
                            basic: true,
                            dc: savingThrow.dc.value,
                            statistic: "reflex",
                        },
                        options: EXTRA_AREA_OPTIONS,
                    }
                });
            }
        }
    });

    html.querySelector("[data-action=place-area-template]").addEventListener("click", async () => {
        const item = message.item;
        const { type, value } = calculateArea(item);
        const templateData = {
            t: {
                burst: "circle",
                cone: "cone",
                line: "ray"
            }[type],
            distance: value,
            flags: {
                pf2e: {
                    messageId: message?.id,
                    origin: {
                        name: item.name,
                        slug: item.slug,
                        traits: foundry.utils.deepClone(item.system.traits.value),
                        ...item.getOriginData(),
                    },
                    areaShape: type,
                }
            }
        };

        if (type === "line") {
            templateData.width = CONFIG.MeasuredTemplate.defaults.width * (canvas.dimensions?.distance ?? 1);
        } else if (type === "cone") {
            templateData.angle = CONFIG.MeasuredTemplate.defaults.angle;
        }

        canvas.templates.createPreview(templateData);
    });
}

/** Determines the area of an area or automatic weapon based on its traits */
function calculateArea(weapon) {
    const traits = weapon.system.traits.value;
    const isAutomatic = traits.includes("automatic");
    const area = isAutomatic ? "cone" : weapon.system.traits.value.find((t) => t.startsWith("area-"))?.replace("area-", "");
    if (area.startsWith("burst")) {
        const value = Number(/burst-(\d*)-ft/.exec(area)[1]);
        return { type: "burst", value };
    } else {
        // Set the range based on the weapon's range increment.
        // If its automatic we halve the range and round to the nearest multiple of 5
        const weaponRange = weapon.system.range;
        const range = isAutomatic
            ? Math.max(5, Math.floor(weaponRange / 2) - Math.floor(weaponRange / 2) % 5)
            : weaponRange;
        return { type: area, value: range };
    }
}

/** Creates a statistic for a weapon's auto or area fire DC */
function calculateSaveDC(weapon) {
    const ModifierPF2e = game.pf2e.Modifier;
    const actor = weapon.actor;
    const classDC = actor.getStatistic("class");
    const itemBonus = new ModifierPF2e({ label: "Tracking Bonus", type: "item", modifier: weapon.flags.pf2e.attackItemBonus });
    return classDC.extend({ modifiers: itemBonus.modifier ? [itemBonus] : [] });
}

/** A duplicate of the createAreaLabel() function from pf2e */
function createAreaLabel(areaData) {
    const formatString = "PF2E.Item.Spell.Area";
    const shape = game.i18n.localize(`PF2E.Area.Shape.${areaData.type}`);

    // Handle special cases of very large areas
    const largeAreaLabel = {
        1320: "PF2E.Area.Size.Quarter",
        2640: "PF2E.Area.Size.Half",
        5280: "1",
    }[areaData.value];
    if (largeAreaLabel) {
        const size = game.i18n.localize(largeAreaLabel);
        const unit = game.i18n.localize("PF2E.Area.Size.Mile");
        return game.i18n.format(formatString, { shape, size, unit, units: unit });
    }

    const size = Number(areaData.value);
    const unit = game.i18n.localize("PF2E.Foot.Label");
    const units = game.i18n.localize("PF2E.Foot.Plural");
    return game.i18n.format(formatString, { shape, size, unit, units });
}

export { createAreaFireMessage, listenAreaFireMessage };
