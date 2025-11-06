window.addEventListener('beforeinstallprompt', (e) => {
    console.log('pwa install available');
    window.dispatchEvent(new CustomEvent('pwa-available'));
    document.body.classList.add('pwa-available');
    window.goskillsPwaPrompt = e;
    e.userChoice.then(function (choice) {
        if (choice.outcome === 'accepted') {
            console.log('pwa install accepted');
            window.goskillsMultipleEvent('pwa-accepted', null, true);
        }
        else {
            console.log('pwa install declined');
            window.goskillsMultipleEvent('pwa-declined', null, true);
        }
        document.body.classList.remove('pwa-available');
        window.dispatchEvent(new CustomEvent('pwa-unavailable'));
    });
});
window.addEventListener('appinstalled', function () {
    console.log('pwa installed');
    document.body.classList.remove('pwa-available');
    window.dispatchEvent(new CustomEvent('pwa-unavailable'));
    window.goskillsMultipleEvent('pwa-installed', null, true);
    window.goskillsPwaPrompt = null;
});
window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js?v=1');
    }
});
function goskillsPwaInstall() {
    let prompt = window.goskillsPwaPrompt;
    if (prompt) {
        console.log('pwa install triggered');
        window.goskillsMultipleEvent('pwa-prompted', null, true);
        prompt.prompt();
    }
    window.dispatchEvent(new CustomEvent('pwa-unavailable'));
}
//# sourceMappingURL=pwa.js.map