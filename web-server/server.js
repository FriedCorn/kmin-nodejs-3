const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send({
//         // path: req.originalUrl,
//         // params: req.params,
//         // query: req.query,
//         // cookies: req.cookies,
//         // headers: req.headers,
//     });
// })

const appName = 'Twitter'.bold().fontcolor('red').big().italics();

const naviBarPage = (path, barItems) => {
    let naviBar = '<ul>';
    barItems.forEach(barItem => {
        if (barItem.path == path)
            naviBar += `<li><h1><b>${barItem.name}</b></h1></li>`;
        else
            naviBar += `<li><h1><a href=${barItem.path}>${barItem.name}</a></h1></li>`;
    });
    naviBar += '</ul>';

    return naviBar;
}

const contentPage = (content) => {
    const contentPage = `<ul><ul><h2>${content}</h2></ul></ul>` + '<br></br>';
    return contentPage;
}

const barPageItems = [
    {
        path: '/home',
        name: 'Home'
    },
    {
        path: '/explore',
        name: 'Explore'
    },
    {
        path: '/messages',
        name: 'Messages'
    },
];

app.get('/', (req, res) => {
    res.send(appName + naviBarPage(req.path, barPageItems) + contentPage('This is Twitter'));
})

app.get('/home', (req, res) => {
    res.send(appName + naviBarPage(req.path, barPageItems) + contentPage('This is Home Page'));
})

app.get('/explore', (req, res) => {
    res.send(appName + naviBarPage(req.path, barPageItems) + contentPage('This is Explore Page'));
    
})

const barMessages = [
    {
        path: '/messages/001',
        name: 'message 1'
    },
    {
        path: '/messages/002',
        name: 'message 2'
    }
];

app.get('/messages', (req, res) => {
    res.send(appName + naviBarPage(req.path, barPageItems) + contentPage('This is Messages Page') + naviBarPage('/messages', barMessages));
})

app.get('/messages/:messageId', (req, res) => {
    res.send(appName + naviBarPage('/messages', barPageItems) + contentPage('This is Messages Page') + naviBarPage(req.path, barMessages) + contentPage(req.params.messageId));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})