Hooks.on('renderCharacterSheetPF2e', (app, html, data) => {

  // Select the button with data-compendium="pf2e.ancestries"
  let ancestryButton = document.querySelector('a[data-compendium="pf2e.ancestries"]');
  if (ancestryButton) {
    ancestryButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.ancestries');
  }

  // Select the button with data-compendium="pf2e.backgrounds"
  let backgroundButton = document.querySelector('a[data-compendium="pf2e.backgrounds"]');
  if (backgroundButton) {
    backgroundButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.backgrounds');
  }

  // Select the button with data-compendium="pf2e.classes"
  let classButton = document.querySelector('a[data-compendium="pf2e.classes"]');
  if (classButton) {
    classButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.classes');
  }

  // Select the button with data-compendium="pf2e.heritages"
  let heritageButton = document.querySelector('a[data-compendium="pf2e.heritages"]');
  if (heritageButton) {
    heritageButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.heritages');
  }

  // Select the button with data-compendium="pf2e.deities"
  let deityButton = document.querySelector('a[data-compendium="pf2e.deities"]');
  if (deityButton) {
    deityButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.deities');
  }
  
});
