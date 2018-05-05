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
			
			this._handleCard(the_buttons);
		});
	}

	_handleCard(buttons) {
		buttons.forEach(button => {
			button.addEventListener('click', _ => this._toggleCardButton(button, buttons));
		});
	}

	_toggleCardButton(current_button, buttons) {
		if (current_button.classList.contains('card__button_dislike')) {
			if (current_button.classList.contains('card__button_is-disliked')) {
				current_button.classList.remove('card__button_is-disliked');
				current_button.querySelector('svg').classList.remove('svg__card_is-disliked');
			} else {
				current_button.classList.add('card__button_is-disliked');
				current_button.querySelector('svg').classList.add('svg__card_is-disliked');

				buttons.forEach(button =>  {
					if (button !== current_button) {
						button.classList.remove('card__button_is-liked');
						button.querySelector('svg').classList.remove('svg__card_is-liked');
					}
				});

				//get the url and get the page out of it.
				//then replace the current page content with the new content.
				const url = current_button.getAttribute('data-href');
				//new FetchPage(url, container);
			}
		} else {
			if (current_button.classList.contains('card__button_is-liked')) {
				current_button.classList.remove('card__button_is-liked');
				current_button.querySelector('svg').classList.remove('svg__card_is-liked');
			} else {
				current_button.classList.add('card__button_is-liked');
				current_button.querySelector('svg').classList.add('svg__card_is-liked');

				buttons.forEach(button =>  {
					if (button !== current_button) {
						button.classList.remove('card__button_is-disliked');
						button.querySelector('svg').classList.remove('svg__card_is-disliked');
					}
				});

				//get the url and get the page out of it.
				//then replace the current page content with the new content.
				const url = current_button.getAttribute('data-href');
				//new FetchPage(url, container);
			}
		}
	}
}

new Card();