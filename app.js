let state = {
    players: JSON.parse(localStorage.getItem('players')) || [],
    spyIndex: -1, currentTurn: 0, revealed: false,
    secret: null, votes: {}, votingMode: false
};

function render() {
    const app = document.getElementById('app');
    if (state.spyIndex === -1) {
        app.innerHTML = `<h1 class="text-2xl font-bold text-indigo-400 mb-6 text-center">سالفة كروية</h1>
            <input id="pName" class="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white mb-4" placeholder="اسم اللاعب...">
            <button onclick="addPlayer()" class="w-full py-4 bg-indigo-600 font-bold mb-4">إضافة لاعب</button>
            <div class="max-h-40 overflow-y-auto mb-4">${state.players.map((p, i) => `<div class="flex justify-between bg-white/5 p-3 rounded-lg mb-1">${p} <button onclick="removePlayer(${i})" class="text-rose-400">X</button></div>`).join('')}</div>
            <button onclick="startGame()" class="w-full py-4 bg-emerald-600 font-bold">ابدأ اللعب</button>`;
    } else if (state.votingMode) {
        app.innerHTML = `<h2 class="text-xl mb-6 text-center">صوت للجاسوس:</h2>
            <div class="space-y-2">${state.players.map((p, i) => `<button onclick="castVote(${i})" class="w-full p-4 bg-white/10 rounded-xl">${p}</button>`).join('')}</div>`;
    } else if (state.currentTurn < state.players.length) {
        app.innerHTML = `<div class="text-center">
            <h2 class="text-xl mb-8">دور: ${state.players[state.currentTurn]}</h2>
            ${!state.revealed ? `<button onclick="reveal()" class="w-full py-10 bg-indigo-600 text-xl font-bold rounded-2xl">اكشف</button>` : 
            `<div class="p-6 bg-white/10 rounded-2xl ${state.currentTurn === state.spyIndex ? 'border-2 border-red-500' : 'border-2 border-emerald-500'}">
                <p class="text-2xl font-bold">${state.currentTurn === state.spyIndex ? "⚠️ أنت الجاسوس" : state.secret.name}</p>
            </div>
            <button onclick="nextPlayer()" class="mt-6 w-full py-4 bg-white/20 rounded-xl">التالي</button>`}
        </div>`;
    }
}

function addPlayer() { const val = document.getElementById('pName').value; if(val) { state.players.push(val); localStorage.setItem('players', JSON.stringify(state.players)); render(); } }
function removePlayer(i) { state.players.splice(i, 1); localStorage.setItem('players', JSON.stringify(state.players)); render(); }
function startGame() { if(state.players.length < 3) return alert("3 لاعبين عالأقل"); state.spyIndex = Math.floor(Math.random() * state.players.length); state.secret = allStars[Math.floor(Math.random() * allStars.length)]; render(); }
function reveal() { state.revealed = true; render(); }
function nextPlayer() { state.revealed = false; if(state.currentTurn + 1 >= state.players.length) { state.votingMode = true; state.currentTurn = 0; } else { state.currentTurn++; } render(); }
function castVote(t) { state.votes[state.currentTurn] = t; state.currentTurn++; if(state.currentTurn >= state.players.length) { showResults(); } else { render(); } }
function showResults() { app.innerHTML = `<h2 class="text-center text-xl">الجاسوس هو: ${state.players[state.spyIndex]}</h2><button onclick="location.reload()" class="w-full py-4 bg-indigo-600 mt-6">إعادة اللعبة</button>`; }
render();
