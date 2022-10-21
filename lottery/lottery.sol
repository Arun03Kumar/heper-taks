// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        //msg is a global object available to every function and when someone calls this function ifferent preoperties can be accessed
        manager = msg.sender;
    }

    // payable is function type which requires some amount of ether to call 
    function enter() public payable {
        //require is a boolean condition to check if it is true remaining function will execute else function will terminate
        // if require consition is false function will terminate but it will not give what was the error so you need to be cautious
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    // function winner() public {
    //     // only manager chooses the winner not everyone
    //     require(msg.sender == manager);

    //     uint idx = random() % players.length;
    //     payable(players[idx]).transfer(address(this).balance);

    //     //after sending the amount to winner reseting the array so that it can be used again 
    //     players = new address[](0);
    // }

    function winner() public restricted {

        uint idx = random() % players.length;
        payable(players[idx]).transfer(address(this).balance);

        //after sending the amount to winner reseting the array so that it can be used again 
        players = new address[](0);
    }


    //this is a modifier function, on which functiono it it used _; this will be replace by that function content
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
