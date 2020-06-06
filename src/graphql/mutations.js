/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
