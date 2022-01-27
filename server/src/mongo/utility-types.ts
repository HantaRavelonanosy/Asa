//
// collection of extended document types from mongoose
// with default _id type as mongoose ObjectId
//

import { Document as MongooseDocument, Types } from "mongoose";

/** Document type */
export interface Document extends MongooseDocument {
  _id: Types.ObjectId; // our _ids are always ObjectIds, no funny business
  id: string; // this is defined as `any` in mongoose for some reason
}

/** Document type with timestamps */
export interface TimestampDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

/** Sudocument type */
export interface Subdocument extends Types.Subdocument {
  _id: Types.ObjectId;
  id: string;
}

/** Subdocument type with timestamps */
export interface TimestampSubdocument extends Subdocument {
  createdAt: Date;
  updatedAt: Date;
}

export type PopulatedDoc<Doc> = Doc | Types.ObjectId;
