import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Error to database");
    console.error(err);
  }
};

export default connect;
