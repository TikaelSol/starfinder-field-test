Hooks.on('renderCharacterSheetPF2e', (app, html, data) => {
  const logoImg = html.find('.logo'); // Find the image with class 'logo'
  if (logoImg.length) {
    logoImg.attr('src', 'modules/sf2e-playtest-deluxe-adventure-pack/assets/art/acb/new_starfinder_logo-prototype.webp'); // Set the custom image source
    logoImg.css({
      'height': 'auto', // Maintain aspect ratio
      'width': 'auto',
    });
  }

  // Select the button with data-compendium="pf2e.ancestries"
  let ancestryButton = document.querySelector('a[data-compendium="pf2e.ancestries"]');
  // Change the data-compendium attribute to "pf2e.st"
  if (ancestryButton) {
    ancestryButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.ancestries');
  }

  // Select the button with data-compendium="pf2e.backgrounds"
  let backgroundButton = document.querySelector('a[data-compendium="pf2e.backgrounds"]');
  // Change the data-compendium attribute to "pf2e.bg"
  if (backgroundButton) {
    backgroundButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.backgrounds');
  }

  // Select the button with data-compendium="pf2e.backgrounds"
  let classButton = document.querySelector('a[data-compendium="pf2e.classes"]');
  // Change the data-compendium attribute to "pf2e.bg"
  if (classButton) {
    classButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.classes');
  }

  // Select the button with data-compendium="pf2e.backgrounds"
  let heritageButton = document.querySelector('a[data-compendium="pf2e.heritages"]');
  // Change the data-compendium attribute to "pf2e.bg"
  if (heritageButton) {
    heritageButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.heritages');
  }

  // Select the button with data-compendium="pf2e.backgrounds"
  let deityButton = document.querySelector('a[data-compendium="pf2e.deities"]');
  // Change the data-compendium attribute to "pf2e.bg"
  if (deityButton) {
    deityButton.setAttribute('data-compendium', 'starfinder-field-test-for-pf2e.deities');
  }

});
