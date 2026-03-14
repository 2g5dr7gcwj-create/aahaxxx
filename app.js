// ... (الأسماء في data.js كما هي)

let state = {
    players: JSON.parse(localStorage.getItem('players')) || [],
    spyIndex: -1, currentTurn: 0, revealed: false, secret: null,
    votes: {}, votingMode: false
};

function render() {
    const app = document.getElementById('app');
    app.className = "glass fade-in";
    
    if (state.spyIndex === -1) {
        app.innerHTML = `<h1 class="text-2xl font-bold text-indigo-400 mb-6 text-center">سالفة كروية ⚽</h1>
            <input id="pName" class="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white mb-4" placeholder="اسم اللاعب...">
            <button onclick="addPlayer()" class="w-full py-4 bg-indigo-600 font-bold mb-6">إضافة لاعب</button>
            <div class="max-h-40 overflow-y-auto mb-4">${state.players.map((p, i) => `<div class="flex justify-between bg-white/5 p-3 rounded-lg text-white mb-1">${p} <button onclick="removePlayer(${i})" class="text-rose-400">حذف</button></div>`).join('')}</div>
            <button onclick="startGame()" class="w-full py-4 bg-emerald-600 font-bold">ابدأ اللعب</button>`;
    } 
    else if (state.votingMode) {
        app.innerHTML = `<h2 class="text-xl text-white mb-6 text-center">صوت للجاسوس:</h2>
            <div class="space-y-2">${state.players.map((p, i) => `<button onclick="castVote(${i})" class="w-full p-4 bg-white/10 text-white rounded-xl hover:bg-white/20">${p}</button>`).join('')}</div>`;
    } 
    else if (state.currentTurn < state.players.length) {
        app.innerHTML = `<div class="text-center">
            <h2 class="text-xl text-white mb-8">دور: ${state.players[state.currentTurn]}</h2>
            ${!state.revealed ? `<button onclick="reveal()" class="w-full py-10 bg-indigo-600 text-xl font-bold rounded-2xl">اكشف الكلمة</button>` : 
            `<div class="p-6 bg-white/10 rounded-2xl border ${state.currentTurn === state.spyIndex ? 'border-red-500' : 'border-emerald-500'}">
                <p class="text-2xl font-bold text-white">${state.currentTurn === state.spyIndex ? "⚠️ أنت الجاسوس" : state.secret.name}</p>
                <p class="text-sm text-gray-300">${state.currentTurn !== state.spyIndex ? state.secret.bio : ''}</p>
            </div>
            <button onclick="nextPlayer()" class="mt-6 w-full py-4 bg-white/20 text-white rounded-xl">تم، التالي</button>`}
        </div>`;
    }
}

function castVote(target) {
    state.votes[state.currentTurn] = target;
    if (Object.keys(state.votes).length >= state.players.length) {
        showResults();
    } else {
        state.currentTurn++;
        render();
    }
}

function showResults() {
    const app = document.getElementById('app');
    let voteCounts = {};
    Object.values(state.votes).forEach(v => voteCounts[v] = (voteCounts[v] || 0) + 1);
    
    let maxVotes = 0; let votedSpy = -1;
    for(let id in voteCounts) { if(voteCounts[id] > maxVotes) { maxVotes = voteCounts[id]; votedSpy = parseInt(id); } }
    
    const isCaught = votedSpy === state.spyIndex;
    app.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4 text-center">${isCaught ? 'كشفنا الجاسوس!' : 'الجاسوس هرب!'}</h2>
        <p class="text-gray-300 mb-6 text-center">الجاسوس الحقيقي هو: ${state.players[state.spyIndex]}</p>
        <button onclick="exitGame()" class="w-full py-4 bg-indigo-600 rounded-xl">ابدأ دور جديد</button>`;
}

// الدوال المساعدة...
function nextPlayer() { state.revealed = false; if(state.currentTurn + 1 >= state.players.length) { state.votingMode = true; state.currentTurn = 0; } else { state.currentTurn++; } render(); }
function exitGame() { state = { players: state.players, spyIndex: -1, currentTurn: 0, revealed: false, votes: {}, votingMode: false }; render(); }
// ... (باقي الدوال add, remove, start)
