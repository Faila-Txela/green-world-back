import prisma from '../../modules/lib/prisma';

async function getUsersWithTipoUser() {
  const result = await prisma.$queryRaw`
    SELECT u.id AS user_id, u.nome AS user_name, u.email AS user_email, 
           t.id AS tipo_user_id, t.nome AS tipo_user_name
    FROM Users u
    INNER JOIN TipoUser t ON u.tipoUser_id = t.id;
  `;

  console.log(result);
}

getUsersWithTipoUser();
