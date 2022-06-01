import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY, PROPOSERS, EXECUTORS  } from "../hardhat-helper-config";

const deployTimelock: DeployFunction =async (
    hre:HardhatRuntimeEnvironment
    ) => {
        const { getNamedAccounts, deployments, network} = hre;
        const {deployer} = await getNamedAccounts();
        const {deploy, log} = deployments;

        log("Deploying timelock")
        
        const timelock = await deploy("TimeLock",{
            from: deployer,
            args: [MIN_DELAY, PROPOSERS, EXECUTORS],
            log: true,
        })
    };

    export default deployTimelock;
    deployTimelock.tags = ["all", "timelock"];