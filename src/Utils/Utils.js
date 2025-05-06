export function getAspectRatio(w, h) {
    const divisor = gcd(w, h);
    return `${w/divisor}:${h/divisor}`;
}

function gcd(a, b) {
return b === 0 ? a : gcd(b, a % b);
}