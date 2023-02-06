import { ChainId } from "@thirdweb-dev/sdk";

/**
 * TODO: Replace these values with your contract addresses and ABI.
 * 1. NETWORK_ID: This is the network ID of the network your smart contracts are deployed to.
 * 2. MARKETPLACE_ADDRESS: This is the address of the marketplace smart contract.
 * 3. NFT_COLLECTION_ADDRESS: This is the address of your NFT collection smart contract.
 * 4. NFT_COLLECTION_ABI: This is the ABI of your NFT collection smart contract.
 *  You can copy your ABI from the "Sources" tab on the thirdweb dashboard.
 *  Or from the "contract" tab on EtherScan.
 */

// 0. Set up the root URL of where users can view transactions on
// For example, below, we use Mumbai scan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://etherscan.io/address/0x5526fb9e98A64F7C95971a2f0580D8cdF172A95a";

// 1. Set up the network ID of the network your smart contracts are deployed to.
export const NETWORK_ID = ChainId.Mainnet;

// 2. The address of the marketplace smart contract.
export const MARKETPLACE_ADDRESS = "0x5526fb9e98A64F7C95971a2f0580D8cdF172A95a";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0xC5BFc92057bBD051c1701faECeCb7A8C69b78913";

// 4. The ABI of your NFT collection smart contract.
export const NFT_COLLECTION_ABI = [
  {
    "type": "error",
    "name": "CANNOT_APPROVE_SELF",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "CANT_BE_SMALLER_THAN_SUPPLY",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "CANT_EXTEND_NON_EXPIRING_KEY",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "GAS_REFUND_FAILED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INSUFFICIENT_ERC20_VALUE",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INSUFFICIENT_VALUE",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INVALID_ADDRESS",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INVALID_HOOK",
    "inputs": [
      {
        "type": "uint8",
        "name": "hookIndex",
        "internalType": "uint8"
      }
    ],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INVALID_LENGTH",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "INVALID_TOKEN",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "KEY_NOT_VALID",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "KEY_TRANSFERS_DISABLED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "LOCK_HAS_CHANGED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "LOCK_SOLD_OUT",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "MAX_KEYS_REACHED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "MIGRATION_REQUIRED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NON_COMPLIANT_ERC721_RECEIVER",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NON_RENEWABLE_LOCK",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NOT_ENOUGH_FUNDS",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NOT_ENOUGH_TIME",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NOT_READY_FOR_RENEWAL",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NO_SUCH_KEY",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "NULL_VALUE",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "ONLY_KEY_MANAGER_OR_APPROVED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "ONLY_LOCK_MANAGER",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "ONLY_LOCK_MANAGER_OR_KEY_GRANTER",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "OUT_OF_RANGE",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "OWNER_CANT_BE_ADDRESS_ZERO",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "SCHEMA_VERSION_NOT_CORRECT",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "TRANSFER_TO_SELF",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "UNAUTHORIZED",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "error",
    "name": "UNAUTHORIZED_KEY_MANAGER_UPDATE",
    "inputs": [],
    "outputs": []
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "approved",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ApprovalForAll",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "operator",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "bool",
        "name": "approved",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CancelKey",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "sendTo",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "refund",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ExpirationChanged",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "newExpiration",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "bool",
        "name": "timeAdded",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ExpireKey",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "GasRefunded",
    "inputs": [
      {
        "type": "address",
        "name": "receiver",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "refundedAmount",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "tokenAddress",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "type": "uint8",
        "name": "version",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "KeyExtended",
    "inputs": [
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "newTimestamp",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "KeyGranterAdded",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "KeyGranterRemoved",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "KeyManagerChanged",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_newManager",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "KeysMigrated",
    "inputs": [
      {
        "type": "uint256",
        "name": "updatedRecordsCount",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LockConfig",
    "inputs": [
      {
        "type": "uint256",
        "name": "expirationDuration",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "maxNumberOfKeys",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "maxKeysPerAcccount",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LockManagerAdded",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LockManagerRemoved",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LockMetadata",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "symbol",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "baseTokenURI",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "type": "address",
        "name": "previousOwner",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "newOwner",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PricingChanged",
    "inputs": [
      {
        "type": "uint256",
        "name": "oldKeyPrice",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "keyPrice",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "oldTokenAddress",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "tokenAddress",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RefundPenaltyChanged",
    "inputs": [
      {
        "type": "uint256",
        "name": "freeTrialLength",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "refundPenaltyBasisPoints",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleAdminChanged",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "type": "bytes32",
        "name": "previousAdminRole",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "type": "bytes32",
        "name": "newAdminRole",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleGranted",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "sender",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleRevoked",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "sender",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "to",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "tokenId",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TransferFeeChanged",
    "inputs": [
      {
        "type": "uint256",
        "name": "transferFeeBasisPoints",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UnlockCallFailed",
    "inputs": [
      {
        "type": "address",
        "name": "lockAddress",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "unlockAddress",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdrawal",
    "inputs": [
      {
        "type": "address",
        "name": "sender",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "tokenAddress",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "recipient",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "DEFAULT_ADMIN_ROLE",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "KEY_GRANTER_ROLE",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "LOCK_MANAGER_ROLE",
    "inputs": [],
    "outputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "addKeyGranter",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addLockManager",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "type": "address",
        "name": "_approved",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "type": "address",
        "name": "_keyOwner",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "balance",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "burn",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "cancelAndRefund",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "expirationDuration",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "expireAndRefundFor",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "extend",
    "inputs": [
      {
        "type": "uint256",
        "name": "_value",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_referrer",
        "internalType": "address"
      },
      {
        "type": "bytes",
        "name": "_data",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "freeTrialLength",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "gasRefundValue",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "_refundValue",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getApproved",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCancelAndRefundValue",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "refund",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getHasValidKey",
    "inputs": [
      {
        "type": "address",
        "name": "_keyOwner",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "isValid",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRoleAdmin",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTransferFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_time",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "grantKeyExtension",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_duration",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "grantKeys",
    "inputs": [
      {
        "type": "address[]",
        "name": "_recipients",
        "internalType": "address[]"
      },
      {
        "type": "uint256[]",
        "name": "_expirationTimestamps",
        "internalType": "uint256[]"
      },
      {
        "type": "address[]",
        "name": "_keyManagers",
        "internalType": "address[]"
      }
    ],
    "outputs": [
      {
        "type": "uint256[]",
        "name": "",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "grantRole",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasRole",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "type": "address",
        "name": "_lockCreator",
        "internalType": "address payable"
      },
      {
        "type": "uint256",
        "name": "_expirationDuration",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_tokenAddress",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_keyPrice",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_maxNumberOfKeys",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_lockName",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isApprovedForAll",
    "inputs": [
      {
        "type": "address",
        "name": "_owner",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_operator",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isKeyGranter",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isLockManager",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isOwner",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isValidKey",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "keyExpirationTimestampFor",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "keyManagerOf",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "keyPrice",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lendKey",
    "inputs": [
      {
        "type": "address",
        "name": "_from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "maxKeysPerAddress",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "maxNumberOfKeys",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mergeKeys",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenIdFrom",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_tokenIdTo",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "migrate",
    "inputs": [
      {
        "type": "bytes",
        "name": "",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "numberOfOwners",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onKeyCancelHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockKeyCancelHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onKeyExtendHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockKeyExtendHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onKeyGrantHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockKeyGrantHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onKeyPurchaseHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockKeyPurchaseHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onKeyTransferHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockKeyTransferHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onTokenURIHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockTokenURIHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onValidKeyHook",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract ILockValidKeyHook"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownerOf",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "publicLockVersion",
    "inputs": [],
    "outputs": [
      {
        "type": "uint16",
        "name": "",
        "internalType": "uint16"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "purchase",
    "inputs": [
      {
        "type": "uint256[]",
        "name": "_values",
        "internalType": "uint256[]"
      },
      {
        "type": "address[]",
        "name": "_recipients",
        "internalType": "address[]"
      },
      {
        "type": "address[]",
        "name": "_referrers",
        "internalType": "address[]"
      },
      {
        "type": "address[]",
        "name": "_keyManagers",
        "internalType": "address[]"
      },
      {
        "type": "bytes[]",
        "name": "_data",
        "internalType": "bytes[]"
      }
    ],
    "outputs": [
      {
        "type": "uint256[]",
        "name": "",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "purchasePriceFor",
    "inputs": [
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_referrer",
        "internalType": "address"
      },
      {
        "type": "bytes",
        "name": "_data",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "minKeyPrice",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "referrerFees",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "refundPenaltyBasisPoints",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renewMembershipFor",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_referrer",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceLockManager",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceRole",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeKeyGranter",
    "inputs": [
      {
        "type": "address",
        "name": "_granter",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeRole",
    "inputs": [
      {
        "type": "bytes32",
        "name": "role",
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "_from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "_from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "_data",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "schemaVersion",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "inputs": [
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "bool",
        "name": "_approved",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEventHooks",
    "inputs": [
      {
        "type": "address",
        "name": "_onKeyPurchaseHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onKeyCancelHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onValidKeyHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onTokenURIHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onKeyTransferHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onKeyExtendHook",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_onKeyGrantHook",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setGasRefundValue",
    "inputs": [
      {
        "type": "uint256",
        "name": "_refundValue",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setKeyManagerOf",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_keyManager",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLockMetadata",
    "inputs": [
      {
        "type": "string",
        "name": "_lockName",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_lockSymbol",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_baseTokenURI",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setOwner",
    "inputs": [
      {
        "type": "address",
        "name": "account",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setReferrerFee",
    "inputs": [
      {
        "type": "address",
        "name": "_referrer",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_feeBasisPoint",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "shareKey",
    "inputs": [
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenIdFrom",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_timeShared",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "type": "bytes4",
        "name": "interfaceId",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenAddress",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenByIndex",
    "inputs": [
      {
        "type": "uint256",
        "name": "_index",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenOfOwnerByIndex",
    "inputs": [
      {
        "type": "address",
        "name": "_keyOwner",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_index",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalKeys",
    "inputs": [
      {
        "type": "address",
        "name": "_keyOwner",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_valueBasisPoint",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "success",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFeeBasisPoints",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "type": "address",
        "name": "_from",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unlendKey",
    "inputs": [
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_tokenId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unlockProtocol",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "contract IUnlock"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateKeyPricing",
    "inputs": [
      {
        "type": "uint256",
        "name": "_keyPrice",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "_tokenAddress",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateLockConfig",
    "inputs": [
      {
        "type": "uint256",
        "name": "_newExpirationDuration",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_maxNumberOfKeys",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_maxKeysPerAcccount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateRefundPenalty",
    "inputs": [
      {
        "type": "uint256",
        "name": "_freeTrialLength",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_refundPenaltyBasisPoints",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateSchemaVersion",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTransferFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "_transferFeeBasisPoints",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "type": "address",
        "name": "_tokenAddress",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address payable"
      },
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  }
]