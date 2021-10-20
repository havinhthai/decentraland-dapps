import React from 'react';
import { ChainId } from '@dcl/schemas';
export declare type DefaultProps = {
    className: string;
    target: string;
    text: string;
};
export declare type Props = Partial<DefaultProps> & {
    address: string;
    txHash: string;
    chainId?: ChainId;
    children: React.ReactNode;
};
export declare type MapStateProps = Pick<Props, 'chainId'>;
export declare type MapDispatchProps = {};
export declare type OwnProps = Pick<Props, 'chainId'>;
