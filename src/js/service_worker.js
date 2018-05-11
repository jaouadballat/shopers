'use strict';

if ('serviceWorker' in navigator) {
    addEventListener('load', function () {
        navigator.serviceWorker.register(
            '/sw.js', { scope: '.' }
        );
    });
}

class likesDB {
    constructor() {
        this._db = new Dexie('MyDatabase');
        this._db.version(1).stores({likes: '++db_id, id, user_id, like, disliked, url'});
    }

    set(obj) {
        this._db.open().then(_ => {
            return this._db.likes.add({
                id: obj.id,
                user_id: obj.user_id,
                like: (obj.stat === 'liked') ? obj.stat : undefined,
                disliked: (obj.stat === 'disliked') ? obj.stat : undefined,
                url: obj.url
            });
        });
    }

    get() {
        this._db.open()
            .then(_ => this._db.likes.toArray())
            .then(likes => likes)
            .then(results => {
                if (!results) return;

                console.log(results);
                results.forEach(result => {
                    const data = {
                        'id': result.id,
                        'like': result.like || undefined,
                        'disliked': result.disliked || undefined,
                        'user_id': result.user_id
                    };

                    const options = {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {'content-type': 'application/json'}
                    };

                    fetch(result.url, options)
                        .then(res => res.json())
                        .then(response => console.log(response))
                        .catch(err => console.log('What the fuck', err));
                });
            })
            .then(_ => this._db.likes.clear());
    }

    clear() {
        this._db.open().then(_ => this._db.clear());
    }
}

class CardOffline {
    constructor() {
        this._cards = Array.from(document.querySelectorAll('.card'));
        this._is_liked = 'card__button_is-liked';
        this._is_disliked = 'card__button_is-disliked';
        this._svg_liked = 'svg__card_is-liked';
        this._svg_disliked = 'svg__card_is-disliked';

        this._addEventListener();
    }

    _addEventListener() {
        this._cards.forEach(card => {
            const the_buttons = Array.from(card.querySelectorAll('.card__button'));
            
            this._handleCard(the_buttons, card);
        });
    }

    _handleCard(buttons, card) {
        buttons.forEach(button => {
            button.addEventListener('click', _ => this._toggleCardButton(button, card));
        });
    }

    _toggleCardButton(current_button, card) {
        if (current_button.classList.contains('card__button_dislike')) {
            this._addToStorage(current_button, card, 'disliked');
        } else if (current_button.classList.contains('card__button_like')) {
            this._addToStorage(current_button, card, 'liked');
        } else {
            this._addToStorage(current_button, card);
        }
    }

    _addToStorage(button, card, stat) {
        const url = button.getAttribute('data-href');
        const card_id = card.getAttribute('data-shop');
        const user_id = card.getAttribute('data-user');
        
        const likes = new likesDB();

        likes.set({
            'id': card_id,
            'user_id': user_id,
            'stat': stat,
            'url': url
        });
    }
}

if (navigator.onLine) {
    addEventListener('online', _ => document.body.classList.remove('offline'));
    const likes = new likesDB();
    likes.get();
} else {
    appOffline();
}

addEventListener('offline', _ => appOffline());
addEventListener('online', _ => {
    document.body.classList.remove('offline');
    const likes = new likesDB();
    likes.get();
});

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
    console.log(url);
    return caches.match(url)
        .then(res => {
            if (res) {
                if (res.status === 200) return true;
            }
        });
}