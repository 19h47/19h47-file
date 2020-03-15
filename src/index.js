const optionsDefault = {
	size: 2000000,
	messages: {
		invalidSize: 'Le poids de votre fichier est trop lourd',
		invalidType: 'Le type de votre fichier est incorrect',
		invalidFile: 'Aucun fichier n\'a été sélectionné',
	},
	types: [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'application/pdf',
	],
};


const fileSize = number => {
	// 1048576 <= number
	let size = `${(number / 1048576).toFixed(1)} Mo`;

	if (1024 > number) {
		size = `${number} octets`;
	} else if (1024 <= number && 1048576 > number) {
		size = `${(number / 1024).toFixed(1)} Ko`;
	}

	return size;
};

const validFileType = (file, types) => {
	for (let i = 0; i < types.length; i += 1) {
		if (file.type === types[i]) {
			return true;
		}
	}

	return false;
};

export default class File {
	constructor(element, options = {}) {
		this.rootElement = element;
		this.options = { ...optionsDefault, ...options };
	}

	init() {
		this.$input = this.rootElement.querySelector('[type=file]');
		this.$information = this.rootElement.querySelector('.js-information');

		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('click', () => {
			this.$input.click();
		});

		this.$input.addEventListener('change', () => {
			this.change();
		});
	}

	change() {
		const { files } = this.$input;

		this.rootElement.removeAttribute('aria-invalid');

		if (0 === files.length) {
			this.$information.innerHTML = this.options.messages.invalidFile;
			this.rootElement.setAttribute('aria-invalid', true);

			return false;
		}

		if (!validFileType(files[0], this.options.types)) {
			this.$information.innerHTML = this.options.messages.invalidType;
			this.rootElement.setAttribute('aria-invalid', true);

			return false;
		}

		if (files[0].size > this.options.size) {
			this.$information.innerHTML = `${this.options.messages.invalidSize} (${fileSize(files[0].size)})`;
			this.rootElement.setAttribute('aria-invalid', true);

			return false;
		}

		this.$information.innerHTML = files[0].name;

		return true;
	}
}
