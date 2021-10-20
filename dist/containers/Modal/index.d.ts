import { Modal as ModalComponent } from 'decentraland-ui';
import BaseModal from './Modal.container';
declare type ExtendedModal = typeof BaseModal & {
    Actions: typeof ModalComponent.Actions;
    Content: typeof ModalComponent.Content;
    Description: typeof ModalComponent.Description;
    Header: typeof ModalComponent.Header;
};
declare const Modal: ExtendedModal;
export default Modal;
