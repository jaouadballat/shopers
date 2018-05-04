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
			card.addEventListener('click', _ => {
				const dislike_button = card.querySelector('.card__button_dislike');
				const like_button = card.querySelector('.card__button_like');
				const dislike_svg = card.querySelectorAll('svg')[0];
				const like_svg = card.querySelectorAll('svg')[1];

				const current_card = {
					dislike_button: dislike_button,
					like_button: like_button,
					dislike_svg: dislike_svg,
					like_svg: like_svg
				};

				this._handleCard(current_card);
			})
		});
	}

	_handleCard(current_card) {
		current_card.dislike_button.addEventListener('click', _ => {
			this._toggleCardButton(current_card);
		});

		current_card.like_button.addEventListener('click', _ => {
			this._toggleCardButton(current_card);
		});
	}

	_toggleCardButton(button, svg) {}
}

new Card();