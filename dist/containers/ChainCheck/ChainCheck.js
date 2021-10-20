"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const decentraland_ui_1 = require("decentraland-ui");
const utils_1 = require("../../modules/translation/utils");
const eth_1 = require("../../lib/eth");
const schemas_1 = require("@dcl/schemas");
const ChainProvider_1 = __importDefault(require("../ChainProvider"));
class ChainCheck extends react_1.default.PureComponent {
    render() {
        const { chainId, children } = this.props;
        return (react_1.default.createElement(ChainProvider_1.default, null, data => {
            const isEnabled = data.isSupported || data.chainId === chainId;
            return (react_1.default.createElement(decentraland_ui_1.Popup, { disabled: isEnabled, position: "top center", content: react_1.default.createElement(utils_1.T, { id: "@dapps.button.network_not_supported", values: {
                        expectedChainName: (react_1.default.createElement("b", null, schemas_1.getChainName(eth_1.getConnectedProviderChainId())))
                    } }), trigger: children(isEnabled) }));
        }));
    }
}
exports.default = ChainCheck;
//# sourceMappingURL=ChainCheck.js.map