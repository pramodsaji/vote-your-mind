// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteContract {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address[] public eligibleVoters = [address(0x02a3dB748d0d20A2efcadd28Eb8E0fEf395A88b4), address(0xeD80F90fb50A800eA9fE7D02DE10aBE9a8d82B2B), address(0xF8E625b41aAd91e746E152133B47A45FCb3Abc8C), address(0x968176f77fF2D9C9AfFa26219016Dc01B085dB3A)];
    address[] public votedUsers;
    address public admin = address(0xf70c0B4CeaBAfCDbef68F853F19bC6E125D063eA);

    constructor() {
        candidates.push(Candidate("Yes", 0));
        candidates.push(Candidate("No", 0));
    }

    function vote(uint256 _candidateIndex) public {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        require(checkEligibility(msg.sender), "Not eligible to vote");
        require(!hasAddressVoted(msg.sender), "Already voted");
        candidates[_candidateIndex].voteCount++;
        votedUsers.push(msg.sender);
    }

    function checkEligibility(address _voterAddress) public view returns (bool) {
        for (uint256 i = 0; i < eligibleVoters.length; i++) {
        if (eligibleVoters[i] == _voterAddress) {
            return true;
        }
    }
    return false;
    }

    function hasAddressVoted(address userAddress) public view returns (bool) {
        for (uint256 i = 0; i < votedUsers.length; i++) {
            if (votedUsers[i] == userAddress) {
                return true;
            }
        }
        return false;
    }
    
    function getResults() public view returns (Candidate[] memory) {
        require(isAdmin(msg.sender), "Unauthorized access");
        return candidates;
    }

    function getVotedAddresses() public view returns (address[] memory) {
        return votedUsers;
    }

    function isAdmin(address _userAddress) public view returns (bool) {
        return _userAddress == admin;
    }
}