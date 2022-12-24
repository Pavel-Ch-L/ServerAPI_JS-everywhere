# ServerAPI from book "JavaScript Everywhere" by Adam D. Scott
<br>

### Application ServerAPI running on : https://shy-tan-eagle-coat.cyclic.app/api
</br>  

### headers for JWT
"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTMyZjQ4YWExMTg5YWU3YmZjMWY4OCIsImlhdCI6MTY3MTYzODg1Nn0.RkacHcljCWnf7u3zKNGqmiYiPzg7g3OmKjRTsHC0YK0"  
</br>  


### Graph QL schema:
<pre>
  type Note {
      id: ID!
      content: String!
      author: User!
      favoriteCount: Int!
      favoritedBy: [User!]
      createdAt: DateTime!
      updatedAt: DateTime!
    }
    type User {
      id: ID!
      username: String!
      email: String!
      avatar: String!
      notes: [Note!]
      favorites: [Note!]
    }
    type NoteFeed {
      notes: [Note]!
      cursor: String!
      hasNextPage: Boolean!
    }
    type Query {
      hello: String
      notes: [Note!]!
      note(id: ID!): Note!
      user(username: String!): User!
      users: [User!]!
      me: User!
      noteFeed(cursor: String): NoteFeed
    }
    type Mutation {
      newNote(content: String!): Note!
      updateNote(id: ID!, content: String!): Note!
      deleteNote(id: ID!): Boolean!
      signUp(username: String!, email: String!, password: String!): String!
      signIn(username: String, email: String, password: String!): String!
      toggleFavorite(id: ID!): Note!
    }
    </pre>
