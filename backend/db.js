const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb+srv://shamishchandra:JYXMixYZHmfNItfb@cluster0.gc1d65f.mongodb.net/Paytm');

}
main()
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

const bankSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', bankSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account,
};

