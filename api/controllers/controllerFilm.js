const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    async index (req, res) {
        const { id } = req.params;
        const query = 'SELECT f.id, f.nome movie_name, g.nome_genero genre, id_genero FROM filme f INNER JOIN genero g USING(id_genero) ORDER BY movie_name';
        const filteredQuery = 'SELECT f.id, f.nome movie_name, g.nome_genero genre, id_genero FROM filme f INNER JOIN genero g USING(id_genero) WHERE id = $1'

        try {
            if(id) {
                const { rows } = await pool.query(filteredQuery, [id]);
                res.status(200).json(rows);
                res.send();
            } else {
                const { rows } = await pool.query(query);
                res.status(200).json(rows);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async genres (req, res) {
        const query = 'SELECT id_genero, nome_genero FROM genero ORDER BY nome_genero';

        try {
            const { rows } = await pool.query(query);
            res.status(200).json(rows);
        } catch (error) {
            console.log(error);
        }
    },

    async create (req, res) {
        const { nome, genero } = req.body;
        const query = 'INSERT INTO filme (nome, id_genero) VALUES ($1, $2)';

        try {
            await pool.query(query, [nome, genero]);
            res.status(200).json({
                message: 'Success'
            });
        } catch (error) {
            console.log('Error: ' + error.detail);
            res.status(400).json({
                message: 'Failed'
            })
        } finally {
            res.send();
        }
    },

    async update (req, res) {
        try {
            const { id } = req.params;
            const { nome, genero } = req.body;
            const query =  'UPDATE filme SET nome = $1, id_genero = $2 WHERE id = $3'
            await pool.query(query, [nome, genero, id]);
            res.status(200).json({
                message: 'Success'
            });
            res.send();
        } catch (error) {
            console.log(error);
        }
    },

    async delete (req, res) {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM filme WHERE id = $1', [id]);
            res.status(200).json({
            message: 'Success'
            });
        } catch (error) {
            console.log(error);
            res.status(400);
        } finally {
            res.send()
        }
    }

}