// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

//import {IComplianceBridge} from "./interfaces/IComplianceBridge.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract SWTRSimpleImpl is OwnableUpgradeable {
    uint public numContents;

    function initialize(address _initialOwner, uint _numContents) public initializer {
        __Ownable_init(_initialOwner);
        numContents =  _numContents;
    }

    function reduceContents( ) public {
        require(numContents > 0, "Contents are empty!");
        --numContents;
    }
}