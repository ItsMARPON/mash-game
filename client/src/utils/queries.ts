import { gql } from "@apollo/client";



export const GET_ME= gql`
  {
    me {
      _id
      username
      email
      savedResults {
        _id
        mash
        partner
        kids
        career
        salary
        transportation
        death
        deathAge
      }
    }
  }
`;
