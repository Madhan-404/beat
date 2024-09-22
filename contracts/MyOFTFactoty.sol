// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./CurveBondedToken.sol";

contract MyOFT is CurveBondedToken {
fallback ()  external payable  { mint(); }
event Mint(address indexed buyer, uint256 amount, uint256 timestamp);
event Burn(address indexed seller, uint256 amount, uint256 timestamp);
    constructor(
        string memory name,
        string memory symbol,
        address lzEndpoint,
        address delegate,
        uint256 _reserveRatio
    ) CurveBondedToken(name, symbol, lzEndpoint, delegate, _reserveRatio) {
    }
    function mint() public payable {
        require(msg.value > 0, "Must send ether to buy tokens.");
        _curvedMint(msg.value);
        emit Mint(msg.sender, msg.value,block.timestamp);
    }

    function burn(uint256 _amount) public {
        uint256 returnAmount = _curvedBurn(_amount);
        payable(msg.sender).transfer(returnAmount);
        emit Burn(msg.sender, _amount,block.timestamp);
    }
}

contract MyOFTFactory {

    event Deploy(address addr, string name, string symbol,string imageURI,address owner);

    function deploy(
        string memory name,
        string memory symbol,
        address lzEndpoint,
        address delegate,
        uint256 reserveRatio,
        uint256 salt,
        string calldata imageURI
    ) external  returns (address) {
        bytes memory bytecode = _getBytecode(name, symbol, lzEndpoint, delegate, reserveRatio);
        address addr = Create2.deploy(0, bytes32(salt), bytecode);
        emit Deploy(addr, name, symbol,imageURI,delegate);
        return addr;
    }
    function _getBytecode(
        string memory name,
        string memory symbol,
        address lzEndpoint,
        address delegate,
         uint256 reserveRatio
    ) internal pure returns (bytes memory) {
        bytes memory bytecode = type(MyOFT).creationCode;
        return abi.encodePacked(bytecode, abi.encode(name, symbol, lzEndpoint, delegate, reserveRatio));
    }
}