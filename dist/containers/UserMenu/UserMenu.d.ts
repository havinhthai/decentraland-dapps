import * as React from 'react';
import { UserMenuI18N } from 'decentraland-ui';
import { Props } from './UserMenu.types';
export default class UserMenu extends React.Component<Props> {
    getTranslations: () => UserMenuI18N | undefined;
    render(): JSX.Element;
}
