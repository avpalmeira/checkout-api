## Code improvements

- Setup the database module separately to not pollute the AppModule
- DataSource information is repeated between AppModule and dataSource.ts file. There’s probably a way to avoid this repetition
- Use environment variables inside a `.env` file to keep secrets apart from sharable code, for instance to connect the application to the database
- Refactor some code to methods inside utils file and then test each of them individually (trying to satisfy the single responsibility principle)
- Use transactional requests when dealing with multiple database requests in a single transaction (ex: when deleting a promotion)
- Better naming standardization (ambiguous promotion activation and product activation)
- Remove repeated code in `checkout.service.ts`
  - Construction of newProductWithDiscount could be moved to utilities function and also discount application code
- Use Swagger API to better document endpoints and test the API

## UX improvements

- Filter products and promotions by filter
- Checkout endpoint returns message with applied discount for each item in the product list

## Error handling and validation

- Treat case where adding a repeated product and promotion
- Creating promotion requires a lot of validation, that validation code should be moved to a utils file (ex: `validation.ts`)
- Treat case where product is deleted, but there’s still an active promotion for it

## Tests

- Create tests for other methods in `ProductService`, `PromotionService` and `CheckoutService`
- Create integration tests on controllers validating API requests and HTTP responses
- Create more unit tests, mainly after moving repeated code to utils files.
