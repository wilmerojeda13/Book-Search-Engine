// import mutations that is going to loop threw all components and parameters giving in the gql graph
import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;


export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;


export const SAVED_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
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
}`;

export const REMOVE_BOOK = gql`
mutation saveBook($bookId: ID!) {
    saveBook(bookId: $bookId) {
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
}`;