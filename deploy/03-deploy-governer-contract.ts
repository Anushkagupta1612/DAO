import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY, PROPOSERS, EXECUTORS, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE  } from "../hardhat-helper-config";

const deployGovernerContract: DeployFunction =async (
    hre:HardhatRuntimeEnvironment
    ) => {
        const { getNamedAccounts, deployments, network} = hre;
        const {deployer} = await getNamedAccounts();
        const {deploy, log, get} = deployments;

        const GovernanceToken = await get("GovernanceToken");
        const timelock = await get("TimeLock");
        const governorContract = await deploy("GovernorContract",{
            from: deployer,
            args: [GovernanceToken.address, 
                   timelock.address, 
                   VOTING_DELAY, 
                   VOTING_PERIOD,
                   QUORUM_PERCENTAGE
                ],
            log: true,
        });

        log("03- governer contract deployed")
};

export default deployGovernerContract;
deployGovernerContract.tags = ["all","governer"];
