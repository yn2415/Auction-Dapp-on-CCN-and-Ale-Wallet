import contract1 from '../contract_auction';
import contract2 from '../contract_auctionBox';

// import store from '../store'

// import Big from 'bignumber.js'

export default {
    async getBid() {
        // return await contract.Instance.methods.name().call();
        return await contract1.Instance1.methods.placeBid().call();
    },
    async getSymbol() {
        return contract2.Instance2.methods.returnAllAuctions().call();
    },
    async getAccount(t, s, m, d){
        return await contract2.Instance2.methods.createAuction(t, s, m, d)
        .sendBlock({
            from: '0x90FC25a3f1836d1a555C621eE0BA35D760eBd0a1',
            password: '12345678',
            amount: '0',
            gas_price: '20000000000',
            gas:'2000000',
        })
    }
    // async approve(limit) {
    //     const approveAmount = new Big(limit).times('1e18').toString();
    //     const response = await contract.Instance.methods.approve(contract.coreAddress, approveAmount).sendToBlock({
    //         from: store.state.dapp.account,
    //         amount: new Big('0').toString()
    //     });

    //     if (response.success) {
    //         console.log('transaction success: ', response);
    //     } else {
    //         console.log('transaction failed: ', response);
    //     }

    //     return response;
    // }
}