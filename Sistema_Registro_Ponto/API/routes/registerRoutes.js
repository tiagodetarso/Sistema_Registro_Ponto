const router = require('express').Router()

const Register = require('../models/Register')

function IntervaloTempoString (IntervaloTempoTimeStamp) {

    var qtHoras = Math.trunc(IntervaloTempoTimeStamp / 3600000)
    var restoHoras = IntervaloTempoTimeStamp % 3600000
    
    if (restoHoras > 0) {
        var qtMinutos = Math.trunc(restoHoras / 60000)
        var restoMinutos = restoHoras % 60000

        if (restoMinutos != 0) {
             var qtSegundos = Math.trunc(restoMinutos / 1000)
        
        } else {
            var qtSegundos = "00"
        }
    } else {
        var qtMinutos = "00"
         var qtSegundos = "00"
    }
    
    let stringIntervalo = ('0'+qtHoras).slice(-2)+':'+('0'+qtMinutos).slice(-2)+':'+('0'+qtSegundos).slice(-2)

    return stringIntervalo
}

// Bater o ponto
router.post('/', async(req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration, geoLocal, numberTime } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Funcionário não identificado!"})
    }

    if (!geoLocal) {
        return res.status(422).json({msg: "Não foi feito o envio do local do registro"})
    }

    if (!numberTime) {
        return res.status(422).json({msg: "Não foi feito o envio do número do dia e da hora do registro"})
    }

    // create Register
    const register = new Register({
        registration,
        geoLocal,
        numberTime
    })

    try {
        await register.save()
        res.status(201).json({msg: "Ponto registrado com sucesso"})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Get last seven days registers of a employee
router.post("/ultimos", async(req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Funcionário não identificado!"})
    }

    try {
        let lastRegisters = await Register.find({registration:registration, numberTime: {$gt: (Date.now() - (7*86400000))}}).sort({ numberTime: -1})
       
        // check if there is any register
        if(!lastRegisters) {
            return res.status(404).json({ msg: "Nenhum registro encontrado" })
        }

        res.status(200).json(lastRegisters)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Get Report
router.post("/relatorio", async(req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration, initialDate, finalDate } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Funcionário não identificado!"})
    }

    if (!initialDate) {
        return res.status(422).json({msg: "Você não digitou a data de início do relatório"})
    }

    if (!finalDate) {
        return res.status(422).json({msg: "Você não digitou a data de fim do relatório"})
    }

    if (initialDate > finalDate) {
        return res.status(404).json({msg: "A data de início é mais recente que a data de fim"})
    }

    try {
        let Registers = await Register.find(
                {$and: 
                    [
                        {registration: "0001"},
                        {numberTime: {$gt: (Number(Date.parse(initialDate)))}}, 
                        {numberTime: {$lt: (Number(Date.parse(finalDate))) + 86400000}}
                    ]
                }).sort({ numberTime: 1 })
       
        // check if there is any register
        if(!Registers) {
            return res.status(404).json({ msg: "Nenhum registro encontrado mo período" })
        }

        let arrayTimeStamp = []
        let arrayDiaMesAno = []
        let arrayStringDiaMesAno = []
        let arrayHoraMinutoSegundo = []
        let arrayStringHoraMinutoSegundo =[]

        for (let registro of Registers) {
            let timeStamp = registro.numberTime

            let dia = new Date(timeStamp).getDate()
            let diaString = ('0'+String(dia)).slice(-2)

            let mes = new Date(timeStamp).getMonth() + 1
            let mesString = ('0'+String(mes)).slice(-2)
        
            let ano = new Date(timeStamp).getFullYear()
            let anoString = String(ano)

            let hora = new Date(timeStamp).getHours()
            let horaString = ('0'+String(hora)).slice(-2)

            let minuto = new Date(timeStamp).getMinutes()
            let minutoString = ('0'+String(minuto)).slice(-2)

            let segundo = new Date(timeStamp).getSeconds()
            let segundoString = ('0'+String(segundo)).slice(-2)

            let diaMesAno = [dia, mes, ano]
            let stringDiaMesAno = diaString+"/"+mesString+"/"+anoString
            let horaMinutoSegundo = [hora, minuto, segundo]
            let stringHoraMinutoSegundo = horaString+":"+minutoString+":"+segundoString

            arrayTimeStamp.push(timeStamp)
            arrayDiaMesAno.push(diaMesAno)
            arrayStringDiaMesAno.push(stringDiaMesAno)
            arrayHoraMinutoSegundo.push(horaMinutoSegundo)
            arrayStringHoraMinutoSegundo.push(stringHoraMinutoSegundo)
        }

        let periodo = []

        let umDia = []

        for (let i = 0; i <= arrayTimeStamp.length; i++) {
            if (arrayStringDiaMesAno[i-1]) {
                if (arrayStringDiaMesAno[i] != arrayStringDiaMesAno[i-1]) {
                    umDia.push(
                        arrayStringDiaMesAno[i],
                        arrayTimeStamp[i],
                        arrayStringHoraMinutoSegundo[i],
                        )
                } else {
                    umDia.push(
                        arrayTimeStamp[i],
                        arrayStringHoraMinutoSegundo[i]
                    )
                }
                if (arrayStringDiaMesAno[i] != arrayStringDiaMesAno[i+1] | i+1 === arrayTimeStamp.lenght) {
                    periodo.push(umDia)
                    umDia = []
                }
            } else {
                umDia.push(
                        arrayStringDiaMesAno[i],
                        arrayTimeStamp[i],
                        arrayStringHoraMinutoSegundo[i],
                        )
            }
        }

        for (dia of periodo) {
            if (dia.length > 13) {
                while (dia.length > 13) {
                    dia.pop()
                }
                var totalDia = "Iconsistência"
                var stringTotalDia = "Mais de 6 registros"
                dia.push(totalDia)

            } else if (dia.length === 13) {
                var totalDia = (dia[11] - dia[9]) + (dia [7] - dia [5]) + (dia[3] - dia[1])
                dia.push(totalDia)

            } else if (dia.length === 11 | dia.length === 7 | dia.length === 3) {
                var totalDia = "Inconsistência"
                var stringTotalDia = "Nº ímpar de registros"
                if (dia.length === 11) {
                    dia.push( 0, "X", totalDia, "X", stringTotalDia)
                } else if (dia.length === 7) {
                    dia.push(0, "X", 0, "X", 0,  totalDia, "X", stringTotalDia)
                } else if (dia.length === 3) {
                    dia.push(0, "X", 0, "X", 0, "X", 0, "X", 0, totalDia, "X", stringTotalDia)
                } 
                
            } else if (dia.length === 9) {
                var totalDia = (dia [7] - dia [5]) + (dia[3] - dia[1])
                dia.push(0, 'X', 0, 'X', totalDia)

            } else if (dia.length === 5) {
                var totalDia = (dia[3] - dia[1])
                dia.push(0, 'X', 0, 'X', 0, 'X', 0, 'X', totalDia)
            }
        }

        for (dia of periodo) {
            if (dia[13] > 0) {

                stringTotalDia = IntervaloTempoString(dia[13])

                dia.push(stringTotalDia)
            }
        }

        let i = 0
        let totalPeriodo = 0
        for (dia of periodo) {
            totalPeriodo += dia[13]
            i++
        }

        let mediaPeriodo = totalPeriodo / i

        let stringTotalPeriodo = IntervaloTempoString(totalPeriodo)
        let stringMediaPeriodo = IntervaloTempoString(mediaPeriodo)

        periodo.push(["","","","","","","","","","","","","Total Período", totalPeriodo, stringTotalPeriodo])
        periodo.push(["","","","","","","","","","","","","Média Período", mediaPeriodo, stringMediaPeriodo])
        

        res.status(200).json({content: periodo, msg:"Relatório gerado com sucesso!"})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Catch registers by name or registration
router.post('/filtro', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration, date } = req.body

    const d = new Date(date)
    const dateNumber = d.getTime()
    const dateNumberPlus = dateNumber + 86400000

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Digite o número de matrícula"})
    }

    if (!date) {
        return res.status(422).json({msg: "Escolha o dia do registro"})
    }

    try {
        var register = await Register.find(
            {$and: 
                [
                    {registration: registration},
                    {numberTime: {$gt: dateNumber}}, 
                    {numberTime: {$lt: dateNumberPlus}}
                ]
            })

    } catch (error) {
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    } 

    if (!register) {
        res.status(404).json({ msg: "Nenhuma equivalência foi encontrada" })
    } else {
        res.status(200).json(register)
    }     
})

// Edit register
router.patch('/editar', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "PATCH")

    const { id, registration, geoLocal, dia, hora } = req.body

    const numeros = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const barra = ['/']
    const doisPontos = [':']

    let numberTime = new Date(dia.slice(6,10)+"-"+dia.slice(3,5)+"-"+dia.slice(0,2)+" "+hora)

    numberTime = Date.parse(numberTime)

    // validations
    if (!id) {
        return res.status(422).json({msg: "Ocorreu algum problema com o id do registro."})
    }

    if (!registration) {
        return res.status(422).json({msg: "Ocorreu algum problema com o número de matrícula."})
    }

    if (!geoLocal.latitude) {
        return res.status(422).json({msg: "A latitude não esta preenchida"})
    }

    if (!geoLocal.longitude) {
        return res.status(422).json({msg: "A longitude não está preenchida"})
    }

    if (!dia) {
        return res.status(422).json({msg: "O dia não foi preenchido"})
    }

    if (dia.length != 10) {
        return res.status(422).json({msg: "O dia não está no formato correto!"})
    }

    if (hora.length != 8) {
        return res.status(422).json({msg: "A hora não está no formato correto!"})
    }

    if (
        !(numeros.some(v => dia.at(0).includes(v))) |
        !(numeros.some(v => dia.at(1).includes(v))) |
        !(barra.some(v => dia.at(2).includes(v))) |
        !(numeros.some(v => dia.at(3).includes(v))) |
        !(numeros.some(v => dia.at(4).includes(v))) |
        !(barra.some(v => dia.at(5).includes(v))) |
        !(numeros.some(v => dia.at(6).includes(v))) |
        !(numeros.some(v => dia.at(7).includes(v))) |
        !(numeros.some(v => dia.at(8).includes(v))) |
        !(numeros.some(v => dia.at(9).includes(v))) 
    ) {
        return res.status(422).json({msg: "O dia não está no formato correto!"})
    }

    if (
        !(numeros.some(v => hora.at(0).includes(v))) |
        !(numeros.some(v => hora.at(1).includes(v))) |
        !(doisPontos.some(v => hora.at(2).includes(v))) |
        !(numeros.some(v => hora.at(3).includes(v))) |
        !(numeros.some(v => hora.at(4).includes(v))) |
        !(doisPontos.some(v => hora.at(5).includes(v))) |
        !(numeros.some(v => hora.at(6).includes(v))) |
        !(numeros.some(v => hora.at(7).includes(v))) 
    ) {
        return res.status(422).json({msg: "A hora não está no formato correto!"})
    }
    
      // check if employee exists
      const registerExists = await Register.findOne({ _id: id})

      if (!registerExists) {
        return res.status(422).json({ msg: "O registro não foi encontrado!"})
    }

    try {
        const updateRegister = await Register.findOneAndUpdate({_id: id}, {registration: registration, geoLocal:geoLocal, numberTime:numberTime})
        res.status(200).json({msg: "Dados atualizados com sucesso"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Delete employee
router.post('/delete', async(req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { id } = req.body

    // validations
    if (!id) {
        return res.status(422).json({msg: "Não foi encontrado documento a ser deletado"})
    }

    try {
        const deleteEmployee = await Register.deleteOne({_id: id})
        res.status(200).json({msg: "Registro deletado com sucesso"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }

})

module.exports = router