const { existsSync, appendFile, writeFile } = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(writeFile);
const appendFileAsync = promisify(appendFile);


const readline = require("readline");
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const functionToPromise = (func, ...args) => {
    return new Promise((resolve, reject) => func(...args, resolve));
}
const questionFunc = terminal.question.bind(terminal);
const questionAsync = msg => functionToPromise(questionFunc, `${msg}\n`)

    ;
(async function main() {

    try {
        
        const filename = await questionAsync('Qual é o arquivo que deseja trabalhar?');
        const text = await questionAsync('Escreva algo para incluir');
        const fileExists = existsSync(filename);

        if (fileExists) {
            await appendFileAsync(filename, `\n${text}`);

            console.log(`${text} adicionado à ${filename}`);
            return;
        }
        await writeFileAsync(filename, text);

    } catch (error) {
        console.error("Deu ruim!", error)
    } finally {
        console.log("\nProcesso finalizado!!");
        terminal.close();
    }
})()
