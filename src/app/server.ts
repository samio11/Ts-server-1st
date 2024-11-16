import { Server } from 'http';
import app from './app';
const PORT = 5000;
let server : Server;
async function bootstap(){
    server = app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}
bootstap();