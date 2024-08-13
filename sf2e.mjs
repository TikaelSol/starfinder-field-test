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
        light: "SF2E.SETTINGS.Theme.Light",
        dark: "SF2E.SETTINGS.Theme.Dark", // Added dark theme
        // "high-contrast": "SF2E.SETTINGS.Theme.HighConstrast",
      },
      initial: "none",
    }),
    onChange: (themeId) => {
      applyTheme(themeId);
    },
  });
});

Hooks.once("setup", () => {
  applyTheme(game.settings.get(MODULE_ID, "theme"));
});