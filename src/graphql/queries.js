/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $owner: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        displayName
        avatar {
          media {
            bucket
            region
            key
          }
          property {
            size
            height
            width
            duration
          }
        }
        createdAt
        updatedAt
        todos {
          items {
            id
            owner
            visibility
            createdAt
            name
            description
            editors
            updatedAt
            creator {
              owner
              displayName
              avatar {
                media {
                  bucket
                  region
                  key
                }
                property {
                  size
                  height
                  width
                  duration
                }
              }
              createdAt
              updatedAt
              todos {
                items {
                  id
                  owner
                  visibility
                  createdAt
                  name
                  description
                  editors
                  updatedAt
                  creator {
                    owner
                    displayName
                    createdAt
                    updatedAt
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
      owner
      displayName
      avatar {
        media {
          bucket
          region
          key
        }
        property {
          size
          height
          width
          duration
        }
      }
      createdAt
      updatedAt
      todos {
        items {
          id
          owner
          visibility
          createdAt
          name
          description
          editors
          updatedAt
          creator {
            owner
            displayName
            avatar {
              media {
                bucket
                region
                key
              }
              property {
                size
                height
                width
                duration
              }
            }
            createdAt
            updatedAt
            todos {
              items {
                id
                owner
                visibility
                createdAt
                name
                description
                editors
                updatedAt
                creator {
                  owner
                  displayName
                  createdAt
                  updatedAt
                  todos {
                    nextToken
                  }
                }
              }
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      owner
      visibility
      createdAt
      name
      description
      editors
      updatedAt
      creator {
        owner
        displayName
        avatar {
          media {
            bucket
            region
            key
          }
          property {
            size
            height
            width
            duration
          }
        }
        createdAt
        updatedAt
        todos {
          items {
            id
            owner
            visibility
            createdAt
            name
            description
            editors
            updatedAt
            creator {
              owner
              displayName
              avatar {
                media {
                  bucket
                  region
                  key
                }
                property {
                  size
                  height
                  width
                  duration
                }
              }
              createdAt
              updatedAt
              todos {
                items {
                  id
                  owner
                  visibility
                  createdAt
                  name
                  description
                  editors
                  updatedAt
                  creator {
                    owner
                    displayName
                    createdAt
                    updatedAt
                  }
                }
                nextToken
              }
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        visibility
        createdAt
        name
        description
        editors
        updatedAt
        creator {
          owner
          displayName
          avatar {
            media {
              bucket
              region
              key
            }
            property {
              size
              height
              width
              duration
            }
          }
          createdAt
          updatedAt
          todos {
            items {
              id
              owner
              visibility
              createdAt
              name
              description
              editors
              updatedAt
              creator {
                owner
                displayName
                avatar {
                  media {
                    bucket
                    region
                    key
                  }
                  property {
                    size
                    height
                    width
                    duration
                  }
                }
                createdAt
                updatedAt
                todos {
                  items {
                    id
                    owner
                    visibility
                    createdAt
                    name
                    description
                    editors
                    updatedAt
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const todosByVisibility = /* GraphQL */ `
  query TodosByVisibility(
    $visibility: Visibility
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByVisibility(
      visibility: $visibility
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        visibility
        createdAt
        name
        description
        editors
        updatedAt
        creator {
          owner
          displayName
          avatar {
            media {
              bucket
              region
              key
            }
            property {
              size
              height
              width
              duration
            }
          }
          createdAt
          updatedAt
          todos {
            items {
              id
              owner
              visibility
              createdAt
              name
              description
              editors
              updatedAt
              creator {
                owner
                displayName
                avatar {
                  media {
                    bucket
                    region
                    key
                  }
                  property {
                    size
                    height
                    width
                    duration
                  }
                }
                createdAt
                updatedAt
                todos {
                  items {
                    id
                    owner
                    visibility
                    createdAt
                    name
                    description
                    editors
                    updatedAt
                  }
                  nextToken
                }
              }
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
