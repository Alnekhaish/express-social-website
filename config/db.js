const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect(
    'mongodb+srv://abdullah:OwWf6a46PfA7y97O@socialdb.ica8rwl.mongodb.net/db?retryWrites=true&w=majority',
  );
}
