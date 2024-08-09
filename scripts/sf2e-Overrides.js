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
