// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@layerzerolabs/oft-evm/contracts/OFT.sol";

import "./interface/IBondingCurve.sol";
import "./BancorFormula.sol";

contract CurveBondedToken is IBondingCurve, BancorFormula, Ownable, OFT {
    using Math for uint256;

    // Use the same decimal places as ether.
    uint256 public scale = 10**18;
    uint256 public poolBalance = 1*scale;
    uint256 public reserveRatio;

    constructor(
        string memory name_,
        string memory symbol_,
         address lzEndpoint,
        address delegate,
        uint256 _reserveRatio
    ) OFT(name_, symbol_, lzEndpoint, delegate) Ownable(delegate) {
        reserveRatio = _reserveRatio;
        _mint(delegate, 1*scale);
    }

    function calculateCurvedMintReturn(uint256 _amount)
        public returns (uint256 mintAmount)
    {
        return calculatePurchaseReturn(totalSupply(), poolBalance, uint32(reserveRatio), _amount);
    }

    function calculateCurvedBurnReturn(uint256 _amount)
        public returns (uint256 burnAmount)
    {
        return calculateSaleReturn(totalSupply(), poolBalance, uint32(reserveRatio), _amount);
    }

    function _curvedMint(uint256 _deposit)
        internal returns (uint256)
    {
        uint256 amount = calculateCurvedMintReturn(_deposit);
        _mint(msg.sender, amount);
        poolBalance = poolBalance + _deposit;
        return amount;
    }

    function _curvedBurn(uint256 _amount)
        internal returns (uint256)
    {
        uint256 reimbursement = calculateCurvedBurnReturn(_amount);
        poolBalance = poolBalance - reimbursement;
        _burn(msg.sender, _amount);

        return reimbursement;
    }
}