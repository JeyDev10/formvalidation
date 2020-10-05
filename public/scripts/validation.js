// Validando se os campos estão preenchidos

// Modificando o alerta de validação nome
document.querySelector('form input[name="nome"]').oninvalid = function() {
    this.setCustomValidity("")
    if (!this.validity.valid) {
        // se estiver inválido, coloca a mensagem
        this.setCustomValidity("Por favor, informe seu nome!");
    }
}

//Modificando o alerta de validação Telefone
document.querySelector('form input[name="telefone"]').oninvalid = function() {
    this.setCustomValidity("")
    if (!this.validity.valid) {
        // se estiver inválido, coloca a mensagem
        this.setCustomValidity("Por favor, informe um telefone válido!");
    }
}

//Modificando o alerta de validação E-mail
document.querySelector('form input[name="email"]').oninvalid = function() {
        this.setCustomValidity("")
        if (!this.validity.valid) {
            // se estiver inválido, coloca a mensagem
            this.setCustomValidity("Por favor, informe um e-mail válido !");

        }
    }
    //Modificando o alerta de validação Comentário
document.querySelector('form textarea[name="comment"]').oninvalid = function() {
    this.setCustomValidity("")
    if (!this.validity.valid) {
        // se estiver inválido, coloca a mensagem
        this.setCustomValidity("Por favor informe o seu comentário !");

    }
}



// 2º etapa de validação
//Validação nome
const inputName = document.querySelector('input[name="nome"]')
let validName = false

inputName.addEventListener("change", (event) => {
    let nameStr = event.target.value

    let spanMsg = inputName.nextElementSibling

    let patternResult = nameStr.match(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ \s]/g)
    console.log(patternResult)

    if (patternResult != null) {
        spanMsg.textContent = "Nome inválido !"
        validName = false;

    } else {
        validName = true
        spanMsg.textContent = ""
    }


})

// Mensagem de erro telefone


const inputTel = document.querySelector('input[name="telefone"]')

let validTel = false

let setMask

inputTel.addEventListener("keyup", (event) => {

    let telStr = event.target.value
    let span = inputTel.nextElementSibling

    let patternResult

    if (setMask == true) {
        patternResult = telStr.match(/[^0-9 \s ( ) -]/g)

    } else {
        patternResult = telStr.match(/[\D]/g);

    }


    if (patternResult != null) {
        span.textContent = "Telefone incorreto, por favor digitar apenas números"
        validTel = false;
    } else {
        span.textContent = "";
        validTel = true;
        setMask = createTelMask(inputTel)

    }


})

//Máscara telefone

function createTelMask(tel) {
    let fullTel = tel.value
    if (fullTel.length >= 10 && validTel === true) {
        if (fullTel.length == 10) {
            let dd = fullTel.slice(0, 2)
            let parte1 = fullTel.slice(2, 6)
            let parte2 = fullTel.slice(6)

            tel.value = `(${dd}) ${parte1}-${parte2}`

        } else {

            fullTel = fullTel.match(/[0-9]/g)
            fullTel = fullTel.join("")

            let dd = fullTel.slice(0, 2)
            let parte1 = fullTel.slice(2, 7)
            let parte2 = fullTel.slice(7)

            tel.value = `(${dd}) ${parte1}-${parte2}`

        }
        return true;
    }

    return false


}

//Validação Campo Sexo:
const sexoOptions = document.querySelectorAll('input[name="sexo"]')
let validSexo = false
for (let sexo of sexoOptions) {
    sexo.addEventListener("change", () => {

        validSexo = true
        console.log(validSexo)
    })

}

//Validação submit:

const form1 = document.forms.sendComment
const submitMsg = form1.querySelector('button[type="submit"]').previousElementSibling
form1.addEventListener('submit', (event) => {
    if (validName !== true || validSexo !== true || validTel !== true) {
        event.preventDefault()
        submitMsg.innerHTML = `Não foi possível enviar o comentário, pelos seguintes motivos:<br>
        Campo(s) inválido(s), ou não repondido(s).
        `


    }

})