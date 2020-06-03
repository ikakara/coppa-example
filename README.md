# Experimental code for COPPA design requirements

<https://www.ftc.gov/tips-advice/business-center/guidance/childrens-online-privacy-protection-rule-six-step-compliance>

# Goal

Designing a COPPA compliant datastore using schema.graphql (and custom resolvers), Cognito (User Pools/Groups) and IAM Roles.

* <https://aws.amazon.com/blogs/mobile/graphql-security-appsync-amplify/>

# Technology Stack

* React-native frontend (using Expo Framework)
* Amplify is the middleware and back-end
  * AppSync (GraphQl) API - **this is the main work, designing schemas and coding custom resolvers**
  * DynamoDB - (nosql) document store (coppa data)
  * S3 - media store (coppa media)
  * Cognito Pools/Groups - Access Control
  * IAM Roles - Access Control
  * Lambda Functions - triggers/functions to do complex tasks
  * Cloud Watch - auditing and monitoring; need sentries to monitor when rules are being violated and/or updated

# Installation

* Nodejs - <https://nodejs.org/en/download/>
* Expo (React-Native) - <https://docs.expo.io/get-started/installation/>
* Amplify - <https://docs.amplify.aws/cli>
* VSCode (or Android Studio, etc) - <https://code.visualstudio.com/download>

# UX/UI

Not a focus.  This code **should** run on 3 platforms: iOS, Android and Web.  Cross platform development (using react-native) is very limiting (~60% of Reactjs).

I've played w/ Bottom-Tab design and the basic stack navigation w/ modal screens.  Version 0.0.1 will be stack naviation; by 0.1.0 the code will migrate to bottom-tab navigation style.  All UX/UI suggestions are welcome.

# Why not Flurry?

Because Flurry is based on Dart, and Dart and Javascript (specifically Amplify) don't play easily together.  I'm not wedded to Javascript, but I am wedded to AWS.

# Why not SQL?

I love SQL. I understand the capabilities/limitations of SQL (not Joe Celko level, but darn good).  You can use SQL stored procedures/triggers (limited - lambda functions can interact w/ services outside of the datastore), DB grant tables (cognito pools/groups, IAM, and appsync-graphql resolvers are far richer) and DB log files (cloud watch does more out of the box).  These are cumbersome building blocks for complex/dynamic access control.  AWS services just do more out of the box.

The main disadvantage to AWS Services are the costs.  DynamoDB (or DocumentDB) can get expensive fast - 3-4x more than a managed SQL solution (like RDS).  Really, you could go from paying $5/month to $4K/month overnight, which has happened to many AWS users (I'm reasoning, since I know at least 1 other dumbsh** that has done that).  Growth is great, except when it's not.

# Setup Configuraton - when I have more time, I'll add more details

* Sign-up for a free AWS Account (if don't already have one)
* branch and git the project
* cd into project working directory
* amplify init
* amplify push (to create your own back-end resources)
* npm install (to install the node modules locally)
* expo start -w (to run the application)

# Experimental Process

* Start w/ basic access controls schemes (e.g. privacy column [private or public]), field level @auth rules, resolver customization, etc.
* Add static and dynamic access control for users and groups (e.g. canAccessUsers, canAccessGroups)
* Add more complex access control using join tables @connection access control
* Add fine-grain access control using IAM (column and row level) access control
