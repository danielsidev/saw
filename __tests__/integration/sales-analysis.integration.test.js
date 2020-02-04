let SalesAnalysisIo = require('../../src/models/io/sales-analysis.io');
const fs = require('fs');
describe('IO Access', () => {

    it('should to can create directory', () => {
        let analysis   =  new SalesAnalysisIo();
        let path = `${analysis.homePath}/testio`;
            analysis.createPath(path);
        let response = (fs.existsSync(path))?true:false;    
            fs.rmdirSync(path);
        expect(response).toBe(true);    
    });
    it('should find a directory $USER/data/in and $USER/data/out', () => {
        let analysis   =  new SalesAnalysisIo();
        let response = analysis.checkPath();
        expect(response).toBe(true);    
    });
    it('should read a file in the  directory $USER/data/in', async () => {
        let analysis   =  new SalesAnalysisIo();
        let dir = analysis.inPath;
        let content = `content test file in`;
        let path = `${dir}/testFile`
        if(!fs.existsSync(dir)) analysis.createPath(dir); 
        fs.writeFileSync(path, content, async function (err) {
            if (err){ throw err}
            let response = await analysis.recoveryFile();
            expect(response).toContain(content);      
          });
    });
    it('should write a file in the  directory $USER/data/out', async () => {
        let analysis   =  new SalesAnalysisIo();
        let dir =analysis.outPath;
        let content = `content test file out`;
        let filename = `testFile`
        if(!fs.existsSync(dir)) analysis.createPath(dir); 
        let response = await analysis.constructFile(filename,content);
          expect(response).toContain(content);      
    });
    
});

