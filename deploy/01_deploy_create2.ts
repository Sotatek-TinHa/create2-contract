import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const create2FactoryContract = await deploy("Create2Factory", {
    from: deployer,
    args: [],
  });

  console.log(`contract create2FactoryContract: `, create2FactoryContract.address);
};

func.id = "create2FactoryContract";
func.tags = ["Create2FactoryContract"];

export default func;
