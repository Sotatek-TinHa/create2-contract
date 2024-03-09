import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { deployHelperFixturesForCreate2 } from "./helper";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

describe("Unit tests", function () {
  before(async function () {
    const [deployer]: SignerWithAddress[] = await ethers.getSigners();

    this.deployer = deployer;

    this.loadFixture = loadFixture;
  });

  describe("Blastronaut Nft", function () {
    beforeEach(async function () {
      const { create2Factory } = await this.loadFixture(deployHelperFixturesForCreate2);

      this.create2Factory = create2Factory;
    });

    it('Set baseUri', async function () {
      const bytecodeWalletDeployer = await this.create2Factory.getBytecode(this.deployer.address);

      const salt = 12;
      const predictedAddress = await this.create2Factory.getAddress(bytecodeWalletDeployer, salt);

      const deployOnPredictedAddress = await this.create2Factory.deploy(salt);
      const waitForDeployment = await deployOnPredictedAddress.wait()
      const addressAfterCreate2Deploymeny = (waitForDeployment as any).events[0].args[0]

      expect(addressAfterCreate2Deploymeny).to.be.equal(predictedAddress);

      const contractDeployWithCreate2 = await ethers.getContractAt("DeployWithCreate2", addressAfterCreate2Deploymeny);

      const owner = await contractDeployWithCreate2.owner()
      expect(owner).to.be.equal(this.deployer.address);
    })
  })
})