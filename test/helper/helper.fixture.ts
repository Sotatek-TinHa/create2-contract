import { ethers } from 'hardhat'

export async function deployHelperFixturesForCreate2() {
  const Create2FactoryFactory = await ethers.getContractFactory("Create2Factory")
  const create2Factory = await Create2FactoryFactory.deploy();

  return { create2Factory };
}