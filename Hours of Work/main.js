 // Get the file input element
 const fileInput = document.getElementById('file-input');
 const texts = [];


function getNome(text) {

    var nome = ""
    for (let x = 0; x < text.length; x++) {
        if(text[x] + text[x + 1] + text[x + 2] + text[x + 3] + text[x + 4] + text[x + 5] == "Setor:"){
            var indiceNome = x + 15
 
            for (let n = 0; n < text.length; n++) {
                if (text[indiceNome + n] + text[indiceNome + n + 1] + text[indiceNome + n + 2] + text[indiceNome + n + 3] == "CTPS") {
                    return nome
                }
                nome += text[indiceNome + n]
            }

        }
        

    }
}

function getCargo(text) {
    var cargo = ""

    for (let x = 0; x < text.length; x++) {
        if(text[x] + text[x + 1] + text[x + 2] + text[x + 3] + text[x + 4] + text[x + 5] + text[x + 6] == "Filial:"){
            var indiceCargo = x + 7

            for (let c = 0; c < text.length; c++) {
                if (text[indiceCargo + c] + text[indiceCargo + c + 1] + text[indiceCargo + c + 2] + text[indiceCargo + c + 3] + text[indiceCargo + c + 4] + text[indiceCargo + c + 5] + text[indiceCargo + c + 6] + text[indiceCargo + c + 7] + text[indiceCargo + c + 8] + text[indiceCargo + c + 9] == "Empregado:" ) {
                    return cargo
                }
                cargo += text[indiceCargo + c]
            }
        }
        
    }


}

function getSaldoF(text) {
    var SaldoF = ""



    for (let x = 0; x < text.length; x++) {
        if(text[x] + text[x + 1] + text[x + 2] + text[x + 3] + text[x + 4] + text[x + 5] + text[x + 6] + text[x + 7] + text[x + 8] + text[x + 9] + text[x + 10] + text[x + 11] + text[x + 12] + text[x + 13] + text[x + 14] + text[x + 15] == "Banco de Horas: "){
            var indiceSaldoF = x + 16
            for (let s = 0; s < text.length; s++) {
                if (text[indiceSaldoF + s] + text[indiceSaldoF + s + 1] + text[indiceSaldoF + s + 2] + text[indiceSaldoF + s + 3] + text[indiceSaldoF + s + 4] + text[indiceSaldoF + s + 5] + text[indiceSaldoF + s + 6] + text[indiceSaldoF + s + 7] + text[indiceSaldoF + s + 8] + text[indiceSaldoF + s + 9] + text[indiceSaldoF + s + 10] + text[indiceSaldoF + s + 11] + text[indiceSaldoF + s + 12] + text[indiceSaldoF + s + 13] == "Saldo Negativo") {
                    var SaldoFSplit = SaldoF.split(" ")[2]
                    return SaldoFSplit
                }
                SaldoF += text[indiceSaldoF + s]
            }
        }


    }
}




 fileInput.addEventListener('change', function() {

     const file = fileInput.files[0];


     const reader = new FileReader();

 
     reader.addEventListener('load', function() {

         pdfjsLib.getDocument(reader.result).promise.then(function(pdf) {



             for (let i = 1; i <= pdf.numPages; i++) {

                 pdf.getPage(i).then(function(page) {

                     page.getTextContent().then(function(textContent) {

                         const text = textContent.items.map(function(item) {
                             return item.str;
                         }).join('');

                         console.log(getNome(text),getCargo(text),getSaldoF(text)) 
                         // Acesse a tabela
                        var tabela = document.getElementById("tabelaItens");

                        // Crie uma nova linha
                        var novaLinha = document.createElement("tr");

                        // Crie duas novas células
                        var nome = document.createElement("td");
                        var cargo = document.createElement("td");
                        var saldo = document.createElement("td");
                        var tamanhoSaldo = getSaldoF(text).length
                        var saldoNegativo = getSaldoF(text).slice(0, -1);

                        nome.textContent = getNome(text);
                        cargo.textContent = getCargo(text);
                        
                        if (tamanhoSaldo == 6) {
                            saldo.setAttribute("id", "saldoNegativo");
                            saldo.textContent = "-" + saldoNegativo;
                        }else if(tamanhoSaldo == 5){
                            saldo.setAttribute("id", "saldoPositivo");
                            saldo.textContent = getSaldoF(text);
                        }

                        novaLinha.appendChild(nome);
                        novaLinha.appendChild(cargo);
                        novaLinha.appendChild(saldo);

                        tabela.appendChild(novaLinha);
                         

                        texts.push(text); 

                     });
                 });
             }
         });
     });

     reader.readAsDataURL(file);
 });