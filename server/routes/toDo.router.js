const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');

toDoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_Do" ORDER BY "task";';
    pool.query(queryText).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error in to_Do GET', error);
        res.sendStatus(500);
    });
} );

// // POST

toDoRouter.post('/', (req, res) => {
    const taskToPost = req.body;
    console.log(taskToPost)
    const queryText = 
    `INSERT INTO "to_Do" ("task", "complete")
     VALUES ($1, $2);`;
    pool.query(queryText, [taskToPost.task, taskToPost.complete])
        .then((results) => {
            console.log(results);
            res.send(results);
        }).catch((error)=>{
            console.log("error in to_do post", error );
            res.sendStatus(500);
        });
});

toDoRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log(req.body);
    const queryText = `UPDATE "to_Do" SET "complete" = 'Y'
                        WHERE "id" = $1`;
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in PUT /toDo', error);
            res.sendStatus(500);
        });
});

// DELETE
toDoRouter.delete('/:id', (req, res) => {
    const toDoId = req.params.id;
    const queryText = `DELETE FROM "to_Do"
                    WHERE "id" = $1`;
    pool.query(queryText, [toDoId])
    .then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in DELETE /toDo', error);
        res.sendStatus(500);
    });
});


module.exports = toDoRouter;