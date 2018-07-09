pragma solidity ^0.4.17;


contract ERC20 {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract MossCoinTransfer{
      ERC20 public token = ERC20(0x738A6a902ff347fB8e28DEEf824a4754235f0b8B); // address of MossCoin contract
      address  rr_address = 0xCb06AbAb41E0CeF48a22bf962cAF9E825e41A113; // address of reality reflection

      function sendMossCoin(uint coins) public returns(bool){
        return token.transfer(rr_address, coins);
      }

      function getBalance() public returns(uint){
        return token.balanceOf(msg.sender);
      }

}