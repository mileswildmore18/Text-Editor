const butInstall = document.getElementById('buttonInstall');

// A variable to store the deferred prompt event
let deferredPrompt;

// Logic for installing the PWA
// Adding an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //Preventing the mini-infobar from appearing on mobile
    event.preventDefault();

    //Stashes the event so it can be triggered later
    deferredPrompt = event;

    //Updating UI to show the install button
    butInstall.style.display = 'block';

    console.log('beforeinstallprompt event was fired');
});

// Implementing a click event handler on the `butInstall` element (button)
butInstall.addEventListener('click', async () => {
    if (!deferredPrompt) {
        //The deferred prompt is not available
        return;
    }
    // Showing the install prompt
    deferredPrompt.prompt();

    // Waiting for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Reseting the deferred prompt variable, since it can only be used once
    deferredPrompt = null;

    // Hiding the install button
    butInstall.style.display = 'none';
});

// Adding a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed', event);
});
