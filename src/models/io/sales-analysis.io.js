const fs = require('fs');
class SalesAnalysisIo {
    constructor(){
        this.homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
        this.dataPath = `${this.homePath}/data`;
        this.inPath   = `${this.dataPath}/in`;
        this.outPath  = `${this.dataPath}/out`;
    }
    createPath(path){
        fs.mkdirSync(path);
     }
    checkPath(){ 
        let existPath = false;       
        try {
            if (!fs.existsSync(this.dataPath)){
                this.createPath(this.dataPath);
                this.createPath(this.inPath);
                this.createPath(this.outPath);
            }else{
                if (!fs.existsSync(this.inPath))
                    this.createPath(this.inPath);    
                if (!fs.existsSync(this.outPath))    
                    this.createPath(this.outPath);
            }
            existPath = true;
        } catch (error) {
            console.log(`ERROR:: ${error}`);
            existPath = false;                
        }
        return existPath;
    }
   async  watchNewFiles(path, callback){
            fs.watch(path, (eventType, filename) => {                
                callback(filename);    
            });
    }
    async recoveryFile(filename){
        let path = `${this.inPath}/${filename}`;
        return new Promise((resolve, reject)=>{
            fs.readFile(path, 'utf8', function(err, contents) {
                if(err) reject(err);                
                resolve(contents);
            });
        });
    }
    async constructFile(filename, content){
        let path = `${this.outPath}/${filename}`;
        return new Promise((resolve, reject)=>{
            fs.writeFile(path, content, function (err) {
                if (err) reject(err);
                resolve(content);
              });
        });

    }
}
module.exports = SalesAnalysisIo;