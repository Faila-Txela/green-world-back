 ## Aprendendo Nodejs com a Green World

# 🚀 Por que o Fastify é mais rápido?

Arquitetura Otimizada: Fastify usa um modelo assíncrono mais eficiente (baseado em V8 e HTTP/2), otimizando a serialização e deserialização de JSON.
Validação mais rápida: Utiliza o motor de validação de esquema ajv, que é extremamente rápido para validar dados em comparação com as abordagens tradicionais do Express.
Menos Overhead: Fastify foi projetado para ser leve, com menos código interno gerando carga.
Benchmark Oficial: Segundo testes do Fastify, ele é até 4 vezes mais rápido que o Express em algumas situações.

# 📌 Recomendação Final
Para o sistema da Green World, melhor usar o Fastify pelos seguintes motivos:

 - Performance: Mais rápido para lidar com as solicitações de geolocalização e imagens.
 - Escalabilidade: Pronto para crescer sem precisar refatorar no futuro.
 - Validação Eficiente: Garante a integridade dos dados (ex.: coordenadas corretas).

## Prisma

  O prisma é uma ferramenta muita dinâmica,facilitando e observando a existencia automática e rápida de erros. Permitindo a sua correção precisa.
   E após criarmos nossas tabelas no prisma,ele automaticamente já as cria também no nosso sistema de gestão de base de dados(MySql) no meu caso.

  Usa-se o model para os "create" do banco de dados.

  UUID =  gerador de identificadores únicos.

 
# PRISMA = {
    mpm i prisma -D = Instalação

    npx prisma init = inicia o Prisma no projecto

    npx prisma validate = serve para após terminado a modelagem do banco de dados, haja uma validação do formato do mesmo,para garantir que tudo está conforme e que pode passar para os próximos passos.

    npx prisma format = formatação do arquivo shema.prisma,de acordo com as regras de formatação do Prisma, para garantir legibilidade. Ele corrige identação,ajuda a evitar erros de sintaxe ao validar e alinhar a estrutura.

    npx prisma migrate dev --name ajustando_relacoes = Serve para fazer a actualização do banco de dados,sempre que adicionarmos alguma nova entidade nas nossas tabelas,ou qualquer outro acto que aconteça. Ele faz logo a actualização

# }


VARIÁVEIS DE AMBIENTES SÃO VARIÁVEIS FUNDAMENTAIS PARA O FUNCIONAMENTO DE UM SISTEMA;

Midllewares;

## Nodejs and his components

# O try...catch serve para capturar erros e evitar que o servidor quebre.

#   //Instanciando o Fastify (logger: true),simboliza que ele vai mostrar logs no console,facilitando a inspenção de erros.
const app: FastifyInstance = fastify({
    logger: true
})