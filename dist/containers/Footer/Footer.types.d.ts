import { FooterProps as FooterComponentProps } from 'decentraland-ui';
export declare type FooterProps = FooterComponentProps & {
    hasTranslations?: boolean;
};
export declare type MapStateProps = Pick<FooterProps, 'locale' | 'hasTranslations'>;
export declare type MapDispatchProps = Pick<FooterProps, 'onChange'>;
