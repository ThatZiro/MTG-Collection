import { sequelize, Card} from "../connection/connection";
import {Op} from 'sequelize';
import {GraphQLScalarType} from "graphql/type";
import {Kind} from "graphql/language";

export const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON custom scalar type',
    parseValue(value:any) {
      // Assume incoming value is a JSON string
      try {
        return JSON.parse(value);
      } catch (e) {
        // Return as is if parsing fails, assuming it might already be an object
        return value;
      }
    },
    serialize(value:any) {
      // Assume outgoing value should be an object
      try {
        return JSON.stringify(value);
      } catch (e) {
        // Return as is if stringifying fails
        return value;
      }
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          try {
            return JSON.parse(ast.value);
          } catch (e) {
            return null;
          }
        case Kind.OBJECT:
          // Handle object literals
          const value = Object.fromEntries(
            ast.fields.map(field => [field.name.value, parseLiteral(field.value)])
          );
          return value;
        default:
          return null; // Non-object or string literals are not valid JSON
      }
    }
  }),
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date scalar type for handling dates in YYYY-MM-DD format',
    parseValue(value:any) {
      // Parses value from the client
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date; // value is a valid date
      }
      throw new Error("Invalid date");
    },
    serialize(value:any) {
      // Serializes value to send to the client
      if (value instanceof Date) {
        return value.toISOString().split('T')[0]; // Converts date to YYYY-MM-DD format
      } else {
        // Attempt to interpret the value as a date if not already a Date object
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
      return null; // Return null if the date is invalid
    },
    parseLiteral(ast) {
      // Parses value defined directly in a query
      if (ast.kind === Kind.STRING) {
        const date = new Date(ast.value);
        if (!isNaN(date.getTime())) {
          return date; // Return the Date object if valid
        }
      }
      return null; // Invalid date string in query
    }
  }),
  Query: {
    searchCards: async(_:unknown, {input}:{input:string}) => {
      const cards = await Card.findAll({
        where: {
          name: {
            [Op.iLike]: `%${input}%` // Use iLike for case-insensitive matching
          },
          lang: 'en'
        },
        attributes: ['id', 'name', 'image_uris', 'set_uri', 'prices'], // Only fetch the id and name attributes
        limit: 10  // Limit the results to 10 entries
      });

      return cards; // Return all matched cards up to 10
    },
    getCardByID: async(_: unknown, {id}: {id: string}) => {
      const card = await Card.findByPk(id);
      return card;
    }
  }
}

function parseLiteral(ast:any) {
  switch (ast.kind) {
    case Kind.STRING:
      return ast.value;
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      return Object.fromEntries(
        ast.fields.map((field: {name: { value: any }, value: any }) => [field.name.value, parseLiteral(field.value)])
      );
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}