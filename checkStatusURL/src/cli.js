import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';

//process.argv captura os argumentos digitados no terminal
const caminho = process.argv;

function imprimeLista(resultado, identificador = ''){
    console.log(
        chalk.yellow('lista de links'), 
        chalk.black.bgGreen(identificador),
        resultado)
}


async function processaTexto(argumentos){
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
    }
    catch (erro){
        if (erro.code === 'ENOENT'){
            console.log(chalk.red('ARQUIVO OU DIRETORIO NÃO EXISTE'))
            return
        }
    }

    {
        if (fs.lstatSync(caminho).isFile()){
            const resultado = await pegaArquivo(caminho)
            imprimeLista(resultado)
        }
        else if (fs.lstatSync(caminho).isDirectory()){
            const arquivos = await fs.promises.readdir(caminho)
            arquivos.forEach(async (nomeDeArquivo) => {
                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
                imprimeLista(lista, nomeDeArquivo)
            })
        }}
}

processaTexto(caminho)