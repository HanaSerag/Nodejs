// create a function that resolves after 1 second
function delayValue(value, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
};

// create a function that rejects after 1 second
function delayFail(value, ms) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(value));
        }, ms);
    });
};

// Task 2 — promisifyQuestion(rl, question)
// Wrap readline.question into a Promise that resolves with the
// user's trimmed answer, or rejects if something goes wrong.
// (No async/await; use new Promise + rl.question)
function promisifyQuestion(rl, question) {
    return new Promise((resolve, reject) => {
        try {
            rl.question(question, (answer) => {
                if (answer === undefined) {
                    reject(new Error("No answer provided"));
                } else {
                    resolve(answer.trim());
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};
