const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


const ValidateEmail = function (email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};
class User {

    initSchema() {
        const schema = new Schema({
            'name': {
                'type': String,
                'required': true,
                'unique': true
            },
            'email': {
                'type': String,
                'unique': true,
                'required': true,
                'max': 50,
                'validate': [ValidateEmail, 'Please enter a valid email'],
            },
            'password': {
                'type': String,
                'required': true,
                'select': false,
                'min': 6
            },
            'role': {
                'type': String,
                'enum': ['admin'],
                'default': 'admin'
            },
            'status': {
                'type': Boolean,
                'required': true,
                'default': true
            },
            'profilePicture': {
                'type': String,
                'default': ''
            },
            'coverPicture': {
                'type': String,
                'default': ''
            },
            'followers': {
                'type': Array,
                'default': ''
            },
            'isAdmin': {
                'type': String,
                'default': false
            },
            'bio': {
                'type': String,
                'max': 50
            },
            'from': {
                'type': String,
                'max': 50
            },
            'relationship': {
                'type': Number,
                'enum': [1, 2, 3]
            }
        }, { 'timestamps': true });


        // Pre save Hook
        schema.pre('save', function (next) {
            const user = this;
            // only hash the password if it has been modified (or is new)

            if (this.isModified('password') || this.isNew) {
                bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(user.password, salt, (hashErr, hash) => {
                        if (hashErr) {
                            return next(hashErr);
                        }
                        // override the cleartext password with the hashed one
                        user.password = hash;
                        next();
                    });
                });
            } else {
                return next();
            }
        });

        // Compare Password
        schema.methods.comparePassword = async function (candidatePassword) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(isMatch);
                    }
                });
            });
        };
        schema.statics.findByEmail = function (email) {
            return this.findOne({ 'email': email });
        };
        schema.plugin(uniqueValidator);
        try {
            mongoose.model('user', schema);
        } catch (e) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model('user');
    }
}

module.exports = { User };
