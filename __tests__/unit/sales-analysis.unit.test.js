let SalesAnalysisBusiness = require('../../src/business/sales-analysis.business');
const moment = require('moment');

describe('Business Rules', () => {

    it('should return Max Price', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let itemList = [
            {"idItem":"1","quantityItem":"10","price":100},{"idItem":"2","quantityItem":"30","price":2.5},{"idItem":"3","quantityItem":"40","price":3.1},
            {"idItem":"1","quantityItem":"34","price":10},{"idItem":"2","quantityItem":"33","price":1.5},{"idItem":"3","quantityItem":"40","price":0.1}
        ];
        let response = analysis.getMaxPrice(itemList)
        expect(response).toBe(100);    
    });
    it('should return Min Price', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let itemList = [
            {"idItem":"1","quantityItem":"10","price":100},{"idItem":"2","quantityItem":"30","price":2.5},{"idItem":"3","quantityItem":"40","price":3.1},
            {"idItem":"1","quantityItem":"34","price":10},{"idItem":"2","quantityItem":"33","price":1.5},{"idItem":"3","quantityItem":"40","price":0.1}
        ];
        let response = analysis.getMinPrice(itemList)
        expect(response).toBe(0.1);    
    });
    it('should return total client list', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let clientList = [
            {'identify':'002', 'cnpj':'123456', 'name':'Maria Silva', 'businessArea':'TI'},
            {'identify':'002', 'cnpj':'098712', 'name':'Pedro Siqueira', 'businessArea':'Rural'},
            {'identify':'002', 'cnpj':'897654', 'name':'Gustavo Moreira', 'businessArea':'Adm'}
        ];
        let response =     analysis.getTotalClients(clientList);
        expect(response).toBe(3);    
    });
    it('should return total vendors list', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let vendorList = [
            {'identify':'001', 'cpf':'09876545432', 'name':'Marcelo Costa', 'salary':6000.189},
            {'identify':'001', 'cpf':'81209453109', 'name':'Priscila Nunes', 'salary':8000.08}
        ];
        let response = analysis.getTotalVendors(vendorList)
        expect(response).toBe(2);    
    });
    it('should return ID Sale more expensive', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let salesList = [
            {"identify":"003","saleId":"10","item":[{"idItem":"1","quantityItem":"10","price":100},{"idItem":"2","quantityItem":"30","price":2.5},{"idItem":"3","quantityItem":"40","price":3.1}],"salesName":"Pedro"},
            {"identify":"003","saleId":"08","item":[{"idItem":"1","quantityItem":"34","price":10},{"idItem":"2","quantityItem":"33","price":1.5},{"idItem":"3","quantityItem":"40","price":0.1}],"salesName":"Paulo"}
        ];
        let response = analysis.getIdExpensiveSale(salesList);
            response = parseInt(response);
        expect(response).toBe(10);    
    });
    it('should return Worst Seller', () => {
        let analysis   =  new SalesAnalysisBusiness();
        let salesList = [
            {"identify":"003","saleId":"10","item":[{"idItem":"1","quantityItem":"10","price":100},{"idItem":"2","quantityItem":"30","price":2.5},{"idItem":"3","quantityItem":"40","price":3.1}],"salesName":"Pedro"},
            {"identify":"003","saleId":"08","item":[{"idItem":"1","quantityItem":"34","price":10},{"idItem":"2","quantityItem":"33","price":1.5},{"idItem":"3","quantityItem":"40","price":0.1}],"salesName":"Paulo"}
        ];
        let response = analysis.getWorstSeller(salesList);
        expect(response).toBe('Paulo');    
    });

 });

