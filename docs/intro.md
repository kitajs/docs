---
sidebar_position: 1
title: Introduction
---
Kita is a framework for Typescript APIs, it is built on top of [Fastify](https://www.fastify.io/) and focuses on functional programming and E2E type safety. It works by reading your code at compile time and generating the whole API for you, which includes rest apis, websockets, open api, json schema generation, the faster input and output validation and serialization.

And the most awesome of that, it does everything with **0 runtime code**_\*_, thats because it generates all & only the code you need, in the most optimized way possible.

# Goals

- Provide a 0 runtime abstraction layer for your APIs.
- If it can do something, it has to be the fastest runtime way to do it.
- Support Rest and Websocket routes.
- Validate your inputs and outputs to remove this concern from YOUR written code.
- Use the code introspection to filter parameters, inputs and outputs to only the ones you need.
- Generates the whole OpenAPI documentation for your clients and users.