import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Web3 from "web3";
import VotingContract from "../contracts/VotingContract.json";
import Button from "@mui/material/Button";

export function Vote() {
  const [selectedValue, setSelectedValue] = useState("");
  const [showVoting, setShowVoting] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);

  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var contract = null;

  const address = localStorage.getItem("address");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleVote = async (event) => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];

      contract = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const result = await contract.methods.vote(selectedValue).send({
        from: address,
        gas: "1000000",
      });
      if (result) {
      }
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };

  const checkEligibility = async (event) => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];

      contract = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const isEligible = await contract.methods.checkEligibility(address).call({
        from: address,
        gas: "1000000",
      });
      const isAlreadyVoted = await contract.methods
        .hasAddressVoted(address)
        .call({
          from: address,
          gas: "1000000",
        });
      if (isEligible && !isAlreadyVoted) setShowVoting(true);
      setIsAlreadyVoted(isAlreadyVoted);
      setIsEligible(isEligible);
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };
  // UseEffect hook to get all movies
  useEffect(() => {
    checkEligibility();
  }, []);

  return (
    <div>
      <center>
        {showVoting && (
          <div>
            <h2>Do you believe blockchain is going to disrupt?</h2>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="vote"
                name="vote"
                value={selectedValue}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Yes" />
                <FormControlLabel value="1" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <br />
            <Button type="submit" variant="contained" onClick={handleVote}>
              Vote
            </Button>
          </div>
        )}
        {isAlreadyVoted && (
          <div>
            <h3>Your vote is already casted</h3>
          </div>
        )}
        {!isEligible && (
          <div>
            <h3>Sorry, You are not eligible for voting</h3>
          </div>
        )}
      </center>
    </div>
  );
}

export default Vote;
