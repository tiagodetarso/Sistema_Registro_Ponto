const router = require('express').Router()
const bcrypt = require('bcrypt')

const Employee = require('../models/Employee')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Register Employee
router.post('/register', async(req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { name, registration, email, sector, position, workload, isManager, password, confirmpassword } = req.body

    // validations
    if (!name) {
        return res.status(422).json({msg: "O preenchimento do campo 'nome' é obrigatório!"})
    }

    if (!registration) {
        return res.status(422).json({msg: "O preenchimento do campo 'matrícula' é obrigatório!"})
    }

    if (!email) {
        return res.status(422).json({msg: "O preenchimento do campo 'e-mail' é obrigatório!"})
    }

    if (!password) {
        return res.status(422).json({msg: "Você precisa digitar a senha!"})
    }

    if(password !== confirmpassword) {
        return res.status(422).json({msg: 'As senhas digitadas não são iguais'})
    }

    // check if employee exists
    const employeeExists = await Employee.findOne({ registration: registration})

    if (employeeExists) {
        return res.status(422).json({ msg: "Já há um funcionário registrado com este número de matrícula!"})
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const retrievePasswordCode = []

    for (var i=0; i<6; i++) {
        let aleatorio = getRandomInt(0,9)
        retrievePasswordCode.push(aleatorio)
    }

    const codigoString = `${retrievePasswordCode[0]}${retrievePasswordCode[1]}${retrievePasswordCode[2]}${retrievePasswordCode[3]}${retrievePasswordCode[4]}${retrievePasswordCode[5]}`

    // create Employee
    const employee = new Employee({
        name,
        registration,
        email,
        sector,
        position,
        workload,
        isManager,
        password: passwordHash,
        retrievePassword: codigoString
    })

    try {
        await employee.save()
        res.status(201).json({msg: "Funcionário cadastrado com sucesso"})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Catch all the employees
router.get('/', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")

    try {
        const employee = await Employee.find({}, '-password -retrievePassword')

        // check if employee exists
        if(!employee) {
            return res.status(404).json({ msg: "Nenhuma equivalência encontrada" })
        }

        res.status(200).json(employee)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Catch employees by name or registration
router.post('/filtro', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration, name } = req.body

    if (!registration && !name) {
        try {
            var employee = await Employee.find({}, '-password -retrievePassword')
            console.log(employee)
        } catch (error) {
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        }

        if (employee.lenght === 0) {
            res.status(404).json({ msg: "Nenhuma equivalência foi encontrada" })
        } else {
            res.status(200).json(employee)
        }     

    } else if (!registration) {
        try {
            var employee = await Employee.find({name:{$regex: name, $options:'i'}}, '-password -retrievePassword')
        } catch (error) {
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        }

       if (employee.length === 0) {
            res.status(404).json({msg: "Nenhuma equivalência foi encontrada" })
        } else {
            res.status(200).json(employee)
        }     

    } else if (!name) {
        try {
            var employee = await Employee.find({registration:{$regex: registration, $options:'i'}}, '-password -retrievePassword')
        } catch (error) {
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        } 

        if (employee.lenght === 0) {
            res.status(404).json({ msg: "Nenhuma equivalência foi encontrada" })
        } else {
            res.status(200).json(employee)
        }     

    } else {
        try {
            var employee = await Employee.find({registration:{$regex: registration, $options:'i'}, name:{$regex: name, $options:'i'}}, '-password -retrievePassword')
        } catch (error) {
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        } 

        if (employee.lenght === 0) {
            res.status(404).json({ msg: "Nenhuma equivalência foi encontrada" })
        } else {
            res.status(200).json(employee)
        }     
    } 
})


// Login Employee
router.post('/login', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration, password } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Você não digitou o número de matrícula!"})
    }

    if (!password) {
        return res.status(422).json({msg: "Você não digitou a senha!"})
    }

    // check if employee exists
    const employee = await Employee.findOne({ registration: registration })

    if (!employee) {
        return res.status(404).json({ msg: "Não foi encontrado funcionário com este número de matrícula!"})
    }

    // check if the password match
    const checkPassword = await bcrypt.compare(password, employee.password)

    if (!checkPassword) {
        return res.status(422).json({msg: "Senha inválida!"})
    } else {

    try {
        const content =
            {
                id: employee.id,
                name: employee.name,
                registration: employee.registration,
                email: employee.email,
                isManager: employee.isManager
            }
        
    
        res.status(200).json({msg: "Login realizado com sucesso", content})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
    }
})

// Recover Passoword 1
router.post('/rsenha', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")

    const { registration } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Você não digitou o número de matrícula!"})
    }

    // check if employee exists
    const employee = await Employee.findOne({ registration: registration })

    if (!employee) {
        return res.status(404).json({ msg: "Não foi encontrado funcionário com este número de matrícula!"})
    }

    // pegar codigo
    const endereco = employee.email
    const codigo = employee.retrievePassword

    try {
        const content =
            {
                codigo: codigo,
                email: endereco
            }
        
        res.status(200).json({msg: "Codigo criado com sucesso", content})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }
})

// Define New Password
router.patch('/novasenha', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "PATCH")

    const { registration, codigo, newPassword, repeatPassword } = req.body

    // validations
    if (!registration) {
        return res.status(422).json({msg: "Você não inseriu o número de matrícula!"})
    }

    if (!codigo) {
        return res.status(422).json({msg: "Você não inseriu o código de recuperação!"})
    }

    if (!newPassword) {
        return res.status(422).json({msg: "Você não digitou sua nova senha!"})
    }

    if (!repeatPassword) {
        return res.status(422).json({msg: "Você não confirmou a nova senha!"})
    }

    if (newPassword !== repeatPassword) {
        return res.status(422).json({msg: "As senhas digitadas devem ser iguais!"})
    }

    // check if employee exists
    const employee = await Employee.findOne({ registration: registration })

    if (!employee) {
        return res.status(404).json({ msg: "Não foi encontrado funcionário com este número de matrícula!"})
    }

    // check if retrievePasswordCode is valid
    if (employee.retrievePassword !== codigo) {
        return res.status(404).json({ msg: "Código de recuperação de senha inválido"})
    }

    const saltt = await bcrypt.genSalt(12)
    const newPasswordHash = await bcrypt.hash(newPassword, saltt)

    const retrievePasswordCode = []

    for (var i=0; i<6; i++) {
        let aleatorio = getRandomInt(0,9)
        retrievePasswordCode.push(aleatorio)
    }

    const codigoString = `${retrievePasswordCode[0]}${retrievePasswordCode[1]}${retrievePasswordCode[2]}${retrievePasswordCode[3]}${retrievePasswordCode[4]}${retrievePasswordCode[5]}`

    try {
            const updateSenha = await Employee.findOneAndUpdate({registration: registration}, {password: newPasswordHash})
            const updateCodigo = await Employee.findOneAndUpdate({registration: registration}, {retrievePassword: codigoString })
            res.status(200).json({msg: "Senha alterada com sucesso"})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        }
})

// Redefine Password
router.patch('/redefinirsenha', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "PATCH")

    const { registration, newPassword, repeatPassword } = req.body
    
    // validations
    if (!registration) {
        return res.status(422).json({msg: "Você não inseriu o número de matrícula!"})
    }

    if (!newPassword) {
        return res.status(422).json({msg: "Você não digitou sua nova senha!"})
    }

    if (!repeatPassword) {
        return res.status(422).json({msg: "Você não confirmou a nova senha!"})
    }

    if (newPassword !== repeatPassword) {
        return res.status(422).json({msg: "As senhas digitadas devem ser iguais!"})
    }

    // check if employee exists
    const employee = await Employee.findOne({ registration: registration })
    console.log(employee)

    if (!employee) {
        return res.status(404).json({ msg: "Não foi encontrado funcionário com este número de matrícula!"})
    }

    const saltt = await bcrypt.genSalt(12)
    const newPasswordHash = await bcrypt.hash(newPassword, saltt)

    try {
            const updateSenha = await Employee.findOneAndUpdate({registration: registration}, {password: newPasswordHash})
            res.status(200).json({msg: "Senha alterada com sucesso"})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
        }
})

// Edit employee
router.patch('/editar', async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "PATCH")

    const {id, name, registration, email, sector, position, workload, isManager } = req.body

    // validations
    if (!name) {
        return res.status(422).json({msg: "Você não pode deixar o campo 'nome' vazio!"})
    }

    if (!registration) {
        return res.status(422).json({msg: "Você não pode deixar o campo 'matrícula' vazio!"})
    }

    if (!email) {
        return res.status(422).json({msg: "Você não pode deixar o campo 'e-mail' vazio!"})
    }

      // check if employee exists
      const employeeExists = await Employee.findOne({ registration: registration})

      if (employeeExists && employeeExists._id != id ) {
        return res.status(422).json({ msg: "Já há um funcionário registrado com este número de matrícula!"})
    }

    try {
        const updateFuncionario = await Employee.findOneAndUpdate({_id: id}, {name: name, registration: registration, email: email, position: position, workload: workload, isManager: isManager})
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
        const deleteEmployee = await Employee.deleteOne({_id: id})
        res.status(200).json({msg: "Funcionário deletado com sucesso"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erro no servidor. Tente novamente, mais tarde!"})
    }

})

module.exports = router