import './style.css'
import 'boxicons/css/boxicons.min.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

// Define the global lottoJoker factory
window.lottoJoker = function () {

    // ===== Helper functions =====

    // Check if the numbers are sequential (e.g., 1,2,3,4,5)
    function isSequential(arr) {
        return arr.every((n,i)=>i===0 || n===arr[i-1]+1);
    }

    // Count how many numbers could be interpreted as dates (1–31)
    function countDateNumbers(arr) {
        return arr.filter(n=>n<=31).length;
    }

    // Check if the combination is a popular/common pattern
    function isPopularCombo(arr) {
        const popular = [
            [1,2,3,4,5],
            [5,10,15,20,25],
            [7,14,21,28,35],
            [3,7,11,15,19],
            [2,4,6,8,10]
        ];
        return popular.some(p=>JSON.stringify(p)===JSON.stringify(arr));
    }

    // ===== Smart Lotto Generator =====
    function generateSmartLotto(lotoFreq) {
        const maxAttempts = 500; // limit attempts to avoid freezing
        let attempts = 0;
        let combo;

        while(attempts < maxAttempts){
            attempts++;
            const set = new Set();
            while(set.size<5) set.add(Math.floor(Math.random()*35)+1);
            combo = [...set].sort((a,b)=>a-b);
            // combo = [...set];

            const tooSequential = isSequential(combo);
            const tooManyDates = countDateNumbers(combo) > 2;
            const tooPopular = isPopularCombo(combo);
            const sumFreq = combo.reduce((sum,n)=>sum+lotoFreq[n],0);
            const tooCold = sumFreq < 4; // optional weighting: avoid low-frequency numbers

            if(!(tooSequential || tooManyDates || tooPopular || tooCold)) break; // valid combo
        }
        return combo;
    }

    // ===== Smart Joker Generator =====
    function generateJoker(jokerFreq) {
        const weighted = [];
        for(let n=0;n<=9;n++){
            const weight = jokerFreq[n] || 1;
            for(let i=0;i<weight;i++) weighted.push(n); // repeat number according to its frequency
        }
        return Array.from({length:6},()=>weighted[Math.floor(Math.random()*weighted.length)]);
    }

    // ===== Alpine data object =====
    return {
        loto: [],
        joker: [],
        history: window.historyData || [], // global history array (defined in history.js)
        lotoFreq: Array(36).fill(0),      // frequency count for numbers 1–35
        jokerFreq: Array(10).fill(0),     // frequency count for numbers 0–9
        freqsComputed: false,             // flag to only compute frequencies once

        // Generate new lotto + joker numbers
        generate() {
            // Compute frequencies from history only once
            if(!this.freqsComputed){
                const historicalLotoNumbers = this.history.flatMap(d => d.loto);
                const historicalJokerNumbers = this.history.flatMap(d => d.joker);
                this.lotoFreq = Array(36).fill(0);
                this.jokerFreq = Array(10).fill(0);
                historicalLotoNumbers.forEach(n => this.lotoFreq[n]++);
                historicalJokerNumbers.forEach(n => this.jokerFreq[n]++);
                this.freqsComputed = true;
            }

            // Generate smart lotto and joker numbers
            this.loto = generateSmartLotto(this.lotoFreq);
            this.joker = generateJoker(this.jokerFreq);
        }
    };
};

Alpine.start();