const PORT = process.env.PORT || 5005;

const paymentProperties = {
  orderId: {
    type: 'string',
    example: 'ORD001'
  },
  amount: {
    type: 'number',
    minimum: 0,
    example: 5000
  },
  paymentMethod: {
    type: 'string',
    enum: ['cash', 'card', 'bank-transfer'],
    example: 'card'
  },
  paymentStatus: {
    type: 'string',
    enum: ['pending', 'paid', 'failed'],
    example: 'paid'
  },
  transactionDate: {
    type: 'string',
    format: 'date-time',
    example: '2026-03-31T10:00:00.000Z'
  }
};

// Keep the OpenAPI document as a plain object to avoid swagger-jsdoc's
// deprecated URL parsing path on newer Node.js releases.
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Payment API',
    version: '1.0.0',
    description: 'API documentation for the Payment Service'
  },
  servers: [
    {
      url: `http://localhost:${PORT}`
    }
  ],
  tags: [
    {
      name: 'Payments',
      description: 'Payment management endpoints'
    }
  ],
  components: {
    parameters: {
      PaymentId: {
        in: 'path',
        name: 'id',
        required: true,
        description: 'MongoDB payment document ID',
        schema: {
          type: 'string'
        }
      }
    },
    schemas: {
      PaymentInput: {
        type: 'object',
        required: ['orderId', 'amount', 'paymentMethod'],
        properties: paymentProperties
      },
      Payment: {
        allOf: [
          {
            $ref: '#/components/schemas/PaymentInput'
          },
          {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '67ead5be57dcf65f9fd4c9f2'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-03-31T10:00:00.000Z'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-03-31T10:05:00.000Z'
              },
              __v: {
                type: 'integer',
                example: 0
              }
            }
          }
        ]
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Failed to create payment'
          },
          error: {
            type: 'string',
            example: 'Validation failed'
          }
        }
      },
      DeleteResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Payment deleted successfully'
          }
        }
      }
    }
  },
  paths: {
    '/api/payments': {
      post: {
        tags: ['Payments'],
        summary: 'Create a new payment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Payment created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment'
                }
              }
            }
          },
          '400': {
            description: 'Failed to create payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['Payments'],
        summary: 'Get all payments',
        responses: {
          '200': {
            description: 'List of payments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Payment'
                  }
                }
              }
            }
          },
          '500': {
            description: 'Failed to fetch payments',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/payments/{id}': {
      get: {
        tags: ['Payments'],
        summary: 'Get a payment by ID',
        parameters: [
          {
            $ref: '#/components/parameters/PaymentId'
          }
        ],
        responses: {
          '200': {
            description: 'Payment found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment'
                }
              }
            }
          },
          '400': {
            description: 'Invalid payment ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          '404': {
            description: 'Payment not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['Payments'],
        summary: 'Update a payment by ID',
        parameters: [
          {
            $ref: '#/components/parameters/PaymentId'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Payment updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment'
                }
              }
            }
          },
          '400': {
            description: 'Failed to update payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          '404': {
            description: 'Payment not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Payments'],
        summary: 'Delete a payment by ID',
        parameters: [
          {
            $ref: '#/components/parameters/PaymentId'
          }
        ],
        responses: {
          '200': {
            description: 'Payment deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeleteResponse'
                }
              }
            }
          },
          '400': {
            description: 'Failed to delete payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          },
          '404': {
            description: 'Payment not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse'
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerSpec;
