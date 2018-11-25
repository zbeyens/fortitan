<!-- ![Logo of the project](./images/logo.sample.png) -->

# iogine

<!-- 
[![Crates.io][s2]][ci] [![MIT/Apache][s3]][li]
https://img.shields.io/badge/slack-1-red.svg?longCache=true&style=flat&logo=slack&link=https://arradastudios.slack.com/
-->

[Slack][sl]

[sl]: https://arradastudios.slack.com/

iogine is a fast, scalable game framework for node.js. It provides the basic development framework and many related components, including libraries and tools. iogine is also suitable for real-time web applications; its distributed architecture makes iogine scale better than other real-time web frameworks. Based on [pomelo](https://github.com/NetEase/pomelo).

-   Wiki:  [https://github.com/zbeyens/fortitan/wiki/](https://github.com/zbeyens/fortitan/wiki/)
-   Issues:  [https://github.com/zbeyens/fortitan/issues/](https://github.com/zbeyens/fortitan/issues/)
-   Tags: game, nodejs

## Features

### Complete support of game server and realtime application server architecture

-   Multiple-player game: mobile, social, web, MMORPG (middle size)
-   Realtime application: chat, etc.

### Fast, scalable
<!--
-   Distributed (multi-process) architecture, can be easily scale up
-->
-   Flexible server extension
-   Full performance optimization and test

### Easy

-   Simple API: request, response, broadcast, etc.
-   Lightweight: high development efficiency based on node.js
-   Convention over configuration: almost zero config

<!--
### Powerful

-   Many clients support, including javascript, flash, android, iOS, cocos2d-x, C
-   Many libraries and tools, including command line tool, admin tool, performance test tool, AI, path finding etc.
-   Good reference materials: full docs, many examples and  [an open-source MMO RPG demo](https://github.com/NetEase/pomelo/wiki/Introduction-to--Lord-of-Pomelo)
-->

### Extensible

<!--
-   Support plugin architecture, easy to add new features through plugins. We also provide many plugins like online status, master high availability.
-->
-   Custom features, users can define their own network protocol, custom components very easy.

## Getting started

### Requirements

-   Ensure you have  [NodeJS](https://nodejs.org/)  installed on your machine.

### Installing

-   Get a fresh clone of the repository:
    
    ```
    git clone https://github.com/zbeyens/fortitan.git
    ```
    
-   Navigate into the directory you just cloned the repository into:
    
    ```
    cd fortitan
    ```
    
-   Install the application dependencies:
    
    ```
    npm install
    ```

### Running
  
-   Run the server:
    
    ```
    npm start
    ```
    

Your server should be listening to port 3000 by default. You can change any of the default parameters by editing the  `config`  file.

## Developing

You can check out the development workflow on our [wiki](https://github.com/zbeyens/fortitan/wiki/Development-Workflow).
