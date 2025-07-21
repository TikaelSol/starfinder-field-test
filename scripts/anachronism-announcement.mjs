const MODULE_ID = "starfinder-field-test-for-pf2e";

function registerSettings() {
  game.settings.register(MODULE_ID, "releaseAnnouncement", {
    name: "Anachronism Announcement",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  })
};

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once('ready', async function() {
  if (game.user.isGM) {
    if (game.settings.get(MODULE_ID, "releaseAnnouncement")) {
      const journalUUID = "Compendium.starfinder-field-test-for-pf2e.sf2e-journals.JournalEntry.s9yYbR2XkiVHMMw8"
      const journal = await fromUuid(journalUUID)
      journal.sheet.render(true)
      await game.settings.set(MODULE_ID, "releaseAnnouncement", false)
    }
  }
})
