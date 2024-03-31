## Validating types

You can also use JSDocs to further validate your types. This is especially
useful to validate emails, numbers ranges, string lengths, dates, and more.

Read all available `@<keyword>`s:

- [AJV Keywords](https://ajv.js.org/json-schema.html)
- [AJV Formats](https://ajv.js.org/guide/formats.html)

::: code-group

```ts [Definition]
export interface Example {
  /**
   * @minLength 3
   * @maxLength 20
   */
  name: string;

  /** @format email */
  email: string;

  /**
   * @minimum 0
   * @maximum 150
   */
  age: number;

  /**
   * @minItems 1
   * @maxItems 10
   * @uniqueItems
   */
  items: string[];

  /**
   * @minProperties 1
   * @maxProperties 10
   */
  properties: Record<string, string>;
}
```

```json [Generated schema]
{
  // ...
  "Example": {
    "type": "object",
    "additionalProperties": false,
    "required": ["name", "email", "age", "items", "properties"],
    "properties": {
      "age": {
        "maximum": 150,
        "minimum": 0,
        "type": "number"
      },
      "email": {
        "format": "email",
        "type": "string"
      },
      "items": {
        "items": {
          "type": "string"
        },
        "maxItems": 10,
        "minItems": 1,
        "type": "array",
        "uniqueItems": true
      },
      "name": {
        "maxLength": 20,
        "minLength": 3,
        "type": "string"
      },
      "properties": {
        "additionalProperties": {
          "type": "string"
        },
        "maxProperties": 10,
        "minProperties": 1,
        "type": "object"
      }
    }
  }
}
```

:::
