const { exists, appendFile, writeFile, write } = require("fs");
const readline = require("readline");
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question(
  "Qual é o arquivo que deseja trabalhar?\n",
  (nomeDoArquivo) => {
    exists(nomeDoArquivo, (existe) => {
      if (existe) {
        terminal.question(
          "O arquivo já existe! Escreva algo para incluir\n",
          (texto) => {
            if (!texto) {
              console.log("O texto indicado é invalido! Tente Novamente");
              return;
            }

            appendFile(nomeDoArquivo, `${texto}\n`, (err) => {
              if (err) {
                console.log("Erro ao adicionar texto no arquivo.");
                return;
              }
              console.log("Texto adicionado com sucesso!");
              terminal.close();
            });
          }
        );
      } else {
        terminal.question(
          "O Arquivo não existe! Escreva algo para incluir\n",
          (texto) => {
            if (!texto) {
              console.log("o texto indicado é invalido! Tente Novamente!!");
              return;
            }
            writeFile(nomeDoArquivo, `${texto}\n`, (err) => {
              if (err) {
                console.log("Erro ao adicionar texto no arquivo");
                return;
              }
              console.log("Texto adicionado com sucesso!");
              terminal.close();
            });
          }
        );
      }
    });
  }
);
