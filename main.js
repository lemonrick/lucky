import './style.css'
import 'boxicons/css/boxicons.min.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

// define the lottoJoker function globally
window.lottoJoker = function() {

    function isSequential(arr) {
        return arr.every((n, i) => i === 0 || n === arr[i - 1] + 1);
    }

    function countDateNumbers(arr) {
        return arr.filter(n => n <= 31).length;
    }

    function isPopularCombo(arr) {
        const popular = [
            [1,2,3,4,5],
            [5,10,15,20,25],
            [7,14,21,28,35],
            [3,7,11,15,19],
            [2,4,6,8,10]
        ];
        return popular.some(p => JSON.stringify(p) === JSON.stringify(arr));
    }

    function generateSmartLotto() {
        let valid = false;
        let combo;

        while (!valid) {
            // generate random 5/35
            const set = new Set();
            while (set.size < 5) set.add(Math.floor(Math.random() * 35) + 1);
            combo = [...set].sort((a,b)=>a-b);

            const tooSequential = isSequential(combo);
            const tooManyDates = countDateNumbers(combo) > 2;
            const tooPopular = isPopularCombo(combo);

            valid = !(tooSequential || tooManyDates || tooPopular);
        }

        return combo;
    }

    function generateJoker() {
        return Array.from({length:6}, () =>
            Math.floor(Math.random() * 10)
        );
    }

    return {
        loto: [],
        joker: [],

        generate() {
            this.loto = generateSmartLotto();
            this.joker = generateJoker();
        }
    }
};

Alpine.start()