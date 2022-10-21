// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract SimpleStorage {
    uint256 favNum;
    struct People {
        uint256 favNum;
        string name;
    }
    People[] public people;
    mapping (string => uint) public nameToFavNum;

    function store(uint _favNum) public {
        favNum = _favNum;
    }

    function retrive() public view returns(uint256) {
        return favNum;
    }

    function addPerson(string memory _name, uint256 _favNum) public {
        people.push(People(_favNum ,_name));
        nameToFavNum[_name] = _favNum;
    }
}