import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const categorySchema = new mongoose({
  nameCategory: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  Images: [
    {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  ],
});
