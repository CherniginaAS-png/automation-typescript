const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
            <body>
                <h2>Login Page</h2>
                <form method="POST" action="/login">
                    <input data-test="username" name="username" placeholder="Username"><br>
                    <input data-test="password" name="password" type="password" placeholder="Password"><br>
                    <button data-test="login-button" type="submit">Login</button>
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const user = params.get('username');
            const pass = params.get('password');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            if (user === 'standard_user' && pass === 'secret_sauce') {
                res.end('<h1 data-test="title">Products</h1>');
            } else if (user === 'locked_out_user') {
                res.end('<div data-test="error">Epic sadface: Sorry, this user has been locked out.</div>');
            } else if (!user) {
                res.end('<div data-test="error">Epic sadface: Username is required</div>');
            } else {
                res.end('<div data-test="error">Epic sadface: Username and password do not match any user in this service</div>');
            }
        });
    }
});

server.listen(3000, () => { console.log('Тестовый сервер запущен на http://localhost:3000'); });