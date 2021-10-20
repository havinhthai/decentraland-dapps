import { ChainId } from '@dcl/schemas';
import { ContractName } from 'decentraland-transactions';
export declare enum AuthorizationType {
    ALLOWANCE = "allowance",
    APPROVAL = "approval"
}
export declare enum AuthorizationAction {
    GRANT = "grant",
    REVOKE = "revoke"
}
export declare type Authorization = {
    type: AuthorizationType;
    address: string;
    contractAddress: string;
    authorizedAddress: string;
    contractName: ContractName;
    chainId: ChainId;
};
