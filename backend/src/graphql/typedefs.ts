import {gql} from "apollo-server";

export const typeDefs = gql`
  scalar Date
  scalar JSON

  type Card {
    id: ID!
    oracle_id: String
    name: String
    lang: String
    released_at: Date
    uri: String
    layout: String
    highres_image: Boolean
    image_uris: JSON
    mana_cost: String
    cmc: Float
    type_line: String
    oracle_text: String
    power: String
    toughness: String
    colors: String
    color_identity: String
    keywords: String
    legalities: JSON
    games: String
    reserved: Boolean
    foil: Boolean
    nonfoil: Boolean
    finishes: String
    oversized: Boolean
    promo: Boolean
    reprint: Boolean
    variation: Boolean
    set_id: String
    set_name: String
    set_type: String
    set_uri: String
    rarity: String
    flavor_text: String
    prices: JSON
  }
  
  type idCard{
    id: ID!
    name: String
    image_uris: JSON
    set_uri: String
    prices: JSON
  }

  type Query {
    searchCards(input: String!): [idCard!]!
    getCardByID(id: ID!): Card
  }
`