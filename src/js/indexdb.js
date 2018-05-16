'use strict';

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
                        .catch(err => console.log(err));
                });
            })
            .then(_ => this._db.likes.clear());
    }

    clear() {
        this._db.open().then(_ => this._db.clear());
    }
}