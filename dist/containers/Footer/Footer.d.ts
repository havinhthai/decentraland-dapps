import * as React from 'react';
import { FooterI18N } from 'decentraland-ui';
import { FooterProps } from './Footer.types';
export default class Footer extends React.PureComponent<FooterProps> {
    getTranslations: () => FooterI18N | undefined;
    handleChange: FooterProps['onChange'];
    render(): JSX.Element;
}
