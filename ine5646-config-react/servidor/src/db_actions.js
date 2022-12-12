const {MongoClient, ObjectId} = require('mongodb');

const DB_LOCAL = 'nuvem-database';
const DB_NAME = 'nuvem-database';
const MONGO_URL = `mongodb://localhost/27017/${DB_LOCAL}`;

var client = new MongoClient(MONGO_URL, {useUnifiedTopology : true});

async function _getDatabase() {
    return client.db(DB_NAME);
}

async function _setConstraints() {
    let db = await _getDatabase();

    await db.collection('users').dropIndexes();
    await db.collection('cards').dropIndexes();
    await db.collection('boards').dropIndexes();
    await db.collection('users_boards').dropIndexes();

    await db.collection('users').deleteMany({});
    await db.collection('cards').deleteMany({});
    await db.collection('boards').deleteMany({});
    await db.collection('users_boards').deleteMany({});

    await db.collection('users').createIndex(
        { 'username' : 1 },
        { 'unique' : true });
    await db.collection('users_boards').createIndex(
        { 'username' : 1, 'board_id' : 1 },
        { 'unique' : true, 'dropDups' : true});
}

_setConstraints();

// Insert and Update
// *****************************************
    export async function insertUser(user) {
        return (await _getDatabase()).collection('users').insertOne(user);
    }

    export async function updateUser(user) {
        return (await _getDatabase()).collection('users').updateOne({'username' : user.username}, user);
    }

    export async function insertBoard(board) {
        return (await _getDatabase()).collection('boards').insertOne(board);
    }

    export async function updateBoard(board) {
        board._id = ObjectId(board._id);
        return (await _getDatabase()).collection('boards').updateOne({'_id' : ObjectId(board._id)}, board);
    }

    export async function insertCard(card) {
        card.board_id = ObjectId(card.board_id);
        return (await _getDatabase()).collection('cards').insertOne(card);
    }

    export async function updateCard(card) {
        return (await _getDatabase()).collection('cards').updateOne({'_id' : ObjectId(card.card_id)}, card);
    }

    export async function insertUserBoard(user_board) {
        return (await _getDatabase()).collection('users_boards').insertOne(user_board);
    }
// *****************************************

// Find
// *****************************************
    export async function findAllUsers() {
        let users = await (await _getDatabase()).collection('users').find({}).toArray();
        let usernames = users.map(user => { return { 'name' : user.name, 'username' : user.username } });
        return usernames;
    }

    export async function findAllBoards() {
        let boards = await (await _getDatabase()).collection('boards').find({}).toArray();
        return boards;
    }

    export async function findAllCards() {
        let cards = await (await _getDatabase()).collection('cards').find({}).toArray();
        return cards;
    }

    export async function findAllUsersBoards() {
        let cards = await (await _getDatabase()).collection('users_boards').find({}).toArray();
        return cards;
    }

    export async function findUserByUsername(username) {
        return (await _getDatabase()).collection('users').findOne({'username' : username});
    }

    export async function findBoardsByUsername(username) {
        let db = (await _getDatabase());
        let users_boards_cursor = db.collection('users_boards').find({'username' : username});
        let users_boards_array = await users_boards_cursor.toArray();
        let boards_ids = users_boards_array.map(x => x.board_id);
        let boards = db.collection('boards').find({
            $or : [
                {'username' : username},
                {'_id' : { $in : boards_ids }}
            ]
        }).toArray();
        return boards;
    }

    export async function findCardsByBoardId(board_id) {
        return (await _getDatabase()).collection('cards').find({'board_id' : ObjectId(board_id)}).toArray();
    }
// *****************************************

// Delete
// *****************************************
    export async function deleteCard(card_id) {
        return (await _getDatabase()).collection('cards').deleteOne({'_id' : ObjectId(card_id)});
    }

    export async function deleteBoard(board_id) {
        console.log(board_id)
        let db = await _getDatabase();
        // Delete cards and users_boards
        await db.collection('cards').deleteMany({'board_id' : ObjectId(board_id)});
        await db.collection('users_boards').deleteMany({'board_id' : ObjectId(board_id)});
        // Delete board
        let res = await db.collection('boards').deleteOne({'_id' : ObjectId(board_id)});
        console.log(res);
        return res;
    }
// *****************************************
