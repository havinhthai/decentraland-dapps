import { ChainId } from '@dcl/schemas';
import { AnyTransaction } from './types';
export declare function getTransaction(address: string, chainId: ChainId, hash: string): Promise<AnyTransaction | null>;
