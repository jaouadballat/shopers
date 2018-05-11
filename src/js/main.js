'use strict';

class FetchPage {
    constructor() {
        this._triggers = Array.from(document.querySelectorAll('.fetch'));
        this._tabs = Array.from(document.querySelectorAll('.nav__tab'));
        this._container = document.querySelector('.main');
        this._tmp_container = document.querySelector('.tmp');
        this._loader = document.querySelector('.loader');
        this._cards = Array.from(document.querySelectorAll('.card'));

        this._addEventListener();
        this._refresh(this._cards);
    }

    _addEventListener() {
        this._triggers.forEach(trigger => {
            trigger.addEventListener('click', event => this._getPage(event));
        });
    }

    _getPage(event) {
        event.preventDefault();
        const trigger = event.target
        const url = trigger.href;


        fetch(url)
            .then(res => res.text())
            .then(response => {
                this._loader.classList.remove('hidden');
                this._tmp_container.innerHTML = response;

                this._render(this._tmp_container);
                this._loader.classList.add('hidden');

                this._setTab(this._tabs, trigger);
            })
            .catch(err => console.log(err));
    }

    _render(tmp) {
        const content = tmp.querySelector('.main');
        this._container.innerHTML = "";
        this._container.appendChild(content);
        this._container.classList.add('page__is-added');

        setTimeout(_ => this._container.classList.remove('page__is-added'), 400);
        new Card();
    }

    _setTab(tabs, current_tab) {
        if (current_tab.classList.contains('nav__tab')) {
            current_tab.classList.add('nav__tab_current');
            tabs.forEach(tab => {
                if (tab !== current_tab) tab.classList.remove('nav__tab_current')
            });
        }
    }

    _refresh(cards) {
        if (cards.length === 0) {
            fetch('/')
                .then(res => res.text())
                .then(response => {
                    this._loader.classList.remove('hidden');
                    this._tmp_container.innerHTML = response;

                    this._render(this._tmp_container);
                    this._loader.classList.add('hidden');
                });
        }
    }
}

new FetchPage();