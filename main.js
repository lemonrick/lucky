import './style.css'
import 'boxicons/css/boxicons.min.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

// define the lottoJoker function globally
window.lottoJoker = function() {
    return {
        loto: [0,0,0,0,0,0],
        joker: [0,0,0,0,0,0],

        generate() {
            // LOTO 5/35 unique numbers
            let lotoSet = new Set();
            while (lotoSet.size < 5) {
                lotoSet.add(Math.floor(Math.random() * 35) + 1);
            }
            this.loto = Array.from(lotoSet).sort((a,b) => a-b);

            // Joker 6 numbers (0-9, can repeat)
            this.joker = Array.from({length:6}, () => Math.floor(Math.random() * 10));
        }
    }
}

Alpine.start()