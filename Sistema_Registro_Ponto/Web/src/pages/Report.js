import React, {useRef} from 'react'
import Pdf from "react-to-pdf"

import Container from '../layout/Container'
import styles from './Report.module.css'

function Report({ employee, array }) {

    const ref = useRef()
    let dadosRelatorio = array
    console.log(dadosRelatorio)

    return (
        <Container customClass='column'>
            <div ref={ref} className={styles.relatorio}>
                <div className={styles.cabecalho1}>
                    <h1>Sistema Registro PonTTo</h1>
                    <h3>Relatório de Registros PonTTo de Funcionário</h3>
                </div>
                <div>
                    <p>--------------------------------------------------------------------</p>
                    <h5>Funcionário: {employee.name}</h5>
                    <h5>Matricula: {employee.registration}</h5>
                    <h5>Período Relatado: {dadosRelatorio[0][0]} a {dadosRelatorio[dadosRelatorio.length - 3][0]}</h5>
                    <p>--------------------------------------------------------------------</p>
                </div>
                <div className={styles.tabela}>
                    <table>
                        <thead>
                            <tr>
                                <td>Dia</td>
                                <td>Entr. 1</td>
                                <td>Saída 1</td>
                                <td>Entr. 2</td>
                                <td>Saída 2</td>
                                <td>Entr. 3</td>
                                <td>Saída 3</td>
                                <td>Total</td>
                                <td>Saldo</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosRelatorio.length > 0 &&
                                dadosRelatorio.map((relatorio) => (
                                    <tr>
                                        <td>{relatorio[0]}</td>
                                        <td>{relatorio[2]}</td>
                                        <td>{relatorio[4]}</td>
                                        <td>{relatorio[6]}</td>
                                        <td>{relatorio[8]}</td>
                                        <td>{relatorio[10]}</td>
                                        <td>{relatorio[12]}</td>
                                        <td>{relatorio[14]}</td>
                                    </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Pdf targetRef={ref} filename="Relatorio_PonTTo.pdf">
                    {({toPdf}) =>
                        <button
                            style={{
                            background: '#f5c6cb',
                            padding: 10,
                            borderRadius: 4,
                            color: 'red',
                            fontWeight: 600,
                            }}
                            onClick={toPdf}>
                        Gerar PDF
                        </button>
                    }
            </Pdf>
        </Container>
    )
}

export default Report