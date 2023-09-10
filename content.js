console.log('👨‍💻 Author: Adarsh Patil \n🌟 GitHub: https://github.com/apmsazure \n🚀Linkedin: https://www.linkedin.com/in/adarsh-patil-69054a198');

let inter = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (window.location.href.includes("onlinetest.hitbullseye.com/online_load")) {
        if (request.message === "start") {
            if (Object.keys(request.answer_key).length === 0) {
                toast("Please enter the answer key", "error");
                return;
            }

            attempt(request.answer_key, request.time);
        } else if (request.message === "stop") {
            stopAttempt();
        }
    }
    else {
        toast("Please open the test page", "error");
    }
});

const attempt = (ans_key, time) => {
    const ans = ans_key;
    const len = ans.length;
    let i = 0;

    toast("Started attempting the test don't go anywhere");

    async function attemptQuestion() {
        document.querySelector(`#${ans[i]}_${i + 1}`).click();
        document.querySelector("#main_div > div.tableWidthPercent > div.onlineTestLeftDiv > div.qnav > span.saveNextButton > a").click();
        i++;

        if (i === len) {
            toast("Finished attempting the test");
            clearInterval(inter);
            await new Promise(r => setTimeout(r, 1000));
            document.querySelector('#activator').click();
            document.querySelector('input[name="rd"][value="Y"]').click();
        }
    }

    inter = setInterval(attemptQuestion, time * 1000 || 1500);
}

function stopAttempt() {
    if (inter) {
        clearInterval(inter);
        toast("Stopped attempting the test");
    }
}