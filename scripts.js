function updateFromColorPicker() {
    const colorInput = document.getElementById('colorInput').value;
    const rgbValue = hexToRgb(colorInput);
    document.getElementById('rgbValue').value = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
    document.getElementById('hexValue').value = colorInput;
}

function updateFromRgb() {
    const rgbValue = document.getElementById('rgbValue').value;
    const rgbArray = rgbValue.split(',').map(num => parseInt(num.trim()));
    if (rgbArray.length === 3 && rgbArray.every(num => !isNaN(num) && num >= 0 && num <= 255)) {
        const hexValue = rgbToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
        document.getElementById('hexValue').value = hexValue;
        document.getElementById('colorInput').value = hexValue;
    }
}

function updateFromHex() {
    const hexValue = document.getElementById('hexValue').value;
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
        const rgbValue = hexToRgb(hexValue);
        document.getElementById('rgbValue').value = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
        document.getElementById('colorInput').value = hexValue;
    }
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
