const allStars = [
    "كريستيانو رونالدو", "زين الدين زيدان", "كريم بنزيما", "لوكا مودريتش", "جود بيلينجهام", "فينيسيوس جونيور", "سيرجيو راموس", "روبرتو كارلوس", "راؤول غونزاليس", "توني كروس", "مارسيلو", "رونالدو الظاهرة", "كامافينجا", "إيكر كاسياس",
    "ليونيل ميسي", "رونالدينيو", "أندريس إنييستا", "تشافي هيرنانديز", "روبرت ليفاندوفسكي", "لامين يامال", "كارليس بويول", "داني ألفيس", "لويس سواريز", "جيرارد بيكيه", "تييري هنري", "صامويل إيتو", "رونالد أراوخو", "بيدري",
    "إرلينغ هالاند", "كيفين دي بروين", "سيرجيو أغويرو", "رياض محرز", "رودري", "ديفيد سيلفا", "يايا توريه", "فيل فودين", "إيلكاي غوندوغان", "بيرناردو سيلفا", "كايل ووكر", "فيرجيل فان دايك",
    "لاوتارو مارتينيز", "زلاتان إبراهيموفيتش", "خافيير زانيتي", "ويسلي شنايدر", "روميلو لوكاكو", "ماريو بالوتيللي",
    "كيليان مبابي", "أشرف حكيمي", "ماركينيوس", "عثمان ديمبيلي", "جيانلويجي دوناروما", "فيتينيا", "نونو مينديز", "برادلي باركولا", "أنخيل دي ماريا", "ديفيد بيكهام",
    "إيدن هازارد", "بيليه", "دييغو مارادونا", "محمد صلاح", "مانويل نوير", "جيانلويجي بوفون", "فرانشيسكو توتي", "ستيفن جيرارد", "فرانك لامبارد", "كاكا", "ساديو ماني", "نجولو كانتي", "أنطوان غريزمان", "بول بوجبا", "سون هيونغ مين", "نيمار", "باولو مالديني", "واين روني", "أندريا بيرلو", "ديدييه دروغبا", "فرانك ريبيري", "مسعود أوزيل", "أوليفر كان", "بول سكولز", "تشابي ألونسو", "هاري كين",
    "رايان غيغز", "روبرتو باجيو", "بيتر شمايكل", "فان دير سار", "جون تيري", "ريو فرديناند", "مايكل بالاك", "أرين روبن", "سيرجيو بوسكيتس", "جوردان هندرسون", "ماركو رويس", "إدين دجيكو", "أوليفييه جيرو", "أليكسيس سانشيز", "فرناندو توريس"
];

let state = { players: JSON.parse(localStorage.getItem('players')) || [], secretWord: "", spyIndex: -1, currentTurn: 0, revealed: false };

function render() {
    const app = document.getElementById('app');
    if (state.spyIndex === -1) {
        app.innerHTML = `<div class="animate__animated animate__fadeIn">
            <h1 class="text-3xl font-bold text-white mb-6 text-center">سالفة كروية ⚽</h1>
            <input id="pName" class="w-full p-4 rounded-xl bg-white/10 text-white mb-4 border border-white/20" placeholder="اسم اللاعب...">
            <button onclick="addPlayer()" class="btn-blue w-full py-4 rounded-xl font-bold mb-2">إضافة لاعب</button>
            <div class="max-h-40 overflow-y-auto mb-4">${state.players.map(p => `<p class="bg-white/5 p-2 rounded-lg text-center mb-1 text-white">${p}</p>`).join('')}</div>
            <button onclick="startGame()" class="btn-red w-full py-4 rounded-xl font-bold">ابدأ التوزيع</button>
        </div>`;
    } else if (state.currentTurn < state.players.length) {
        app.innerHTML = `<div class="animate__animated animate__fadeIn text-center">
            <h2 class="text-2xl text-white mb-8">دور: ${state.players[state.currentTurn]}</h2>
            ${!state.revealed ? `<button onclick="reveal()" class="btn-blue w-full py-10 rounded-2xl text-xl font-bold">اضغط لرؤية الكلمة</button>` : 
            `<div class="p-6 rounded-2xl ${state.currentTurn === state.spyIndex ? 'bg-red-600' : 'bg-blue-600'} text-white">
                <p class="text-2xl font-bold">${state.currentTurn === state.spyIndex ? "⚠️ أنت الجاسوس" : state.secretWord}</p>
            </div>
            <button onclick="nextPlayer()" class="mt-6 w-full py-4 bg-white/20 rounded-xl text-white">فهمت، التالي</button>`}
        </div>`;
    }
}

function addPlayer() { const input = document.getElementById('pName'); if(input.value) { state.players.push(input.value); localStorage.setItem('players', JSON.stringify(state.players)); input.value = ''; render(); } }
function startGame() { if(state.players.length < 3) return alert("3 لاعبين على الأقل!"); state.spyIndex = Math.floor(Math.random() * state.players.length); state.secretWord = allStars[Math.floor(Math.random() * allStars.length)]; render(); }
function reveal() { state.revealed = true; render(); }
function nextPlayer() { state.revealed = false; state.currentTurn++; render(); }
render();
