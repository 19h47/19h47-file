const optionsDefault = {
	size: 2000000,
	messages: {
		invalidSize: 'Le poids de votre fichier est trop lourd',
		invalidType: 'Le type de votre fichier est incorrect',
		invalidFile: "Aucun fichier n'a été sélectionné",
	},
	types: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
};

/**
 * fileSize
 *
 * @param number
 *
 * @returns string
 */
const fileSize = (number: number): string => {
	// 1048576 <= number
	let size = `${(number / 1048576).toFixed(1)} Mo`;

	if (1024 > number) {
		size = `${number} octets`;
	} else if (1024 <= number && 1048576 > number) {
		size = `${(number / 1024).toFixed(1)} Ko`;
	}

	return size;
};

/**
 * validFileType
 *
 * @param file
 * @param types
 * @returns
 */
const validFileType = (file: File, types: string[]): boolean => {
	for (let i = 0; i < types.length; i += 1) {
		if (file.type === types[i]) {
			return true;
		}
	}

	return false;
};

interface Messages {
	invalidSize: string;
	invalidType: string;
	invalidFile: string;
}

interface Options {
	size?: number;
	messages?: Messages
	types?: string[]
}

export default class InputFile {
	el: HTMLElement | null | undefined;
	options: Options;
	$input: HTMLInputElement | null = null;
	$information: HTMLElement | null = null;

	constructor(element: HTMLElement, options: Options = {}) {
		this.el = element;

		this.options = { ...optionsDefault, ...options };

		this.$input = this.el.querySelector('[type=file]');
		this.$information = this.el.querySelector('.js-information');

		this.$input?.style.setProperty('pointer-events', 'none');
	}

	init() {
		if (null === this.el || undefined === this.el) {
			return false;
		}

		this.initEvents();
	}

	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels
	 */
	initEvents() {
		(this.el as HTMLElement).addEventListener('click', (event) => {
			event.stopPropagation();
			this.$input && this.$input.click();
		});

		(this.el as HTMLElement).addEventListener('keydown', (event) => {
			if ('Enter' === event.key) {
				this.$input && this.$input.click();
			}
		});

		(this.$input as HTMLInputElement).addEventListener('change', () => { this.change() });

		[...((this.$input as HTMLInputElement).labels as NodeList)].forEach($label => {
			$label.addEventListener('click', (event) => {
				event.preventDefault();
			});
		});
	}

	change() {
		const { files } = <HTMLInputElement>this.$input;

		if (null === files || undefined === files[0]) {
			return true;
		}

		(this.el as HTMLElement).removeAttribute('aria-invalid');

		if (0 === files.length) {
			(this.$information as HTMLElement).innerHTML = this.options?.messages?.invalidFile ?? '';
			(this.el as HTMLElement).setAttribute('aria-invalid', 'true');

			return false;
		}

		if (!validFileType(files[0], this.options.types as string[])) {
			(this.$information as HTMLElement).innerHTML = this.options?.messages?.invalidType ?? '';
			(this.el as HTMLElement).setAttribute('aria-invalid', 'true');

			return false;
		}

		if (this.options.size && files[0].size > this.options.size) {
			(this.$information as HTMLElement).innerHTML = this.options.messages ? `${this.options.messages.invalidSize} (${fileSize(
				files[0].size,
			)})` : '';
			(this.el as HTMLElement).setAttribute('aria-invalid', 'true');

			return false;
		}

		(this.$information as HTMLElement).innerHTML = files[0].name;

		return true;
	}
}
