/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSavedLocation = /* GraphQL */ `
  query GetSavedLocation($id: ID!) {
    getSavedLocation(id: $id) {
      id
      city
      stateCode
      countryCode
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSavedLocations = /* GraphQL */ `
  query ListSavedLocations(
    $filter: ModelSavedLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        city
        stateCode
        countryCode
        userId
        userName
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
