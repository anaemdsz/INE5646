import fs from 'fs'
import path from 'path'
import https from 'https'
import { PORTA } from './env'

import express from 'express'

const db_actions = require('./db_actions.js')

// const opcoes = {
//   key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
//   cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'))
// }

const app = express()
app.use(express.static(path.resolve(__dirname, '../publico')))

app.use(express.json());

// Insert and Update
// *****************************************
    app.post('/insert_user', async (req, res) => {
        let result = await db_actions.insertUser(req.body.user);
        res.status(200).json({'result' : result});
    });

    app.post('/update_user', async (req, res) => {
        let result = await db_actions.updateUser(req.body.user);
        res.status(200).json({'result' : result});
    });

    app.post('/insert_board', async (req, res) => {
        let result = await db_actions.insertBoard(req.body.board);
        res.status(200).json({'result' : result});
    });

    app.post('/update_board', async (req, res) => {
        let result = await db_actions.updateBoard(req.body.board);
        res.status(200).json({'result' : result});
    });

    app.post('/insert_card', async (req, res) => {
        let result = await db_actions.insertCard(req.body.card);
        res.status(200).json({'result' : result});
    });

    app.post('/update_card', async (req, res) => {
        let result = await db_actions.updateCard(req.body.card);
        res.status(200).json({'result' : result});
    });

    app.post('/insert_user_board', async (req, res) => {
        let result = await db_actions.insertUserBoard(req.body.user_board);
        res.status(200).json({'result' : result});
    });
// *****************************************

// Find
// *****************************************
    app.get('/find_all_users', async (req, res) => {
        let users = await db_actions.findAllUsers();
        res.status(200).json({'result' : users});
    });

    app.get('/find_all_boards', async (req, res) => {
        let boards = await db_actions.findAllBoards();
        res.status(200).json({'result' : boards});
    });

    app.get('/find_all_cards', async (req, res) => {
        let cards = await db_actions.findAllCards();
        res.status(200).json({'result' : cards});
    });

    app.get('/find_all_users_boards', async (req, res) => {
        let users_boards = await db_actions.findAllUsersBoards();
        res.status(200).json({'result' : users_boards});
    });

    app.get('/find_user_by_username/:username', async (req, res) => {
        console.log(req.params.username);
        let user = await db_actions.findUserByUsername(req.params.username);
        res.status(200).json({'result' : user});
    });

    app.get('/find_boards_by_username/:username', async (req, res) => {
        console.log(req.params.username);
        let boards = await db_actions.findBoardsByUsername(req.params.username);
        console.log(boards);
        res.status(200).json({'result' : boards});
    });

    app.get('/find_cards_by_board_id/:board_id', async (req, res) => {
        let cards = await db_actions.findCardsByBoardId(req.params.board_id);
        res.status(200).json({'result' : cards});
    });
// *****************************************

// Delete
// *****************************************
    app.post('/delete_card', async (req, res) => {
        let result = await db_actions.deleteCard(req.body.card_id);
        res.status(200).json({'result' : result});
    });

    app.post('/delete_board', async (req, res) => {
        console.log(req.body.board_id);
        let result = await db_actions.deleteBoard(req.body.board_id);
        res.status(200).json({'result' : result});
    });
// *****************************************

// eslint-disable-next-line no-console
// const server = https.createServer(opcoes, app)
// server.listen(PORTA, () => console.log(`No ar, HTTPS porta ${PORTA}`))

app.listen(PORTA, () => console.log(`HTTP server listening on PORT=${PORTA}`))
