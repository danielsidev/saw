class SalesAnalysisBusiness{
    constructor(){
        this.clientTotal = 0
        this.vendorTotal = 0;
        this.idSale = 0;
        this.salesName=null;
    }
    getTotalClients(dataClient){
        this.clientTotal = dataClient.length;
        return this.clientTotal;
    }
    getTotalVendors(dataVendor){
        this.vendorTotal = dataVendor.length;
        return this.vendorTotal;
    }
    getMaxPrice(data) {
        return data.reduce((max, p) => p.price > max ? p.price : max, data[0].price);
    }
    getMinPrice(data) {
        return data.reduce((min, p) => p.price < min ? p.price : min, data[0].price);
    }
    getIdExpensiveSale(dataSale){
        let biggerListPrice = [];
        dataSale.map((s) => {
            biggerListPrice.push({"saleId":s.saleId, "price":this.getMaxPrice(s.item)});
        });       
        let price = this.getMaxPrice(biggerListPrice);
            biggerListPrice.map((b)=>{
                if(b.price===price){
                    this.idSale = b.saleId;
                }
            });
            return this.idSale;
    }
    getWorstSeller(dataSale){
        let smallerListPrice = [];
        dataSale.map((s) => {
            smallerListPrice.push({"salesName":s.salesName, "price":this.getMinPrice(s.item)});
        });       
        let price = this.getMinPrice(smallerListPrice);
            smallerListPrice.map((b)=>{
                if(b.price===price){
                    this.salesName = b.salesName;
                }
            });
            return this.salesName;
    }
}
module.exports = SalesAnalysisBusiness;