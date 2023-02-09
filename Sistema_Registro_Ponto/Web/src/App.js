import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Container from './layout/Container'
import NavBar from './layout/NavBar'
import Message from './layout/Message'
import Footer from './layout/Footer'
import Login from './pages/Login'
import Bponto from './pages/Bponto'
import Rsenha1 from './pages/Rsenha1'
import UlRegistros from './pages/UlRegistros'
import Solicitacoes from './pages/Solicitacoes'
import Relatorios from './pages/Relatorio'
import AteLogo from './pages/AteLogo'
import Gestor from './pages/Gestor'
import NovaSenha from './pages/NovaSenha'
import Report from './pages/Report'

import CadastrarFunc from './pages/CadastrarFunc'
import PesquisarFunc from './pages/PesquisarFunc'
import InserirReg from './pages/InserirReg'
import PesquisarReg from './pages/PesquisarReg'
import RelatorioGestor from './pages/RelatorioGestor'
import EditarFunc from './pages/EditarFunc'
import EditarReg from './pages/EditarReg'
import RedefinirSenha from './pages/RedefinirSenha'

function App() {

  const [employee, setEmployee] = useState({})
  const [mensagem, setMensagem] = useState("")
  const [tipoMsg, setTipoMsg] = useState("")
  const [arrayRelat, setArrayRelat] = useState([])

  useEffect (() => {
    setTimeout(() => {
        setMensagem("")
    }, 5000)
}, [mensagem])


  function LoginToApp (msg, content) {
    setEmployee(content?content:{id:"",name:"",registration:"", isManager:false})
    setMensagem(msg)
    msg === "Login realizado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function BpontoToApp (msg) {
    setMensagem(msg)
    msg === "Ponto registrado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function AteLogoToApp (object) {
    setEmployee(object)
    setMensagem("Desconexão realizada com sucesso")
    setTipoMsg("success")
  }

  function RsenhaToApp (msg) {
    setMensagem(msg)
    msg === "E-mail enviado com sucesso!" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function NovaSenhaToApp (msg) {
    setMensagem(msg)
    msg === "Senha alterada com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function RelatorioToApp (msg, array) {
    setMensagem(msg)
    setArrayRelat(array)
    msg === "Relatório gerado com sucesso!" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function RelatorioGestorToApp (msg, array) {
    setMensagem(msg)
    setArrayRelat(array)
    msg === "Relatório gerado com sucesso!" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function SolicitacoesToApp (msg) {
    setMensagem(msg)
    msg === "E-mail enviado com sucesso!" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function RedefinirSenhaToApp (msg) {
    setMensagem(msg)
    msg === "Senha alterada com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function CadastrarFuncToApp (msg) {
    setMensagem(msg)
    msg === "Funcionário cadastrado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function EditarToApp (msg) {
    setMensagem(msg)
    msg === "Dados atualizados com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function PesquisarFuncToApp (msg) {
    setMensagem(msg)
    msg === "Funcionário deletado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function InserirRegToApp (msg) {
    setMensagem(msg)
    msg === "Ponto registrado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function EditarRegToApp (msg) {
    setMensagem(msg)
    msg === "Dados atualizados com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  function PesquisarRegToApp (msg) {
    setMensagem(msg)
    msg === "Registro deletado com sucesso" ? setTipoMsg("success") : setTipoMsg("error")
  }

  
  return (
    <Router>
      <NavBar nome={employee?employee.name:null} matricula={employee?employee.registration:null} />
      <Container customClass='min_height'>
        <Routes>
          <Route path="/" 
            element={<Login LoginToApp={LoginToApp} />}>
          </Route>
          <Route 
            path="/ponto" 
            element={<Bponto employee={employee} BpontoToApp={BpontoToApp}/>}>
          </Route>
          <Route 
            path="/ulregistros" 
            element={<UlRegistros employee={employee} />}>
          </Route>
          <Route 
            path="/relatorios" 
            element={<Relatorios employee={employee} RelatorioToApp={RelatorioToApp}/>}>
          </Route>
          <Route 
            path="/solicitacoes" 
            element={<Solicitacoes employee={employee} SolicitacoesToApp={SolicitacoesToApp} />}>
          </Route>
          <Route 
            path="/redefinirsenha" 
            element={<RedefinirSenha employee={employee} RedefinirSenhaToApp={RedefinirSenhaToApp} />}>
          </Route>
          <Route 
            path="/gestor" 
            element={<Gestor employee={employee} />}>
          </Route>
          <Route 
            path="/gestor/cadastrar" 
            element={<CadastrarFunc employee={employee} CadastrarFuncToApp={CadastrarFuncToApp}/>}>
          </Route>
          <Route 
            path="/gestor/pesqf" 
            element={<PesquisarFunc employee={employee} PesquisarFuncToApp={PesquisarFuncToApp} />}>
          </Route>
          <Route 
            path="/gestor/pesqf/editar" 
            element={<EditarFunc employee={employee} EditarToApp={EditarToApp}/>}>
          </Route>
          <Route 
            path="/gestor/inserir" 
            element={<InserirReg employee={employee} InserirRegToApp={InserirRegToApp}/>}>
          </Route>
          <Route 
            path="/gestor/pesqr" 
            element={<PesquisarReg employee={employee} PesquisarRegToApp={PesquisarRegToApp}/>}>
          </Route>
          <Route 
            path="/gestor/pesqr/editar" 
            element={<EditarReg employee={employee} EditarRegToApp={EditarRegToApp}/>}>
          </Route>
          <Route 
            path="/gestor/relatorio" 
            element={<RelatorioGestor employee={employee} RelatorioGestorToApp={RelatorioGestorToApp}/>}>
          </Route>
          <Route 
            path="/atelogo" 
            element={<AteLogo employee={employee} AteLogoToApp={AteLogoToApp}/>}>
          </Route>
          <Route 
            path="/rsenha" 
            element={<Rsenha1 RsenhaToApp={RsenhaToApp} />}>
          </Route>
          <Route 
            path="/novasenha" 
            element={<NovaSenha NovaSenhaToApp={NovaSenhaToApp}/>}>
          </Route>
          <Route 
            path="/relatorios/report" 
            element={<Report employee={employee} array={arrayRelat}/>}>
          </Route>
        </Routes>
      </Container>
      <Message type={tipoMsg} msg={mensagem}/>
      <Footer />
    </Router>
  );
}

export default App;
