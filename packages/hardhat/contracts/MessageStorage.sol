// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract MessageStorage is GatewayCaller {
    struct EncryptedMessage {
        uint256 id;
        address from;
        address to;
        euint256 encryptedSubject;
        euint256 encryptedBody;
        uint64 timestamp;
        bool isRead;
        bool isSpam;
        bool exists;
    }

    uint256 private messageCounter;
    mapping(uint256 => EncryptedMessage) private messages;
    mapping(address => uint256[]) private inbox;
    mapping(address => uint256[]) private outbox;
    mapping(address => uint256[]) private spam;
    mapping(uint256 => mapping(address => bool)) private canDecrypt;

    event MessageSent(uint256 indexed messageId, address indexed from, address indexed to, uint64 timestamp);
    event MessageRead(uint256 indexed messageId, address indexed reader);
    event MessageMarkedAsSpam(uint256 indexed messageId, address indexed marker);

    function sendMessage(
        address to,
        einput encryptedSubject,
        bytes calldata inputProofSubject,
        einput encryptedBody,
        bytes calldata inputProofBody
    ) external returns (uint256) {
        require(to != address(0), "Invalid recipient");
        require(to != msg.sender, "Cannot send to yourself");

        messageCounter++;
        uint256 messageId = messageCounter;

        euint256 subject = TFHE.asEuint256(encryptedSubject, inputProofSubject);
        euint256 body = TFHE.asEuint256(encryptedBody, inputProofBody);

        messages[messageId] = EncryptedMessage({
            id: messageId,
            from: msg.sender,
            to: to,
            encryptedSubject: subject,
            encryptedBody: body,
            timestamp: uint64(block.timestamp),
            isRead: false,
            isSpam: false,
            exists: true
        });

        TFHE.allow(subject, msg.sender);
        TFHE.allow(subject, to);
        TFHE.allow(body, msg.sender);
        TFHE.allow(body, to);

        canDecrypt[messageId][msg.sender] = true;
        canDecrypt[messageId][to] = true;

        inbox[to].push(messageId);
        outbox[msg.sender].push(messageId);

        emit MessageSent(messageId, msg.sender, to, uint64(block.timestamp));
        return messageId;
    }

    function getMessage(uint256 messageId) 
        external 
        view 
        returns (
            uint256 id,
            address from,
            address to,
            uint64 timestamp,
            bool isRead,
            bool isSpam
        ) 
    {
        EncryptedMessage storage message = messages[messageId];
        require(message.exists, "Message does not exist");
        require(
            msg.sender == message.from || msg.sender == message.to,
            "Not authorized"
        );

        return (
            message.id,
            message.from,
            message.to,
            message.timestamp,
            message.isRead,
            message.isSpam
        );
    }

    function getEncryptedSubject(uint256 messageId) external view returns (euint256) {
        require(messages[messageId].exists, "Message does not exist");
        require(canDecrypt[messageId][msg.sender], "Not authorized");
        return messages[messageId].encryptedSubject;
    }

    function getEncryptedBody(uint256 messageId) external view returns (euint256) {
        require(messages[messageId].exists, "Message does not exist");
        require(canDecrypt[messageId][msg.sender], "Not authorized");
        return messages[messageId].encryptedBody;
    }

    function markAsRead(uint256 messageId) external {
        require(messages[messageId].exists, "Message does not exist");
        require(msg.sender == messages[messageId].to, "Only recipient");
        messages[messageId].isRead = true;
        emit MessageRead(messageId, msg.sender);
    }

    function markAsSpam(uint256 messageId) external {
        EncryptedMessage storage message = messages[messageId];
        require(message.exists, "Message does not exist");
        require(msg.sender == message.to, "Only recipient");
        
        message.isSpam = true;
        _removeFromArray(inbox[msg.sender], messageId);
        spam[msg.sender].push(messageId);
        
        emit MessageMarkedAsSpam(messageId, msg.sender);
    }

    function getInbox(address user) external view returns (uint256[] memory) {
        return inbox[user];
    }

    function getOutbox(address user) external view returns (uint256[] memory) {
        return outbox[user];
    }

    function getSpam(address user) external view returns (uint256[] memory) {
        return spam[user];
    }

    function _removeFromArray(uint256[] storage array, uint256 value) private {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                array[i] = array[array.length - 1];
                array.pop();
                break;
            }
        }
    }
}
