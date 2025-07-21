import { Server } from 'http';
import app from './app';
import config from './config';

let server: Server; 

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection',(err)=>{
    console.log(`UnhandledRejection is detected , shutting down ...`, err);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})


process.on('uncaughtException', () => {
  console.log(`UncaughtException is detected , shutting down ...`);
  process.exit(1);
});