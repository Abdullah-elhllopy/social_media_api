'use strict';
const {Service} = require('../../system/services/Service');
const autoBind = require('auto-bind');
const {HttpResponse} = require('../../system/helpers/HttpResponse');

class UserService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }
    filterObj = (obj, ...allowedFields) => {
        const newObj = {};
        Object.keys(obj).forEach((el) => {
            if (allowedFields.includes(el)) {
                newObj[el] = obj[el];
            }
        });
        return newObj;
    };

    async updatePassword(id, data) {
        try {
            await this.model.findByIdAndUpdate(id, data, {'new': true});
            return {'passwordChanged': true};
        } catch (errors) {
            throw errors;
        }
    }

    /**
     *
     * @param email : string
     * @param includePassword : boolean
     * @returns {Promise<*>}
     */
    async findByEmail(email, includePassword = false) {
        return includePassword ? this.model.findByEmail(email).select('+password') : this.model.findByEmail(email);
    }

    async editProfile(user, userData) {
        try {
            const filteredBody = this.filterObj(userData, 'name', 'email');
            await this.update(user._id, filteredBody);
            const updatedUser = await this.model.findById({'_id': user._id});
            return new HttpResponse(updatedUser);

        } catch (e) {
            const error = new Error('error');

            error.statusCode = 401;
            throw error;
        }
    }

    async getMyProfile(user) {
        try {
            const my_account_data = await this.get(user._id);
            return new HttpResponse(my_account_data)
        } catch (e) {
            const error = new Error('error');
            error.statusCode = 401;
            throw error;
        }
    }

    async getAccountData(id) {
        try {
            const account_data = await this.get(id);
            return new HttpResponse(account_data)
        } catch (e) {
            const error = new Error('error');
            error.statusCode = 401;
            throw error;
        }
    }
}

module.exports = {UserService};
