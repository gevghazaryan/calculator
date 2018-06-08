const http = require('http');
const fs = require('fs')
const url = require('url')

http.createServer((req,res) => {
    const {method} = req;
    const myuri = url.parse(req.url);
    const uriQuery = myuri.query;
    console.log('uri query is',uriQuery)
    fs.readFile('id.txt','utf-8',(err,idInFile) => {
        let urlToSend = 'http://www.pathofexile.com/api/public-stash-tabs' + '?id=' + idInFile;
        http.get(urlToSend,(answer) => {
            let data = '';
            answer.on('data',(chunk) => {
                data += chunk
            });
            answer.on('end',() => {
                console.log('sending data to client');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type','application/json');
                let dataToSend = JSON.parse(data).stashes.map(stash => {

                    let items = stash.items.filter(item => {
                        return uriQuery in item.category
                    })
                    stash.items = items;
                    return stash
                })
                dataToSend = dataToSend.filter(item => item.items.length > 0)
                console.log('length',dataToSend.length)
                let newData = JSON.parse(data);
                newData.stashes = dataToSend;
                res.write(JSON.stringify(newData));
                res.end();
                fs.writeFile('id.txt',JSON.parse(data).next_change_id,(err) => {
                    if(err) console.log('error accured')
                    else console.log('latest id i got from server',JSON.parse(data).next_change_id)
                })
            })
        })
    })
}).listen(8000)