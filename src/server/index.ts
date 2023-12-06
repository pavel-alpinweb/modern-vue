import express, {Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jsonwebtoken from 'jsonwebtoken';
import {today, thisWeek, thisMonth, Post} from "../posts.ts";
import {NewUser, User} from "../users.ts";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get("/posts", (req, res) => {
    console.log(req);
    res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = {
        ...req.body,
        id: (Math.random() * 10000).toFixed(),
    };
    allPosts.push(post);
    res.json(post);
});

const SECRET = 'my-secret';
const COOKIE = 'vuejs-jsw';

function authenticate(id: string, {}, res: Response) {

    const token = jsonwebtoken.sign({id}, SECRET, {
        issuer: 'vuejs-course',
        expiresIn: '30 days',
    });
    res.cookie(COOKIE, token, {httpOnly: true});
}

app.get("/current-user", (req, res) => {
    try {
        const token = req.cookies[COOKIE];
        const result = jsonwebtoken.verify(token, SECRET) as { id: string };
        res.json({id: result.id});
    } catch (e) {
        res.status(404).end();
    }
});

app.post("/logout", ({}, res) => {
    res.cookie(COOKIE, "", {httpOnly: true});
    res.status(200).end();
});

app.post("/login", (req, res) => {
    const targetUser = allUsers.find(x => x.username === req.body.username);
    if (!targetUser || targetUser.password !== req.body.password) {
        res.status(401).end();
    } else {
        authenticate(targetUser.id, req, res);
        const {password, ...rest} = targetUser;
        res.json({...rest});
    }
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user: User = {
        ...req.body,
        id: (Math.random() * 10000).toFixed(),
    };
    allUsers.push(user);
    authenticate(user.id, req, res);
    const {password, ...rest} = user;
    res.json({...rest});
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
})