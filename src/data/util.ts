export default function randomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7);
}
