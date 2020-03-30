const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

/**
 * TIPOS DE PARAMETROS
 * 
 * QUERY PARAMS: PARAMETROS NOMEDOS NA ROTA APOS O SIMBOLO DE INTERROGACAO, SERVEM PARA FILTROS, PAGINICAO
 * EX : LOCALHOST:3333/USERS?PAGE=2&IDADE=15&NOME=BRUNO
 * 
 * ROUTES PARAMS: UTILIZADOS PARA IDENTIFICAR RECURSOS
 * EX: LOCALHOST:3333/USERS/1 (CONSULTAR, DELETE BANCO DE DADOS)
 * BODY: CORPO DA REQUISICAO, UTILIZADO PARA CRIAR OU ALTERAR RECURSOS
 */

/**
 * BANCO DE DADOS SQL
 * 
 * DRIVER: SELECT * FROM USERS;
 * QUERY BUILDER: table('users').select('*').where('id' > 15)
 */

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = generateUniqueId();

        await connection('ongs').insert({ id, name, email, whatsapp, city, uf });
        return res.json({ id });
    }
}