import { Dispatch } from 'redux'
import { ChainId } from '@dcl/schemas'
import { NavbarProps as NavbarComponentProps } from '@wiicamp/decentraland-ui'
<<<<<<< HEAD
import {
  acceptNetworkPartialSupport,
  AcceptNetworkPartialSupportAction,
  disconnectWallet,
  switchNetworkRequest,
  SwitchNetworkRequestAction
} from '../../modules/wallet/actions'
=======

export type WrongNetworkModalI18N = {
  wrongNetwork: {
    header: React.ReactNode
    message: React.ReactNode
  }
}
>>>>>>> 8c9beea (fix: Update LOM pacakges (done))

export type NavbarProps = NavbarComponentProps & {
  chainId?: ChainId
  hasTranslations?: boolean
  onSwitchNetwork: typeof switchNetworkRequest
  onSignOut: typeof disconnectWallet
  hasAcceptedNetworkPartialSupport: boolean
  onAcceptNetworkPartialSupport: typeof acceptNetworkPartialSupport
}

export type MapStateProps = Pick<
  NavbarProps,
  | 'mana'
  | 'address'
  | 'isConnected'
  | 'isConnecting'
  | 'hasTranslations'
  | 'chainId'
  | 'hasAcceptedNetworkPartialSupport'
>

export type MapDispatchProps = Pick<
  NavbarProps,
  'onSwitchNetwork' | 'onSignOut' | 'onAcceptNetworkPartialSupport'
>
export type MapDispatch = Dispatch<
  SwitchNetworkRequestAction | AcceptNetworkPartialSupportAction
>
