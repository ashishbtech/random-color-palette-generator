let currentPalette=[];
let isLoading=false;

// Color API base URL
const COLOR_API_BASE='https://www.thecolorapi.com';

function generateRandomColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function hexToHsl(hex) {
	const r=parseInt(hex.slice(1, 3), 16) / 255;
	const g=parseInt(hex.slice(3, 5), 16) / 255;
	const b=parseInt(hex.slice(5, 7), 16) / 255;

	const max=Math.max(r, g, b);
	const min=Math.min(r, g, b);
	let h,
	s,
	l=(max + min) / 2;

	if (max===min) {
		h=s=0;
	}

	else {
		const d=max - min;
		s=l>0.5 ? d / (2 - max - min): d / (max + min);

		switch (max) {
			case r: h=(g - b) / d + (g < b ? 6 : 0);
			break;
			case g: h=(b - r) / d + 2;
			break;
			case b: h=(r - g) / d + 4;
			break;
		}

		h /=6;
	}

	return [h * 360,
	s * 100,
	l * 100];
}

function hslToHex(h, s, l) {
	l /=100;
	const a=s * Math.min(l, 1 - l) / 100;

	const f=n=> {
		const k=(n + h / 30) % 12;
		const color=l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');
	}

	;
	return `#${f(0)}${f(8)}${f(4)}`;
}

async function getColorInfo(hex) {
	try {
		const cleanHex=hex.replace('#', '');
		const response=await fetch(`${COLOR_API_BASE}/id?hex=${cleanHex}`);

		if ( !response.ok) {
			throw new Error('API request failed');
		}

		const data=await response.json();

		return {
			hex: data.hex.value,
			name: data.name.value,
			rgb: `${data.rgb.r},
			${data.rgb.g},
			${data.rgb.b}`,
			hsl: `${Math.round(data.hsl.h)}°,
			${Math.round(data.hsl.s)}%,
			${Math.round(data.hsl.l)}%`
		}

		;
	}

	catch (error) {
		console.error('Error fetching color info:', error);

		return {
			hex: hex,
				name: 'Unknown Color',
				rgb: 'N/A',
				hsl: 'N/A'
		}

		;
	}
}

function setLoadingState(loading) {
	isLoading=loading;
	const buttons=document.querySelectorAll('.btn');

	buttons.forEach(btn=> {
			btn.disabled=loading;

			if (loading) {
				const icon=btn.querySelector('i');
				icon.className='loading-spinner';
			}

			else {
				// Restore original icons
				const btnId=btn.id;

				switch(btnId) {
					case 'randomBtn': btn.querySelector('i').className='fas fa-dice';
					break;
					case 'monoBtn': btn.querySelector('i').className='fas fa-layer-group';
					break;
					case 'compBtn': btn.querySelector('i').className='fas fa-yin-yang';
					break;
					case 'analogBtn': btn.querySelector('i').className='fas fa-circle-notch';
					break;
				}
			}
		});
}

function showError(message) {
	const errorElement=document.getElementById('errorMessage');
	const errorText=document.getElementById('errorText');
	errorText.textContent=message;
	errorElement.style.display='block';

	setTimeout(()=> {
			errorElement.style.display='none';
		}

		, 5000);
}

async function generateRandomPalette() {
	if (isLoading) return;

	setLoadingState(true);
	currentPalette=[];

	try {
		for (let i=0; i < 5; i++) {
			currentPalette.push(generateRandomColor());
		}

		await displayPalette('Random Palette', 'A beautiful collection of random colors');
	}

	catch (error) {
		showError('Failed to generate random palette. Please try again.');
	}

	finally {
		setLoadingState(false);
	}
}

async function generateMonochromatic() {
	if (isLoading) return;

	setLoadingState(true);

	try {
		const baseColor=generateRandomColor();
		const [h,
		s,
		l]=hexToHsl(baseColor);

		currentPalette=[];

		for (let i=0; i < 5; i++) {
			const newL=Math.max(10, Math.min(90, l + (i - 2) * 15));
			currentPalette.push(hslToHex(h, s, newL));
		}

		await displayPalette('Monochromatic Palette', 'Different shades of the same hue');
	}

	catch (error) {
		showError('Failed to generate monochromatic palette. Please try again.');
	}

	finally {
		setLoadingState(false);
	}
}

async function generateComplementary() {
	if (isLoading) return;

	setLoadingState(true);

	try {
		const baseColor=generateRandomColor();
		const [h,
		s,
		l]=hexToHsl(baseColor);
		const complementaryH=(h + 180) % 360;

		currentPalette=[ baseColor,
		hslToHex(complementaryH, s, l),
		hslToHex(h, s * 0.7, l * 1.2),
		hslToHex(complementaryH, s * 0.7, l * 1.2),
		hslToHex((h + complementaryH) / 2, s * 0.5, l)];
		await displayPalette('Complementary Palette', 'Colors opposite on the color wheel');
	}

	catch (error) {
		showError('Failed to generate complementary palette. Please try again.');
	}

	finally {
		setLoadingState(false);
	}
}

async function generateAnalogous() {
	if (isLoading) return;

	setLoadingState(true);

	try {
		const baseColor=generateRandomColor();
		const [h,
		s,
		l]=hexToHsl(baseColor);

		currentPalette=[];

		for (let i=0; i < 5; i++) {
			const newH=(h + (i - 2) * 30) % 360;
			currentPalette.push(hslToHex(newH, s, l));
		}

		await displayPalette('Analogous Palette', 'Colors adjacent on the color wheel');
	}

	catch (error) {
		showError('Failed to generate analogous palette. Please try again.');
	}

	finally {
		setLoadingState(false);
	}
}

async function displayPalette(title, description) {
	const paletteElement=document.getElementById('palette');
	const paletteInfo=document.getElementById('paletteInfo');

	paletteElement.innerHTML='';

	// Create placeholder cards first
	currentPalette.forEach((color, index)=> {
			const colorCard=document.createElement('div');
			colorCard.className='color-card loading';
			colorCard.onclick=()=> copyToClipboard(color);

			colorCard.innerHTML=` <div class="color-preview" style="background-color: ${color}" > <i class="fas fa-copy copy-icon" ></i> </div> <div class="color-info" > <div class="color-code" >${color.toUpperCase()}</div> <div class="color-name" >Loading...</div> <div class="color-details" > <span>RGB: Loading...</span> <span>HSL: Loading...</span> </div> </div> `;

			paletteElement.appendChild(colorCard);
		});

	// Fetch color information for each color
	const colorPromises=currentPalette.map(async (color, index)=> {
			const colorInfo=await getColorInfo(color);
			const colorCard=paletteElement.children[index];

			colorCard.classList.remove('loading');
			colorCard.querySelector('.color-name').textContent=colorInfo.name;
			colorCard.querySelector('.color-details').innerHTML=` <span>RGB: ${colorInfo.rgb}</span> <span>HSL: ${colorInfo.hsl}</span> `;
		});

	// Wait for all color info to load
	await Promise.all(colorPromises);

	paletteInfo.innerHTML=` <h3><i class="fas fa-palette"></i>${title}</h3><p>${description}</p><small style="opacity: 0.8; margin-top: 10px; display: block;"><i class="fas fa-info-circle"></i>Color names and data provided by The Color API </small>`;
}

function copyToClipboard(color) {
	navigator.clipboard.writeText(color).then(()=> {
			showToast(`${color} copied to clipboard !`);

		}).catch(()=> {
			// Fallback for older browsers
			const textArea=document.createElement('textarea');
			textArea.value=color;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			showToast(`${color} copied to clipboard !`);
		});
}

function showToast(message) {
	const toast=document.getElementById('toast');
	const toastMessage=document.getElementById('toastMessage');

	toastMessage.textContent=message;
	toast.classList.add('show');

	setTimeout(()=> {
			toast.classList.remove('show');
		}

		, 3000);
}

// Generate initial palette
generateRandomPalette();