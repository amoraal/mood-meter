const matrix = [
    ["Despair", "Hopeless", "Desolate", "Spent", "Drained", "Sleepy", "Complacent", "Tranquil", "Cozy", "Serene"],
    ["Despondent", "Depressed", "Sullen", "Exhausted", "Fatigued", "Mellow", "Thoughtful", "Peaceful", "Comfy", "Carefree"],
    ["Alienated", "Miserable", "Lonely", "Disheartened", "Tired", "Relaxed", "Chill", "Restful", "Blessed", "Balanced"],
    ["Pessimistic", "Morose", "Discouraged", "Sad", "Bored", "Calm", "Secure", "Satisfied", "Grateful", "Touched"],
    ["Disgusted", "Glum", "Disappointed", "Down", "Apathic", "At Ease", " Easygoing", "Content", "Loving", "Fulfilled"],
    ["Repulsed", "Troubled", "Concerned", "Uneasy", "Peeved", "Pleasant", "Joyful", "Hopeful", "Playful", "Blissful"],
    ["Anxious", "Apprehensive", "Worried", "Irritated", "Annoyed", "Pleased", "Happy", "Focused", "Proud", "Thrilled"],
    ["Fuming", "Frightened", "Angry", "Nervous", "Restless", "Energized", "Lively", "Enthusiastic", "Optimistic", "Excited"],
    ["Livid", "Furious", "Frustrated", "Tense", "Stunned", "Hyper", "Cheerful", "Motivated", "Inspired", "Elated"],
    ["Enraged", "Panicked", "Stressed", "Jittery", "Shocked", "Surprised", "Upbeat", "Festive", "Exhilirated", "Ecstatic"]
]

for(var i = matrix.length - 1; i >= 0; i--) {
    const newDiv = document.createElement("div");
    let matrixClassName = "matrix-row-" + i
    newDiv.id = matrixClassName
    document.getElementById('moodmatrix').appendChild(newDiv);
    for(j in matrix[i]) {
        var div = document.createElement("div");
        div.className = "matrix-box"
        div.innerHTML = matrix[i][j];

        if(i <= 4 && j <= 4) {
            div.style.background = "#0054ff";
            div.style.color = "#ffffff";
        } else if(i <= 4 && j >= 4) {
            div.style.background = "#7ee728";
        } else if(i > 4 && j <= 4 ) {
            div.style.background = "#cd2f2f";
            div.style.color = "#ffffff";
        } else if(i > 4 && j > 4) {
            div.style.background = "#FFEA00";
        }

        document.getElementById(matrixClassName).appendChild(div);
    }
}

const openMatrix = document.querySelector('#open-matrix');
openMatrix.addEventListener('click', (e) => {
    document.getElementById("result").style.display = 'none';
    document.getElementById("moodmeter").style.display = 'block';
})

const btn = document.querySelector('#submit');
btn.addEventListener('click', (e) => {
    const energy = document.getElementById('energy').value - 1
    const pleasantness = document.getElementById('pleasantness').value - 1

    document.getElementById("question").style.display = 'none';
    document.getElementById("result").style.display = 'block';

    var moodtext = document.getElementById("moodtext");
    var meaning = document.getElementById("meaning")
    let word = matrix[energy][pleasantness]
    moodtext.textContent += word;

    foo(meaning, word.toLowerCase());

    if(energy <= 4 && pleasantness <= 4) {
        document.getElementById("mood").style.backgroundColor = "#0054ff";
    } else if(energy <= 4 && pleasantness >= 4) {
        document.getElementById("mood").style.backgroundColor = "#7ee728";
    } else if(energy > 4 && pleasantness <= 4 ) {
        document.getElementById("mood").style.backgroundColor = "#cd2f2f";
    } else if(energy > 4 && pleasantness > 4) {
        document.getElementById("mood").style.backgroundColor = "#FFEA00";
    }
});


async function foo(parent, word) {
    let obj;
    const res = await fetch('./dictionary.json')
    obj = await res.json();

    var partOfSpeech = document.createElement('div')
    partOfSpeech.className = "partOfSpeech"
    partOfSpeech.innerHTML = obj[word][0].partOfSpeech;
    parent.appendChild(partOfSpeech);

    var definition = document.createElement('span')
    definition.className = "definition"
    definition.innerHTML = obj[word][0].definition;
    parent.appendChild(definition);

    if (obj[word][0].example) {
        var example = document.createElement('span')
        example.className = "example"
        example.innerHTML = obj[word][0].example;
        parent.appendChild(example);
    }

}