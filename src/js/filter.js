'use strict';

class Filter {
	constructor() {
		this._buttons = Array.from(document.querySelectorAll('.filter__button'));
		this._active = 'filter__button_active';

		this._addEventListener();
	}

	_addEventListener() {
		this._buttons.forEach(button => {
			button.addEventListener('click', _ => this._activateButton(button));
		});
	}

	_activateButton(current_button) {
		if (current_button.classList.contains(this._active)) return;

		//disactivate the other buttons.
		current_button.classList.add(this._active);
		this._buttons.forEach(button => {
			if (button !== current_button) button.classList.remove(this._active);
		});
	}
}

new Filter();