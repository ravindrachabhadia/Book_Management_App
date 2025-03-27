import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface representing a document in MongoDB.
export interface IBook extends Document {
  title: string;
  author: string;
  isbn?: string; // Optional field
  publicationYear?: number; // Optional field
  genre?: string; // Optional field
  userId: Types.ObjectId; // Link to the User model
  createdAt: Date;
  updatedAt: Date;
}

// Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
      // unique: true, // Consider if ISBN should be unique across all books or just per user
    },
    publicationYear: {
      type: Number,
    },
    genre: {
      type: String,
      trim: true,
    },
    // Link to the User who owns the book
    userId: {
      type: Schema.Types.ObjectId, // References the ObjectId type
      ref: 'User', // Specifies that this ID refers to the 'User' model
      required: true,
      index: true, // Add an index for faster querying by userId
    },
  },
  {
    // Add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Mongoose model
export default mongoose.model<IBook>('Book', bookSchema);