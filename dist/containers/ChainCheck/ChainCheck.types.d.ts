/// <reference types="react" />
import { ChainId } from '@dcl/schemas';
export declare type Props = {
    chainId: ChainId;
    children: (enabled: boolean) => React.ReactNode;
};
