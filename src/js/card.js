'use strict';

class Card {
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
			button.addEventListener('click', _ => this._toggleCardButton(button, buttons, card));
		});
	}

	_toggleCardButton(current_button, buttons, card) {
		if (current_button.classList.contains('card__button_dislike')) {
			this._removeCard(current_button, card, 'disliked');
		} else if (current_button.classList.contains('card__button_like')) {
			this._removeCard(current_button, card, 'liked');
		} else {
			this._removeCard(current_button, card);
		}
	}

	_removeCard(button, card, status) {
		const url = button.getAttribute('data-href');

		if (status === 'liked') this._cardStatus(url, card, status);
		else if (status === 'disliked') this._cardStatus(url, card, undefined, status);
		else this._cardStatus(url, card);

		card.classList.add('card__is-removed');
		setTimeout(_ => card.classList.add('hidden'), 400);
	}

	_cardStatus(url, card, like, disliked) {
		const id = card.getAttribute('data-shop');
		const data = {
			'id': id,
			'like': like || undefined,
			'disliked': disliked || undefined,
		}

		const options = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {'content-type': 'application/json'}
		};

		fetch(url, options)
		.then(res => res.json())
		.then(response => console.log(response));
	}
}

new Card();