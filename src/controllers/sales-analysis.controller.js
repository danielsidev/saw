let SalesAnalysisDao = require('../models/dao/sales-analysis.dao');
let SalesAnalysisBusiness = require('../business/sales-analysis.business');
const fs = require('fs');
class SalesAnalysisController{
    constructor(){
        this.analsysisDao = new SalesAnalysisDao();
        this.analsysisBusinnes = new SalesAnalysisBusiness();
    }
    async mountDataObject(data){
        return new Promise((resolve, reject)=>{
            try {
                let lines = data.split('\n');
                let structureData = {'clients':[], 'sales':[], 'vendor':[]};
                lines.map((l)=>{
                    let columns = l.split('ç');
                    switch (columns[0]) {
                        case '001':
                            let vendor = {'identify':null, 'cpf':null, 'name':null, 'salary':null};
                            vendor.identify = columns[0];
                            vendor.cpf = columns[1];
                            vendor.name = columns[2];
                            vendor.salary = columns[3];
                            structureData.vendor.push(vendor);
                            break;
                        case '002':
                            let client = {'identify':null, 'cnpj':null, 'name':null, 'businessArea':null};
                            client.identify = columns[0];
                            client.cnpj = columns[1];
                            client.name = columns[2];
                            client.businessArea = columns[3];
                            structureData.clients.push(client);            
                            break;
                        case '003':      
                            let sales = {'identify':null, 'saleId':null,'item':[], 'salesName':null};                                        
                            sales.identify = columns[0];
                            sales.saleId   = columns[1];
                                columns[2] = (columns[2].includes("["))?columns[2].replace("[",""):columns[2];
                                columns[2] = (columns[2].includes("]"))?columns[2].replace("]",""):columns[2];
                                let items = columns[2].split(',');
                                items.map((i)=>{
                                    let saleItem = {'idItem':0, 'quantityItem':0, 'price':0.0};  
                                    let ite = i.split('-');
                                    saleItem.idItem = ite[0];
                                    saleItem.quantityItem = ite[1];
                                    saleItem.price = parseFloat(ite[2]);
                                    sales.item.push(saleItem);
                                });                         
                            sales.salesName = columns[3];
                            structureData.sales.push(sales);                        
                            break;                        
                    }
                    resolve(structureData);
                });    
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
    getTimeStamp(){
        let date = new Date();
        let timestamp = date.getTime();
        return timestamp;
    }
    run(){
        if(this.analsysisDao.checkPath()){
            
            this.analsysisDao.watchNewFiles(this.analsysisDao.inPath, async (filename)=>{
                let fullPath = `${this.analsysisDao.inPath}/${filename}`
                if(fs.existsSync(fullPath)){
                    console.log(`Watching directory: ${filename} added!`)
                    let data    = await this.analsysisDao.recoveryFile(filename);
                    let fileOut = `${filename}-report-${this.getTimeStamp()}`;
                    
                    try {
                        let objFile = await this.mountDataObject(data);
                        console.log(JSON.stringify(objFile.sales));
                        let clientTotal     = this.analsysisBusinnes.getTotalClients(objFile.clients);
                        let vendorTotal     = this.analsysisBusinnes.getTotalClients(objFile.vendor);
                        let idSaleExpensive = this.analsysisBusinnes.getIdExpensiveSale(objFile.sales);
                        let worstSeller     = this.analsysisBusinnes.getWorstSeller(objFile.sales);
                        let result='';
                            result+=`clientTotal:${clientTotal}\n`; 
                            result+=`vendorTotal:${vendorTotal}\n`
                            result+=`idSaleExpensive:${idSaleExpensive}\n`;
                            result+=`worstSeller:${worstSeller}`;
                        await this.analsysisDao.constructFile(fileOut, result);
                    } catch (error) {
                        console.log(error);
                    }              
                }else{
                    console.log(`Watching directory: ${filename} removed!`)
                }
            });
        }else{
            console.log(`Sorry! The path doesn't exist. I can't import and export data!`);
        }
    }
}
module.exports = SalesAnalysisController;