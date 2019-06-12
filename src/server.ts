const app = require('./app');
const bootstrap = async () => {
    //Respond with a message to all client requests
    app.use(async ctx => {
        ctx.body = "Welcome to my Server!";
    });
    //Tell the app to listen on port 3000
    app.listen(3000);
};
bootstrap();
