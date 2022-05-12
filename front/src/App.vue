<template>
    <div class="container">
      <div class="row">
        <button v-show="!isConnected" @click="connect">Connect Ale to Start an Auction </button>
        <div style="color: #f00" v-show="isConnected">Already connected! You can Start an auction Now!</div>
      </div>
      <div class="row">
        <div>
          <h1>
            Auction
          </h1>
          <img id="img2"
            src="https://www.clementsauctions.com/wp-content/uploads/2017/11/auction.jpg"
          >
        </div>
          <hr>
          <div class="text1">
            <label for="title">
              Title:
            </label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="title"
            />
          </div>
          <div class="text1">
            <label for="startPrice">
              startPrice:
            </label>
            <input
              id="startPrice"
              v-model="startPrice"
              type="text"
              placeholder="start price ETH"
            />
          </div>
          <div class="text1">
            <label for="startPrice">
              minIncrement:
            </label>
            <input
              id="minIncrement"
              v-model="minIncrement"
              type="text"
              placeholder="min increment ETH"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div>
          <label for="Description">
            Description
          </label>
          <br>
          <textarea
            id="Description"
            v-model="description"
            rows="5"
          />
        </div>
      </div>
      <div class="row">
        <div>
          <button
            :variant="'primary'"
            @click="createAuction"
            id="Create"
          >
            {{ createStatus }}
          </button>
          <img
            v-show="isLoad"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
        </div>
      </div>
      <div>
        <hr>
        <button :variant="'primary'"
            @click="changeAccount" id="changeA">Change Account to Bid</button>
        <div v-show="accountInfo">Address: {{account}}   Your Current Bid:{{currentBid}}</div>
        <h1>{{ title }}</h1>
        <div>Start Price: {{startPrice}} ETH</div>
        <div>Higest Price: {{HigestPrice}}</div>
        <input id = "bidPrice" v-model ="bidPrice" type = "text" placeholder="bid Price"/>
        <button :variant="'primary'" @click="changeBid" id = "isBid">{{placeBid}}</button>
         <img
            v-show="isBid"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
        <div></div>
        <button :variant="'primary'" @click="endBid" id = "isFin">{{finalizeStatus}}</button>
        <img
            v-show="isFin"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
      </div>
      <button :variant="'primary'" @click="cancelAuction" id = "isCan">Cancel Auction</button>
        <img
            v-show="isCan"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
      <div v-show="isShow" id="result"> Highest Price: {{HigestPrice}}   Winner's Address: {{winner}}</div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import contract1 from './contract_auction';
import contract2 from './contract_auctionBox';
import services from "@/api";
import Contract1 from "./contract_auction";
// import { is } from '@babel/types';
// import store from './store';
// import store from './store'
// import Big from 'bignumber.js'

// import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return{
      account: '',
      isConnected: false,
      title: '',
      startPrice: '',
      minIncrement: '',
      description: '',
      amount: 0,
      auctionCard: [],
      auctionCardDev: [],
      isShow: false,
      isLoad: false,
      isBid: false,
      isFin: false,
      isCan: false,
      accountInfo: false,
      bidPrice: '',
      auctionAddress: '',
      bidders: 0,
      finalizeStatus: 'Finalize auctioin',
      createStatus: 'CREATE',
      isCanceled: false,
      provider: '',
      HigestPrice: 0,
      placeBid: 'place Bid',
      owner: '0x90FC25a3f1836d1a555C621eE0BA35D760eBd0a1',
      winner: '',
      currentBid:''
    }
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.account = val.account;
        this.isConnected = val.isConnected;
      },
      immediate: true,
      deep: true,
    },
  },
  beforeMount() {
    // get auctionBox method: returnAllAuctions()
    contract2.Instance2.methods
      .returnAllAuctions()
      .call()
      .then((auctions) => {
        console.log(auctions);
        console.log(this.account)
        // set the amount of auctions
        this.amount = auctions.length;
    })
  },
  methods: {
    connect() {
      window["aleereum"] && window["aleereum"].connect();
      this.which_account += 1;
    },
    createAuction(){
        this.isLoad = true;
        services.getAccount(this.title, this.startPrice, this.minIncrement, this.description).then(res => {
        console.log(res);
      }).then(() => {
        this.isLoad = false;
        this.title = '';
        this.startPrice = '';
        this.minIncrement = '';
        this.description = '';
        return contract2.Instance2.methods.returnAllAuctions().call({
          from: "0x90FC25a3f1836d1a555C621eE0BA35D760eBd0a1"
        });
        // get the previous auction
      }).then((auctions) => {
        // const index = auctions.length - 1;
        console.log(auctions);
      //   const overrides = {value: this.bidPrice}
      //   return Contract1.Instance1.methods.placeBid(overrides).call();
      //   // get the contract address of the previous auction
      //   // this.auctionAddress = auctions[index];
      //   // set the address as the parameter
      //   // const auctionInstance = auction(auctions[index]);
      //   // return auctionInstance.methods.returnContents().call();
      // }).then((result) => {
      //     console.log(result)
      });
    },
    changeBid(){
        Contract1.Instance1.methods.returnContents().call({
          from: "0x608c2F9a4bed8f7dFDFd7F955f461B547a01B0aB"
        }).then((res1) =>{
          console.log(res1)
          console.log(String(this.bidPrice))
          console.log(String(this.account))
          this.isBid = true
        }).then(() => {
          return Contract1.Instance1.methods.placeBid().sendBlock({
            from: this.account,
            password: '12345678',
            amount: this.bidPrice,
            gas_price: '20000000000',
            gas:'2000000',
          })
        }).then((res2) =>{
          console.log(res2)
          return Contract1.Instance1.methods.highestPrice().call({
          from: "0x608c2F9a4bed8f7dFDFd7F955f461B547a01B0aB"
          })
        }).then((res3) =>{
          this.HigestPrice = res3
          console.log(res3)
          this.isBid = false
        });
    },
    endBid(){
      Contract1.Instance1.methods.bids(this.account).call({
        from: this.account
      }).then((res4) =>{
        this.isFin = true;
        console.log('bid')
        console.log(res4)
        return Contract1.Instance1.methods.finalizeAuction().sendBlock({
          from: String(this.account),
          password: '12345678',
          amount: '0',
          gas_price: '20000000000',
          gas:'2000000',})
      }).then(() =>{
        return Contract1.Instance1.methods.highestBidder().call({
          from: String(this.account)
        })
      }).then((res6) =>{
        this.winner = res6;
        console.log("winner")
        console.log(res6)
        return Contract1.Instance1.methods.bids(res6).call({
          from: String(this.account)})
      })
      .then((res5) =>{
        this.HigestPrice = res5
        console.log('highest price')
        console.log(res5)
        this.finalizeStatus = "Finished";
        this.placeBid = "Finished";
        if (this.account == this.owner){
          this.isShow = true;
        }
        this.isFin = false
      })
    },
    changeAccount(){
      this.accountInfo = true;
      this.provider = window["aleereum"];
      window["aleereum"] && window["aleereum"].connect();
      console.log(this.provider.account);
      this.account = this.provider.account;
      Contract1.Instance1.methods.bids(this.account).call({
        from: this.account
      }).then((res) =>{
        this.currentBid = res;
      });
    },
    cancelAuction(){
      Contract1.Instance1.methods.cancelAuction().sendBlock({
          from: String(this.account),
          password: '12345678',
          amount: '0',
          gas_price: '20000000000',
          gas:'2000000'
      }).then((res) =>{
        console.log(res)
        return Contract1.Instance1.methods.canceled().call({from: String(this.account)})
      }).then((res2) =>{
        console.log('success')
        console.log(res2)
      })
    }
  }
  // computed: {
  //   ...mapGetters(["usingAle"]),
  // },
  // watch: {
  //   usingAle(val) {
  //     if (val) {
  //       this.listenDataChange();
  //     }
  //   },
  // },
  // methods: {
  //   handleNetworkChange(networkID) {
  //     this.$store.commit("M_SET_DAPP_NETWORK", networkID);
  //   },
  //   handleLockChange(status) {
  //     this.$store.commit("IS_ALE_ENABLED", !status);
  //   },
  //   handleConnectChange(status) {
  //     this.$store.commit("M_SET_DAPP_CONNECT", status);
  //   },
  //   handleAccountChange(account) {
  //     this.$store.commit("M_SET_DAPP_ACCOUNT", account);
  //   },
  //   listenDataChange() {
  //     window.aleereum.on("on_networkId_change", this.handleNetworkChange);
  //     window.aleereum.on("on_islocked_change", this.handleLockChange);
  //     window.aleereum.on("on_isConnected_change", this.handleConnectChange);
  //     window.aleereum.on("on_account_change", this.handleAccountChange);
  //   },
  // },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

body{
  background-color: beige;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: burlywood;
  color: white;
}

button:hover {
  background-color: white; /* Green */
  color: white;
  border: burlywood 3px solid;
}

img {
  width: 32px;
}

#img2{
  width: 100px;
}

#isBid, #isFin, #changeA, #Create, #isCan {
  height: 32px;
  margin-top: 16px;
  margin-left: 8px;
}

.text1{
  padding: 5px;
}

#result{
  background-color: gold;
  padding: 10px;
  font-size: 20px;
  font-weight: border; 
  margin-top: 8px;
}
</style>
