import React from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './NavBarGestor.module.css'

function NavBarGestor () {

    return (
        <nav className={styles.navbar}>
            <Container customClass='columnNav'>
                <h1 className={styles.titulo}>Gestão de PonTTo</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/gestor/cadastrar">Cadastrar Funcionário</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/gestor/pesqf">Pesquisar Funcionário</Link>
                    </li>
                    <li className={styles.item}>
                    <Link to="/gestor/inserir">Inserir Registro</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/gestor/pesqr">Pesquisar Registro</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/gestor/relatorio">Gerar Relatório</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default NavBarGestor