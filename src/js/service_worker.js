'use strict';

if ('serviceWorker' in navigator) {
    addEventListener('load', function () {
        navigator.serviceWorker.register(
            '/sw.js', { scope: '.' }
        );
    });
}

let lock = false;

if (navigator.onLine) addEventListener('online', _ => appOnline());
else appOffline();

addEventListener('offline', _ => appOffline());
addEventListener('online', _ => appOnline());

function appOnline() {
    document.body.classList.remove('offline');

    if (lock) {
        const likes = new likesDB();
        likes.get();
        lock = false;
    } else {
        lock = true;
    }
}

function appOffline() {
    document.body.classList.add('offline');
    Array.from(document.querySelectorAll('a')).forEach(link => {
        linkIsAvailableOffline(link).then(res => {
            if (res) link.classList.add('cached');
        });
    });

    new CardOffline();
}

function linkIsAvailableOffline(link) {
    const url = link.href;
    return caches.match(url)
        .then(res => {
            if (res) {
                if (res.status === 200) return true;
            }
        });
}