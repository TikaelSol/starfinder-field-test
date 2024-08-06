Hooks.on('renderCharacterSheetPF2e', (app, html, data) => {
  const logoImg = html.find('.logo'); // Find the image with class 'logo'
  if (logoImg.length) {
    logoImg.attr('src', 'modules/sf2e-playtest-deluxe-adventure-pack/assets/art/acb/new_starfinder_logo-prototype.webp'); // Set the custom image source
    logoImg.css({
      'height': 'auto', // Maintain aspect ratio
      'width': 'auto',
    });
  }
});
