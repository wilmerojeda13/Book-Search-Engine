// we exporting gql from graphql-tag that refrence the graphql and pass queries to apollo client
import gql from 'graphql-tag'

export const Query_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
            title 
            link
        }
    }
}
`;