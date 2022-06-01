import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGovernanceToken: DeployFunction =async (
    hre:HardhatRuntimeEnvironment
    ) => {
        const { getNamedAccounts, deployments, network} = hre;
        const {deployer} = await getNamedAccounts();
        const {deploy, log} = deployments;

        log("Deploying GovernanceToken...");
        const governanceToken = await deploy("GovernanceToken", {
            from: deployer,
            args: [],
            log: true
        });

        log(`01- Deployed 'Governancetoken' at ${governanceToken.address}`);
        await delegate(governanceToken.address, deployer);
        log("01-delegated!");
};

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governanceToken"];

const delegate = async (governanceTokenAddress:string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt(
        "GovernanceToken", 
        governanceTokenAddress
    );

    const txResponse = await governanceToken.delegate(delegatedAccount)
    await txResponse.wait(1);

    console.log(`checkpoint : ${await governanceToken.numCheckpoints(delegatedAccount)}`);
};