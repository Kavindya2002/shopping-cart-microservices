# Shopping Cart Microservices

## Project Overview
This project is a university microservices MVP for a clothing shop / shopping cart system. The solution separates business capabilities into six independent Node.js + Express.js + MongoDB microservices and exposes them through a single API Gateway.

## Microservices
- `product-service` on port `5001`
- `customer-service` on port `5002`
- `cart-service` on port `5003`
- `order-service` on port `5004`
- `payment-service` on port `5005`
- `inventory-service` on port `5006`
- `api-gateway` on port `3000`

## Architecture Summary
Each service:
- runs independently
- connects to its own MongoDB database
- exposes CRUD endpoints
- exposes `GET /health`
- exposes Swagger UI on `GET /docs`
- exposes Swagger JSON on `GET /docs-json`

The API Gateway:
- hides internal service ports behind one public port
- proxies resource requests to each microservice
- proxies health and Swagger routes for each microservice
- provides a single entry point for demos and screenshots

## Direct Service URLs
- Product docs: `http://localhost:5001/docs`
- Customer docs: `http://localhost:5002/docs`
- Cart docs: `http://localhost:5003/docs`
- Order docs: `http://localhost:5004/docs`
- Payment docs: `http://localhost:5005/docs`
- Inventory docs: `http://localhost:5006/docs`

## Gateway URLs
- Gateway health: `http://localhost:3000/health`
- Product routes: `http://localhost:3000/products`
- Customer routes: `http://localhost:3000/customers`
- Cart routes: `http://localhost:3000/cart`
- Order routes: `http://localhost:3000/orders`
- Payment routes: `http://localhost:3000/payments`
- Inventory routes: `http://localhost:3000/inventory`
- Product docs through gateway: `http://localhost:3000/docs/products`
- Customer docs through gateway: `http://localhost:3000/docs/customers`
- Cart docs through gateway: `http://localhost:3000/docs/cart`
- Order docs through gateway: `http://localhost:3000/docs/orders`
- Payment docs through gateway: `http://localhost:3000/docs/payments`
- Inventory docs through gateway: `http://localhost:3000/docs/inventory`
- Legacy aliases also work: `http://localhost:3000/products/docs` and equivalents

## How To Run
1. Start MongoDB locally.
2. Open a terminal for each service and run `npm install` then `npm start`.
3. Open a terminal for `api-gateway` and run `npm install` then `npm start`.
4. Open Swagger URLs to verify direct and gateway access.

## Quality Checks
- Install root dependencies with `npm install`.
- Run `npm run lint` for repo-wide ESLint checks.
- Run `npm run syntax` for JavaScript syntax validation.
- Run `npm test` to execute each package's configured test script.
- Run `npm run check` to execute lint, syntax, and package test checks together.

## Suggested Branch Strategy
- `main`: stable demo-ready branch
- `develop`: integration branch for merged team work
- `feature/product-service`: owned by member 1
- `feature/customer-service`: owned by member 2
- `feature/cart-service`: owned by member 3
- `feature/order-service`: owned by member 4
- `feature/payment-service`: owned by member 5
- `feature/inventory-service`: owned by member 6
- `feature/api-gateway`: shared or assigned to one member for integration

## Screenshot Checklist For Slides
- Folder structure visible in editor
- Direct Swagger for each microservice
- Gateway Swagger proxy URL for each microservice
- Direct CRUD test from one service
- Same request through gateway
- Gateway health response
- MongoDB databases for all six services
- Team member contribution split by service

## Suggested Presentation Flow
1. Introduce the clothing shop MVP scenario.
2. Explain why microservices were chosen.
3. Map each team member to one microservice.
4. Show the API Gateway and hidden ports concept.
5. Show direct Swagger screenshots.
6. Show gateway-based Swagger screenshots.
7. Show sample endpoint execution.
8. Close with team contributions and lessons learned.
