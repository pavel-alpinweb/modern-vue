import express from 'express';
import cors from 'cors';
import {today, thisWeek, thisMonth} from "../posts.ts";

const app = express();
app.use(cors());

app.get("/posts", (req, res) => {
    console.log(req);
    res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
})