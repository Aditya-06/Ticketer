import mongoose, { Model, Document } from 'mongoose';

// User interface required to create a user
// we need to make sure the type matches in acc to attrs
// The properties each ticket should have when creating a new ticket
interface TicketAttrs {
  title: string;
  userId: string;
  price: number;
}

// interface that deinfes the properties of the model -> We want to add build
// we are adding the build property to the Ticket model and we need to inform typescript about it
// This defines properties the entire Ticket collection will have i.e -> build
interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// we will need another interface which will define which properties the Ticket Document should have
// This defines properties an individual Ticket must have
interface TicketDoc extends Document {
  title: string;
  userId: string;
  price: number;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// we want somew transformations to the object (only id instead of _id and no password)
ticketSchema.set('toJSON', {
  // doc -> the mongoose document
  // ret -> the JSON object we want to return
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

// add the type checking as a static function to make things easier
// This basically checks whether all attrs being passsed meet the requirement
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// <what we pass, what the function will return>
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

// wrapper that we will use to make sure type checks are implemented
const buildTicket = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

export { Ticket, buildTicket };
