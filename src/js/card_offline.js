'use strict';

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