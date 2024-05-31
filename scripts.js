function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
    let r, g, b;

    h /= 360;
    s /= 100;
    l /= 100;

    if (s == 0) {
        r = g = b = l;
    } else {
        let hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function updateFromColorPicker() {
    let colorInput = document.getElementById('colorInput').value;
    let rgbValue = hexToRgb(colorInput);
    let hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);
    
    document.getElementById('rgbValue').value = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
    document.getElementById('hexValue').value = colorInput;
    document.getElementById('hslValue').value = `${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%`;
}

function updateFromRgb() {
    let rgbValue = document.getElementById('rgbValue').value.split(',').map(val => parseInt(val.trim()));
    if (rgbValue.length === 3 && rgbValue.every(val => !isNaN(val) && val >= 0 && val <= 255)) {
        let hexValue = rgbToHex(rgbValue[0], rgbValue[1], rgbValue[2]);
        let hslValue = rgbToHsl(rgbValue[0], rgbValue[1], rgbValue[2]);
        
        document.getElementById('hexValue').value = hexValue;
        document.getElementById('hslValue').value = `${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%`;
        document.getElementById('colorInput').value = hexValue;
    }
}

function updateFromHex() {
    let hexValue = document.getElementById('hexValue').value;
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
        let rgbValue = hexToRgb(hexValue);
        let hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);
        
        document.getElementById('rgbValue').value = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
        document.getElementById('hslValue').value = `${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%`;
        document.getElementById('colorInput').value = hexValue;
    }
}

function updateFromHsl() {
    let hslValue = document.getElementById('hslValue').value.split(',').map(val => parseFloat(val.trim()));
    if (hslValue.length === 3 && hslValue.every(val => !isNaN(val) && ((val >= 0 && val <= 360) || (val >= 0 && val <= 100)))) {
        let rgbValue = hslToRgb(hslValue[0], hslValue[1], hslValue[2]);
        let hexValue = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b);
        
        document.getElementById('rgbValue').value = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
        document.getElementById('hexValue').value = hexValue;
        document.getElementById('colorInput').value = hexValue;
    }
}
