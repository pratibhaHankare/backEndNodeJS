const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>First Message Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,err=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });

        });
    }
    
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><h1>My first node Js App page.</h1></body>');
    res.write('</html>');
    res.end();
};

//ways to send request
// 1
// module.exports = requestHandler;
// 2
// module.exports={
//     handler : requestHandler,
//     someText : "some text i am sending"
// }
// 3
exports.handler = requestHandler;
exports.someText = 'Some text to be send';

