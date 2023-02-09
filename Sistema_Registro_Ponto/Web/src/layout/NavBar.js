import React from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './NavBar.module.css'

import logo from '../img/rp_logo.png'


function NavBar ({nome, matricula }) {
    return (
        <nav className={styles.navbar}>
            <Container>
                <img src={logo} alt="rponto" />
                <h1 className={styles.titulo}>Registro PonTTo</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/ponto">Bater PonTTo</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/ulregistros">Últimos Registros</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/relatorios">Relatório</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/solicitacoes">Solicitações</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/redefinirsenha">Redefinir Senha</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/gestor">Gestor</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/atelogo">Sair</Link>
                    </li>
                </ul><br></br>
                <h5 className={styles.status}>
                    {!nome ?
                        (<div className={styles.desconectado}>
                            Não há funcionário conectado ao sistema. FAÇA SEU LOGIN!
                        </div>) :
                        (<div className={styles.conectado}>
                            Conectado <span className={styles.span}>Nome:</span> {nome}  <span className={styles.span}>Matrícula:</span> {matricula}
                        </div>)
                    }
                </h5>
            </Container>
        </nav>    
    )
}

export default NavBar