// We will be using Solidity version 0.5.3
pragma solidity 0.5.3;

import './SafeMath.sol';

contract AuctionBox{
    Auction[] public auctions; 
   
    function createAuction (
        string memory _title,
        uint _startPrice,
        uint _minIncrement,
        string memory _description
        ) public{
        require(_startPrice > 0);
        // set the new instanc
        Auction newAuction = new Auction(msg.sender, _title, _startPrice, _minIncrement,  _description);
        // push the auction address to auctions array
        auctions.push(newAuction);
    }
    
    function returnAllAuctions() public view returns(Auction[] memory){
        return auctions;
    }
}

contract Auction {
    
    using SafeMath for uint256;
    
    address payable private owner; 
    string project;
    uint startPrice;
    string description;
    uint minIncrement;

    enum State{Default, Running, Finalized}
    State public auctionState;

    uint public highestPrice;
    uint public highestBindingBid;
    address payable public highestBidder;
    mapping(address => uint) public bids;
    bool public canceled;
    bool ownerHasFinished;

    event LogPlaceBid(address bidder, uint bid, uint highestBid, uint highestBindingBid);
    event LogFinished(address finishPerson, address finishAccount, uint amount);
    
    /** @dev constructor to creat an auction
      * @param _owner who call createAuction() in AuctionBox contract
      * @param _project the title of the auction
      * @param _startPrice the start price of the auction
      * @param _description the description of the auction
      */
 
    constructor(
        address payable _owner,
        string memory _project,
        uint _startPrice,
        uint _minIncrement,
        string memory _description
        
        ) public {
        // initialize auction
        owner = _owner;
        project = _project;
        startPrice = _startPrice;
        minIncrement = _minIncrement;
        description = _description;
        auctionState = State.Running;
    }

    modifier notOwner(){
        require(msg.sender != owner);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier stillRunning(){
        require(auctionState == State.Running);
        _;
    }
    
    /** @dev Function to place a bid
      * @return true
      */
    
    function placeBid() public payable 
        notOwner 
        stillRunning
        returns(bool) 
    {
        require(msg.value > 0);
        // update the current bid
        // uint currentBid = bids[msg.sender] + msg.value;
        uint currentBid = bids[msg.sender].add(msg.value);
        require(currentBid > highestPrice.add(minIncrement));
        //find the previous highest bidder
        uint previousBid = bids[highestBidder];
        // set the currentBid links with msg.sender
        bids[msg.sender] = currentBid;

        
        if (msg.sender == highestBidder){
            highestPrice = currentBid;
        }
        else{
            highestPrice = currentBid;
            highestBindingBid = previousBid.add(minIncrement);
        }

        // update the highest bidder
        highestBidder = msg.sender;
        emit LogPlaceBid(msg.sender, currentBid, highestPrice, highestBindingBid);
        return true;
    }
    
    function min(uint x, uint y) private view returns (uint)
    {
        if (x < y){
            return x;
        } 
        else{
            return y; 
        }
        
    }

    function cancelAuction() public
        onlyOwner
        stillRunning
        returns (bool success)
    {
        canceled = true;
        return true;
    }


    function finalizeAuction() public{
        //the owner and bidders can finalize the auction.
        require(msg.sender == owner || bids[msg.sender] > 0);
        
        address payable recipiant;
        uint value;

        if (canceled) {
            recipiant = msg.sender;
            value = bids[recipiant];
        }
        else{
        // owner can get highestPrice
            if(msg.sender == owner){
                recipiant = owner;
                value = highestPrice;
                ownerHasFinished = true;
            }
            // highestBidder can get highest price - highest biding bid
            else if (msg.sender == highestBidder){
                recipiant = highestBidder;
                if (ownerHasFinished){
                    value = 0;
                }
                else{
                    value = bids[highestBidder].sub(highestBindingBid);
                }   
            }
            // Other bidders can get back the money 
            else {
                recipiant = msg.sender;
                value = bids[msg.sender];
            }    
        }
        
        // initialize the value
        bids[msg.sender] = 0;
        recipiant.transfer(value);
        auctionState = State.Finalized;

        emit LogFinished(msg.sender, recipiant, value);
    }
    
    /** @dev Function to return the contents of the auction
      * @return the title of the auction
      * @return the start price of the auction
      * @return the description of the auction
      * @return the state of the auction 
      */    
    
    function returnContents() public view returns(        
        string memory,
        uint,
        uint,
        string memory,
        State
        ) {
        return (
            project,
            startPrice,
            minIncrement,
            description,
            auctionState
        );
    }
    
}