Sistema para Registro de Ponto Eletrônico

- Banco de Dados: MongoDB Atlas

- API´s: PositionStack e EmailJS, além de API própria

- Sistema>

  - Ponto Eletrônico WEB (ReactJS)>

    - Login; CONCLUÍDO
    - Recuperação de senha (EmailJS); CONCLUÍDO
    - Registrar Ponto com data, hora, coordenadas geográficas, logradouro correspondente às coordenadas e foto (coordenadas ainda são enviadas para a API PositionStack, de forma a obter o logradouro); CONCLUÍDO
    - Apresentação dos registros dos últimos sete dias do funcionário logado; CONCLUÍDO
    - Geração de relatório/histórico de registros, para período selecionado, com totalização de horas de cada dia, de todo o período e média de horas trabalhadas por dia; CONCLUÍDO
    - Mostrar saldo de horás no relatório/histórico de registros; PENDENTE
    - Comunicação com o setor de RH (EmailJs); CONCLUÍDO
    - Redefinição de senha; CONCLUÍDO
    - Área do gestor, onde o mesmo poderá gerar relatórios/históricos de todos os funcionários e ainda realizar as funções CRUD tando para funcionário quanto para os registros; CONCLUÍDO

  - Ponto Eletrônico Mobile (ReactJS, React-native)>

    - Login; CONCLUÍDO
    - Recuperação de senha; CONCLUÍDO (via weblink)
    - Registrar Ponto com data, hora e coordenadas geográficas, logradouro correspondente às coordenadas e foto; CONCLUÍDO
    - Apresentação dos registros dos últimos sete dias do funcionário logado; CONCLUÍDO
    - Comunicação com o setor de RH; CONCLUÍDO
    - Redefinição de senha; CONCLUÍDO

  - API própria (nodeJS, Express, Nodemon, Mongoose)> possui, até agora, as seguintes rotas:
    - Rota para cadastrar funcionário; CONCLUÍDO
    - Rota para buscar todos os funcionários cadastrados; CONCLUÍDO
    - Rota para autenticação de login; CONCLUÍDO
    - Rota para recuperação de senha; CONCLUÍDO
    - Rota para definição de nova senha; CONCLUÍDO
    - Rota para registro de ponto; CONCLUÍDO
    - Rota para obter os registro dos últimos 7 dias, para determinado funcionário; CONCLUÍDO
    - Rota para obtenção dos dados de relatório/histórico, para período determinado; CONCLUÍDO
    - Rota para pesquisar funcionário por nome e matrícula; CONCLUÍDO
    - Rota para editar dados do funcionário; CONCLUÍDO
    - Rota para deletar funcionário; CONCLUÍDO
    - Rota para a redefinição de senha; CONCLUÍDO
    - Rota para pesquisar registro ponto por matrícula e data do registro; CONCLUÍDO
    - Rota para editar registro ponto; CONCLUÍDO
    - Rota para deletar registro ponto; CONCLUÍDO
