import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingContract from "../contracts/VotingContract.json";

export function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [results, setResults] = useState(false);
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var contract = null;
  const address = localStorage.getItem("address");

  useEffect(() => {
    checkAccess();
  });
  const checkAccess = async (event) => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];

      contract = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      const isAlreadyVoted = await contract.methods.isAdmin(address).call({
        from: address,
        gas: "1000000",
      });
      setIsAdmin(isAlreadyVoted);
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };

  const showResults = async (event) => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];

      contract = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const results = await contract.methods.getResults().call({
        from: address,
        gas: "1000000",
      });
      setResults(results);
    } catch (error) {
      console.error("Error retrieving data:", error.message);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h1>Admin Page</h1>
          <button onClick={showResults}>Show Results</button>
          {results && (
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Vote Count</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{results[0][0]}</td>
                    <td>{results[0][1].toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <h1>You are not an admin</h1>
          <p>Access denied.</p>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
