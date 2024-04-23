import {DataTypes, Sequelize} from 'sequelize';

export const sequelize = new Sequelize('cards', 'postgres', 'h92j-l19w-7v9u', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // toggle this based on whether you want to see SQL logs
});

export const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  oracle_id: DataTypes.STRING,
  name: DataTypes.STRING,
  lang: DataTypes.STRING,
  released_at: DataTypes.DATE,
  uri: DataTypes.TEXT,
  layout: DataTypes.STRING,
  highres_image: DataTypes.BOOLEAN,
  image_uris: DataTypes.JSON,
  mana_cost: DataTypes.STRING,
  cmc: DataTypes.DECIMAL,
  type_line: DataTypes.STRING,
  oracle_text: DataTypes.TEXT,
  power: DataTypes.STRING,
  toughness: DataTypes.STRING,
  colors: DataTypes.ARRAY(DataTypes.STRING),
  color_identity: DataTypes.ARRAY(DataTypes.STRING),
  keywords: DataTypes.ARRAY(DataTypes.STRING),
  legalities: DataTypes.JSON,
  games: DataTypes.STRING,
  reserved: DataTypes.BOOLEAN,
  foil: DataTypes.BOOLEAN,
  nonfoil: DataTypes.BOOLEAN,
  finishes: DataTypes.STRING,
  oversized: DataTypes.BOOLEAN,
  promo: DataTypes.BOOLEAN,
  reprint: DataTypes.BOOLEAN,
  variation: DataTypes.BOOLEAN,
  set_id: DataTypes.STRING,
  set_name: DataTypes.STRING,
  set_type: DataTypes.STRING,
  set_uri: DataTypes.TEXT,
  rarity: DataTypes.STRING,
  flavor_text: DataTypes.TEXT,
  prices: DataTypes.JSON
}, {
  timestamps: false,
  tableName: 'cards'
});