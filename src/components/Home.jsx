import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask accounts
        await window.ethereum.enable();

        // Create a new Web3 instance using MetaMask's provider
        const web3Instance = new Web3(window.ethereum);

        setWeb3(web3Instance);
      } catch (error) {
        console.error("Error while connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected.");
    }
  };

  // Vote
  const openVoting = () => {
    navigate("/vote", {});
  };

  useEffect(() => {
    const checkAccount = async () => {
      if (web3) {
        // Retrieve the currently selected address from MetaMask
        const accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          localStorage.setItem("address", accounts[0]);
          openVoting();
        }
      }
    };

    checkAccount();
  }, [web3]);

  return (
    <div id="home-page-button">
      <center>
        <Button type="submit" variant="contained" onClick={() => loadWeb3()}>
          Authenticate
        </Button>
      </center>
    </div>
  );
}
