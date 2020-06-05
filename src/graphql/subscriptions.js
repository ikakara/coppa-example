/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          owner
          privacy
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
                owner
                privacy
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          owner
          privacy
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
                owner
                privacy
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          owner
          privacy
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
                owner
                privacy
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      owner
      privacy
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
            owner
            privacy
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
                  owner
                  privacy
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      owner
      privacy
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
            owner
            privacy
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
                  owner
                  privacy
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      owner
      privacy
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
            owner
            privacy
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
                  owner
                  privacy
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
