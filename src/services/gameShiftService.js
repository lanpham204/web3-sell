import axios from "axios";

export function getAllUser() {
    return axios({
        url: "https://api.gameshift.dev/nx/users",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
export function registerUser(externalWalletAddress) {
    debugger
    const data = {
        "referenceId": externalWalletAddress,
        "email": externalWalletAddress + "@g.com",
        "externalWalletAddress": externalWalletAddress
    }
    return axios({
        url: "https://api.gameshift.dev/nx/users",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        data: data,
    })
}
export function getNFTForUser(userId) {
    return axios({
        url: `https://api.gameshift.dev/nx/users/${userId}/items?collectionId=bde6f4c2-5b36-4581-b156-42839cfe39f4`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
export function getMarketplace() {
    return axios({
        url: `https://api.gameshift.dev/nx/items?forSale=true`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
export function getNFT(itemId) {
    return axios({
        url: `https://api.gameshift.dev/nx/items/${itemId}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
}
export function createNFT(description, imageUrl, name, destinationUserReferenceId) {
    debugger
    const data = {
        "details": {
            "collectionId": "bde6f4c2-5b36-4581-b156-42839cfe39f4",
            "description": description,
            "imageUrl": imageUrl,
            "name": name
        },
        "destinationUserReferenceId": destinationUserReferenceId
    }
    return axios({
        url: "https://api.gameshift.dev/nx/unique-assets",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        data: data,
    })
}
export function listingMarketplace(itemId, amount) {
    const data = {
        "price": {
            "currencyId": "USDC",
            "naturalAmount": amount
        }
    }
    return axios({
        url: `https://api.gameshift.dev/nx/unique-assets/${itemId}/list-for-sale`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        data: data,
    })
}
export function cancelListingMarketplace(itemId) {
    return axios({
        url: `https://api.gameshift.dev/nx/unique-assets/${itemId}/cancel-listing`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
}

export function buyNFT(itemId, buyerId) {
    const data = { "buyerId": buyerId }
    return axios({
        url: `https://api.gameshift.dev/nx/unique-assets/${itemId}/buy`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyZDdmZmRkMy1mZDFmLTQxNGEtOTdiNS1kZGY1YTZjYTA5ZWQiLCJzdWIiOiI2ZmJmMDg1My0wNTI5LTQ0MDQtOWNiZC1mYmZmMTRlOWVjZWIiLCJpYXQiOjE3MjM5ODMwOTF9.qNKdCHMda2U2XG6U4ghSuyv0bKOLUY9VxCzbQSg7n_Q",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
        data: data,
    })
}
