import { Create2Factory } from '../../types';

type Fixture<T> = () => Promise<T>;
declare module "mocha" {
  export interface Context {
    create2Factory: Create2Factory;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
  }
}