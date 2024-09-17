const answers = { favoriteLanguage: "", skillLevel: "", userName: "" };

function createStars() {
    for (var x = 0; x <= 150; x++) {
        const xPosition = Math.floor(Math.random() * 101);
        const yPosition = Math.floor(Math.random() * 101);
        const starType = Math.floor(Math.random() * 3) + 1;

        const createStar = document.createElement("DIV");
        var attributeStar = document.createAttribute("class");
        attributeStar.value = "star" + starType;
        var attributeStar2 = document.createAttribute("style");
        attributeStar2.value = "top: " + yPosition + "vh; left: " + xPosition + "vw;";
        var appendLoader = document.getElementById('starsContainer').appendChild(createStar);
        appendLoader.setAttributeNode(attributeStar); appendLoader.setAttributeNode(attributeStar2);
    }
}

function onup() {
    if (event.keyCode === 13) {
        generateDevAlias();
    }
}

function startGame() {
    document.getElementById('containerStart').classList.add("animate__animated", "animate__fadeOutLeft");
    setTimeout(function () {
        document.getElementById('containerStart').classList.add("is-hidden");
        document.getElementById('containerQuestion1').classList.remove("is-hidden");
        document.getElementById('containerQuestion1').classList.add("animate__animated", "animate__fadeInRight");
    }, 500);
}

function selectFaveLanguage(selectedLang) {
    answers.favoriteLanguage = selectedLang;

    document.getElementById('containerQuestion1').classList.add("animate__animated", "animate__fadeOutLeft");
    setTimeout(function () {
        document.getElementById('containerQuestion1').classList.add("is-hidden");
        var skipToQuestion = 2;
        if (selectedLang == "none") {
            skipToQuestion = 3;
            answers.skillLevel = "beginner";
        }
        document.getElementById('containerQuestion' + skipToQuestion).classList.remove("is-hidden");
        document.getElementById('containerQuestion' + skipToQuestion).classList.add("animate__animated", "animate__fadeInRight");
    }, 500);
}

function selectSkillLevel(selectedSkill) {
    answers.skillLevel = selectedSkill;

    document.getElementById('containerQuestion2').classList.add("animate__animated", "animate__fadeOutLeft");
    setTimeout(function () {
        document.getElementById('containerQuestion2').classList.add("is-hidden");
        document.getElementById('containerQuestion3').classList.remove("is-hidden");
        document.getElementById('containerQuestion3').classList.add("animate__animated", "animate__fadeInRight");
    }, 500);
}

function generateDevAlias() {
    const name = document.getElementById('inputName').value;
    answers.userName = name.charAt(0).toUpperCase() + name.slice(1);

    document.getElementById('containerQuestion3').classList.add("animate__animated", "animate__fadeOutLeft");
    setTimeout(function () {
        document.getElementById('containerQuestion3').classList.add("is-hidden");
        document.getElementById('containerLoader').classList.remove("is-hidden");
        document.getElementById('containerLoader').classList.add("animate__animated", "animate__fadeInRight");
        displayResults();
    }, 500);
}

function displayResults() {
    if (answers.userName != "") {
        document.getElementById('resultsUserName').innerHTML = answers.userName + ", the";
    } else {
        document.getElementById('resultsUserName').innerHTML = "Your DevAlias is:";
    }
    document.getElementById('resultsDevAlias').innerHTML = getGeneratedName();
    document.getElementById('resultsInvitingMessage').innerHTML = getInvitingMessage();

    setTimeout(function () {
        document.getElementById('containerLoader').classList.add("animate__animated", "animate__fadeOutLeft");

        setTimeout(function () {
            document.getElementById('containerLoader').classList.add("is-hidden");
            document.getElementById('containerResults').classList.remove("is-hidden");
            document.getElementById('containerResults').classList.add("animate__animated", "animate__fadeInRight");
            setTimeout(function () {
                document.getElementById('resultsDevAlias').classList.remove("animate__zoomInDown", "animate__delay-4s");
                document.getElementById('resultsDevAlias').classList.add("animate__pulse", "animate__infinite", "animate__slow");
            }, 8000);
        }, 500);
    }, ((1 + Math.floor(Math.random() * 4)) * 1000));
}

function getGeneratedName() {
    const randomFavLanguage = Math.floor(Math.random() * faveLanguageNouns[answers.favoriteLanguage].length);
    const randomSkillLevel = Math.floor(Math.random() * skillLevelAdjectives[answers.skillLevel].length);

    return "<span>" + skillLevelAdjectives[answers.skillLevel][randomSkillLevel] + "</span> <span>" + faveLanguageNouns[answers.favoriteLanguage][randomFavLanguage] + "</span>";
}

function getInvitingMessage() {
    const randomMessage = Math.floor(Math.random() * invitingMessages[answers.skillLevel].length);
    const messageRetrieved = invitingMessages[answers.skillLevel][randomMessage];
    var finalMessage = messageRetrieved.replace(/{{language}}/g, answers.favoriteLanguage);
    finalMessage = finalMessage.replace(/Discord/g, "<span style=\"color: #5865F2\">Discord</span>");
    finalMessage = finalMessage.replace(/our club/g, "<span style=\"color: #9cb3c9\">our club</span>");

    return finalMessage;
}