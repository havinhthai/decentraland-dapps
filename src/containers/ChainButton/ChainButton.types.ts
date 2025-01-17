import { ButtonProps } from '@wiicamp/decentraland-ui'
import { ChainId } from '@dcl/schemas'

export type Props = ButtonProps & {
  chainId: ChainId
}
