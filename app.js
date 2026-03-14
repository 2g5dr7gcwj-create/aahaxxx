let state = {
    players: JSON.parse(localStorage.getItem('players')) || [],
    spyIndex: -1,
    currentTurn: 0,
    revealed: false,
    secret: null
};

function render() {
    const app = document.getElementById('app');
    if (state.spyIndex === -1) {
        app.innerHTML = `<h1 class="text-3xl font-bold mb-6 text-center text-indigo-400">سالفة كروية ⚽</h1>
            <input id="pName" class="w-full p-3 bg-gray-900 rounded-lg mb-2 border border-gray-700" placeholder="اسم اللاعب...">
            <button onclick="addPlayer()" class="btn-primary w-full p-3 font-bold mb-4">إضافة لاعب</button>
            <div class="space-y-2 mb-6 max-h-40 overflow-y-auto">${state.players.map((p, i) => `<div class="flex justify-between bg-gray-800 p-2 rounded-lg">${p} <button onclick="removePlayer(${i})" class="text-red-500">حذف</button></div>`).join('')}</div>
            <button onclick="startGame()" class="btn-primary w-full p-4 font-bold">ابدأ اللعب</button>`;
    } else if (state.currentTurn < state.players.length) {
        const isSpy = state.currentTurn === state.spyIndex;
        app.innerHTML = `<div class="text-center">
            <h2 class="text-xl mb-6">دور: <span class="font-bold text-indigo-400">${state.players[state.currentTurn]}</span></h2>
            ${!state.revealed ? `<button onclick="reveal()" class="btn-primary w-full p-10 text-2xl">اضغط للكشف</button>` :
            `<div class="p-6 bg-gray-800 rounded-2xl border ${isSpy ? 'border-red-500 pulse-red' : 'border-indigo-500'}">
                <p class="text-3xl font-bold">${isSpy ? "⚠️ أنت الجاسوس!" : state.secret.name}</p>
                ${!isSpy ? `<p class="mt-2 text-gray-400">${state.secret.bio}</p>` : ''}
            </div>
            <button onclick="nextPlayer()" class="bg-gray-700 w-full p-4 mt-6 rounded-xl">التالي</button>`}
        </div>`;
    } else {
        app.innerHTML = `<div class="text-center">
            <h2 class="text-2xl mb-4 font-bold">انتهت الجولة!</h2>
            <p class="mb-4 text-gray-400">عدد اللاعبين: ${state.players.length}</p>
            <p class="mb-8 text-red-400 font-bold">الجاسوس كان: ${state.players[state.spyIndex]}</p>
            <button onclick="exitGame()" class="btn-danger w-full p-4">خروج وبدء دور جديد</button>
        </div>`;
    }
}

function addPlayer() { const val = document.getElementById('pName').value; if(val) { state.players.push(val); localStorage.setItem('players', JSON.stringify(state.players)); render(); } }
function removePlayer(i) { state.players.splice(i, 1); localStorage.setItem('players', JSON.stringify(state.players)); render(); }
function startGame() { if(state.players.length < 3) return alert("3 لاعبين عالأقل!"); state.spyIndex = Math.floor(Math.random() * state.players.length); state.secret = allStars[Math.floor(Math.random() * allStars.length)]; render(); }
function reveal() { state.revealed = true; render(); }
function nextPlayer() { state.revealed = false; state.currentTurn++; render(); }
function exitGame() { state.spyIndex = -1; state.currentTurn = 0; render(); }
render();
