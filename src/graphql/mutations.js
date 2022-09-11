/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSavedLocation = /* GraphQL */ `
  mutation CreateSavedLocation(
    $input: CreateSavedLocationInput!
    $condition: ModelSavedLocationConditionInput
  ) {
    createSavedLocation(input: $input, condition: $condition) {
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
export const updateSavedLocation = /* GraphQL */ `
  mutation UpdateSavedLocation(
    $input: UpdateSavedLocationInput!
    $condition: ModelSavedLocationConditionInput
  ) {
    updateSavedLocation(input: $input, condition: $condition) {
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
export const deleteSavedLocation = /* GraphQL */ `
  mutation DeleteSavedLocation(
    $input: DeleteSavedLocationInput!
    $condition: ModelSavedLocationConditionInput
  ) {
    deleteSavedLocation(input: $input, condition: $condition) {
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
